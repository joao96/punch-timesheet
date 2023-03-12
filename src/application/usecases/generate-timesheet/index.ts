import { Injectable } from '@nestjs/common';
import { RecordsRepository } from '@application/repositories/records-repository';
import { ConstStatusCode } from '@application/types/status';
import { AppError } from '../errors/app-error';
import { calculateWorkedHours } from './helpers/calculate-worked-hours';
import { calculateDueAndOvertimeHours } from './helpers/calculate-due-overtime-hours';
import { mapHoursToString } from './helpers/map-hours-to-string';
import { Report } from '@application/entities/report';

interface GenerateTimesheetRequest {
  yearMonth: string;
}

interface GenerateTimesheetResponse {
  report: Report;
}

@Injectable()
export class GenerateTimesheet {
  constructor(private recordsRepository: RecordsRepository) {}

  async execute(
    request: GenerateTimesheetRequest,
  ): Promise<GenerateTimesheetResponse> {
    const { yearMonth } = request;

    const records = await this.recordsRepository.findAllByMonth(yearMonth);

    if (!records || records.length === 0) {
      throw new AppError('Relatório não encontrado.', ConstStatusCode.NotFound);
    }

    const { hours, minutes, seconds } = calculateWorkedHours(records);
    const values = calculateDueAndOvertimeHours({
      hours,
      minutes,
      seconds,
      yearMonth,
    });

    const hoursWorked = mapHoursToString(values.workedHours);
    const overtime = mapHoursToString(values.overtime);
    const dueHours = mapHoursToString(values.dueHours);

    const report = new Report({
      hoursWorked,
      dueHours,
      overtime,
      records,
      yearMonth,
    });

    return { report };
  }
}
