import { WORKDAY_HOURS } from '@application/constants';
import { getWeekdayCount } from './get-weekday-count';

interface calculateDueHoursProps {
  hours: number;
  minutes: number;
  seconds: number;
  yearMonth: string;
}

interface calculateDueHoursReturn {
  workedHours: number;
  dueHours: number;
  overtime: number;
}

export function calculateDueAndOvertimeHours(
  props: calculateDueHoursProps,
): calculateDueHoursReturn {
  const { hours, minutes, seconds, yearMonth } = props;
  const workDaysInMonth = getWeekdayCount(yearMonth);

  const totalWorkHoursMonth = workDaysInMonth * WORKDAY_HOURS;
  const actualWorkedHours = hours + minutes / 60 + seconds / 3600;

  const difference = totalWorkHoursMonth - actualWorkedHours;

  return {
    workedHours: actualWorkedHours,
    dueHours: difference > 0 ? difference : 0,
    overtime: difference < 0 ? difference * -1 : 0,
  };
}
