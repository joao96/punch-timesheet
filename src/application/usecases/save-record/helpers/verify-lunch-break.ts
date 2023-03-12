import { LUNCH_BREAK_TIME } from '@application/constants';

export function validLunchBreak(day: string, schedule: string[]) {
  const parsedTimes = schedule.map((time) => new Date(`${day}T${time}`));

  parsedTimes.sort((a, b) => a.getTime() - b.getTime());

  const diffMinutes =
    (parsedTimes[2].getTime() - parsedTimes[1].getTime()) / 1000 / 60;
  return diffMinutes >= LUNCH_BREAK_TIME;
}
