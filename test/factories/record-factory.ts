import { Record, RecordProps } from '@application/entities/record';

type Override = Partial<RecordProps>;

export function makeRecord(override: Override = {}) {
  return new Record({
    day: '2023-03-08',
    schedule: ['08:00', '12:00', '13:00', '18:00'],
    ...override,
  });
}
