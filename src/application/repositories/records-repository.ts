import { Moment } from '@application/entities/moment';
import { Record } from '@application/entities/record';

export abstract class RecordsRepository {
  abstract createRecord(moment: Moment): Promise<Record>;
  abstract updateRecord(moment: Moment): Promise<Record>;
  abstract findByDay(day: string): Promise<Record | null>;
  abstract findAllByMonth(yearMonth: string): Promise<Record[] | null>;
}
