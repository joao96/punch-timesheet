import { SATURDAY, SUNDAY } from '@application/constants';
import dayjs from 'dayjs';

export function getWeekdayCount(yearMonth: string) {
  const startDate = dayjs(`${yearMonth}-01`);
  const endOfMonth = startDate.endOf('month');

  let weekdayCount = 0;

  let currentDate = startDate;
  while (currentDate.isBefore(endOfMonth)) {
    if (currentDate.day() !== SATURDAY && currentDate.day() !== SUNDAY) {
      weekdayCount++;
    }
    currentDate = currentDate.add(1, 'day');
  }

  return weekdayCount;
}
