export function mapHoursToString(hours: number) {
  const hoursPart = Math.floor(hours);
  const minutesPart = Math.floor((hours - hoursPart) * 60);
  const secondsPart = Math.floor(((hours - hoursPart) * 60 - minutesPart) * 60);

  let durationString = 'PT';
  if (hoursPart > 0) {
    durationString += `${hoursPart}H`;
  }
  if (minutesPart > 0 || hoursPart > 0) {
    durationString += `${minutesPart}M`;
  }
  durationString += `${secondsPart}S`;

  return durationString;
}
