import { randomUUID } from 'node:crypto';
import { Record } from './record';

describe('Record', () => {
  it('should be able to create a record', () => {
    const record = new Record({
      day: '2023-03-11',
      schedule: ['08:00:00', '12:00:00'],
      id: randomUUID(),
    });

    expect(record).toBeTruthy();
  });
});
