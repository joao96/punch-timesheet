import dayjs from 'dayjs';
import { Record } from '@application/entities/record';

export function checkDuplicateTime(dateTime: string, record: Record) {
  const parsedTime = dayjs(dateTime);

  if (!record.schedule) {
    return false;
  }

  return record.schedule.some((time) => {
    const parsedArrayTime = dayjs(`${record.day}T${time}`);
    return parsedTime.isSame(parsedArrayTime);
  });
}
