import { LUNCH_BREAK_TIME, PUNCHES_A_DAY } from '@application/constants';
import { Record } from '@application/entities/record';
import dayjs from 'dayjs';

export function calculateWorkedHours(records: Record[]) {
  const totalHoursWorked = records.reduce(
    (acc, current) => {
      const dailyWorkedHours = calculateDailyWorkedHours(
        current.schedule,
        current.day,
      );
      acc.hours = acc.hours + dailyWorkedHours.hours;
      acc.minutes = acc.minutes + dailyWorkedHours.minutes;
      acc.seconds = acc.seconds + dailyWorkedHours.seconds;
      return acc;
    },
    { hours: 0, minutes: 0, seconds: 0 },
  );

  return totalHoursWorked;
}

function calculateDailyWorkedHours(schedule: string[], day: string) {
  let totalMs = 0;

  if (schedule.length === PUNCHES_A_DAY) {
    for (let i = 0; i < schedule.length - 1; i += 1) {
      const start = dayjs(`${day}T${schedule[i]}`);
      const end = dayjs(`${day}T${schedule[i + 1]}`);
      const diffMs = end.diff(start);
      totalMs += diffMs;
    }
    const hours =
      Math.floor(totalMs / (1000 * 60 * 60)) - LUNCH_BREAK_TIME / 60;
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return { hours: 0, minutes: 0, seconds: 0 };
}
