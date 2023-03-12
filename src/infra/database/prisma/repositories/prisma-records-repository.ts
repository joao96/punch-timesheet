import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Moment } from 'src/application/entities/moment';
import { Record } from 'src/application/entities/record';
import { RecordsRepository } from 'src/application/repositories/records-repository';
import { extractDayAndTime } from 'src/utils/extract-day-and-time';
import { PrismaRecordMapper } from '../mappers/prisma-record-mapper';
import { PrismaService } from '../prisma.service';
dayjs.extend(utc);

@Injectable()
export class PrismaRecordsRepository implements RecordsRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByMonth(yearMonth: string): Promise<Record[]> {
    const monthStart = dayjs(yearMonth + '-01')
      .startOf('month')
      .utc()
      .toDate();
    const monthEnd = dayjs(monthStart).endOf('month').utc().toDate();

    const records = await this.prisma.record.findMany({
      where: {
        AND: [{ day: { gte: monthStart } }, { day: { lte: monthEnd } }],
      },
    });

    if (records.length === 0) {
      return null;
    }

    const recordsMapped = records.map((record) => {
      return PrismaRecordMapper.toDomain(record);
    });

    return recordsMapped;
  }

  // TODO: refactor this
  async updateRecord(moment: Moment): Promise<Record> {
    const { day, time } = extractDayAndTime(moment.value);
    const record = await this.findByDay(day);

    if (!record) {
      return null;
    }

    record.schedule.push(time);

    const recordUpdated = await this.prisma.record.update({
      where: {
        id: record.id,
      },
      data: {
        day: dayjs(day).toDate(),
        schedule: record.schedule,
      },
    });

    return PrismaRecordMapper.toDomain(recordUpdated);
  }

  async findByDay(day: string): Promise<Record | null> {
    const record = await this.prisma.record.findFirst({
      where: {
        day: dayjs(day).toDate(),
      },
    });

    if (!record) {
      return null;
    }

    return PrismaRecordMapper.toDomain(record);
  }

  async createRecord(moment: Moment): Promise<Record> {
    const { day, time } = extractDayAndTime(moment.value);

    const record = await this.prisma.record.create({
      data: {
        day: dayjs(day).toDate(),
        schedule: [time],
      },
    });

    return PrismaRecordMapper.toDomain(record);
  }
}
