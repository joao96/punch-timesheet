import { Record } from '@application/entities/record';

export class RecordViewModule {
  static toHTTP(record: Record) {
    return {
      dia: record.day,
      horarios: record.schedule,
    };
  }
}
