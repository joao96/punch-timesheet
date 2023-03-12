import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { Record } from '@application/entities/record';
import { Moment } from '@application/entities/moment';
import { RecordsRepository } from '@application/repositories/records-repository';
import { extractDayAndTime } from '@utils/extract-day-and-time';
import { ConstStatusCode } from '@application/types/status';
import { PUNCHES_A_DAY, SATURDAY, SUNDAY } from '@application/constants';
import { AppError } from '../errors/app-error';
import { checkDuplicateTime } from './helpers/check-duplicate-time';
import { checkProgressiveTime } from './helpers/check-progressive-time';
import { validLunchBreak } from './helpers/verify-lunch-break';

interface SaveRecordRequest {
  dayTime: string;
}

interface SaveRecordResponse {
  record: Record;
}

@Injectable()
export class SaveRecord {
  constructor(private recordsRepository: RecordsRepository) {}

  async execute(request: SaveRecordRequest): Promise<SaveRecordResponse> {
    const { dayTime } = request;

    const moment = new Moment(dayTime);
    const { day, time } = extractDayAndTime(moment.value);

    const date = dayjs(day);

    if (date.day() === SATURDAY || date.day() === SUNDAY) {
      throw new AppError(
        'Sábado e domingo não são permitidos como dia de trabalho.',
        ConstStatusCode.Forbidden,
      );
    }

    let record = await this.recordsRepository.findByDay(day);

    if (!record) {
      record = await this.recordsRepository.createRecord(moment);
      return { record };
    }

    const timeAlreadyInserted = checkDuplicateTime(dayTime, record);

    if (timeAlreadyInserted) {
      throw new AppError('Horário já registrado.', ConstStatusCode.Forbidden);
    }

    const isAfterLastTime = checkProgressiveTime(dayTime, record);

    if (!isAfterLastTime) {
      throw new AppError(
        'Horário deve ser posterior ao último ponto registrado.',
        ConstStatusCode.Forbidden,
      );
    }

    if (record.schedule.length === 2) {
      const schedule = [...record.schedule, time];
      const isValidLunchBreak = validLunchBreak(day, schedule);
      if (!isValidLunchBreak) {
        throw new AppError(
          'Deve haver no mínimo 1 hora de almoço.',
          ConstStatusCode.Forbidden,
        );
      }
    }

    if (record.schedule.length === PUNCHES_A_DAY) {
      throw new AppError(
        'Apenas 4 horários podem ser registrados por dia.',
        ConstStatusCode.Forbidden,
      );
    }

    record = await this.recordsRepository.updateRecord(moment);
    return { record };
  }
}
