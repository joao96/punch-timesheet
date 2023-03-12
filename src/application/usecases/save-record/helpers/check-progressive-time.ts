import dayjs from 'dayjs';
import { Record } from '@application/entities/record';

export function checkProgressiveTime(dateTime: string, record: Record) {
  const parsedTime = dayjs(dateTime);
  const schedule = record.schedule;
  const day = record.day;

  if (!schedule) {
    return false;
  }

  const lastTime = record.schedule[schedule.length - 1];
  const parsedLastTime = dayjs(`${day}T${lastTime}`);
  return parsedTime.isAfter(parsedLastTime);
}
