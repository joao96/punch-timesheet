import { Record } from '@application/entities/record';

export class RecordViewModule {
  static toHTTP(record: Record) {
    return {
      day: record.day,
      schedule: record.schedule,
    };
  }
}
