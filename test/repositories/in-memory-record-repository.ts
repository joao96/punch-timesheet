import { RecordsRepository } from '@application/repositories/records-repository';
import { Record } from '@application/entities/record';
import { Moment } from '@application/entities/moment';
import { extractDayAndTime } from '@utils/extract-day-and-time';
import { randomUUID } from 'node:crypto';

export class InMemoryRecordsRepository implements RecordsRepository {
  public records: Record[] = [];

  async findAllByMonth(yearMonth: string): Promise<Record[]> {
    const filteredRecords = this.records.filter(({ day }) =>
      day.startsWith(yearMonth),
    );
    return filteredRecords;
  }

  async createRecord(moment: Moment): Promise<Record> {
    const { day, time } = extractDayAndTime(moment.value);
    const id = randomUUID();

    const newRecord = new Record({ id, day, schedule: [time] });

    this.records.push(newRecord);

    return newRecord;
  }

  async updateRecord(moment: Moment): Promise<Record> {
    const { day, time } = extractDayAndTime(moment.value);
    const index = this.records.findIndex((record) => record.day === day);

    if (index < 0) {
      return null;
    }

    this.records[index].schedule.push(time);

    return this.records[index];
  }

  async findByDay(day: string): Promise<Record> {
    const record = this.records.find((record) => record.day === day);

    if (!record) {
      return null;
    }

    return record;
  }
}
