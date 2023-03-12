export function extractDayAndTime(dateString: string): {
  day: string;
  time: string;
} {
  const [day, time] = dateString.split('T');
  return { day, time };
}
