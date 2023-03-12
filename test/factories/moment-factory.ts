import { SATURDAY, SUNDAY } from '@application/constants';
import dayjs from 'dayjs';

export function makeMonthMoments(yearMonth: string, schedule: string[]) {
  const moments: string[] = [];

  const monthStart = dayjs(yearMonth).startOf('month');
  const monthEnd = dayjs(yearMonth).endOf('month');

  let currentDate = monthStart;

  while (currentDate.isBefore(monthEnd)) {
    if (currentDate.day() !== SATURDAY && currentDate.day() !== SUNDAY) {
      const daySchedule = schedule.map(
        (time) => currentDate.format('YYYY-MM-DD') + 'T' + time,
      );

      moments.push(...daySchedule);
    }
    currentDate = currentDate.add(1, 'day');
  }

  return moments;
}
