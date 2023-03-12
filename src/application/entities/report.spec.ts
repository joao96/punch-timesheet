import { makeRecord } from '@test/factories/record-factory';
import { Report } from './report';

describe('Report', () => {
  it('should be able to create a report', () => {
    const record = makeRecord();

    const report = new Report({
      dueHours: 'PT8H13M20S',
      hoursWorked: 'PT151H46M39S',
      overtime: 'PT0S',
      yearMonth: '2023-04',
      records: [record],
    });

    expect(report).toBeTruthy();
  });
});
