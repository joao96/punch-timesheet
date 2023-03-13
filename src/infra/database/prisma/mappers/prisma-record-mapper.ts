import { Record } from '@application/entities/record';
import { Record as RawRecord } from '@prisma/client';
import { extractDayAndTime } from '@utils/extract-day-and-time';

export class PrismaRecordMapper {
  static toDomain(raw: RawRecord): Record {
    const { day } = extractDayAndTime(raw.day.toISOString());
    return new Record({
      id: raw.id,
      day,
      schedule: raw.schedule,
    });
  }
}
