import { makeMonthMoments } from '@test/factories/moment-factory';
import { InMemoryRecordsRepository } from '@test/repositories/in-memory-record-repository';
import { GenerateTimesheet } from '.';
import { AppError } from '../errors/app-error';
import { SaveRecord } from '../save-record';

describe('Generate Time Sheet', () => {
  it('Should not be able to generate a time sheet when month is not found', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const generateTimesheet = new GenerateTimesheet(recordsRepository);
    const saveRecord = new SaveRecord(recordsRepository);

    const yearMonth = '2023-02';

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    await expect(
      generateTimesheet.execute({ yearMonth }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to generate a time sheet with valid month and overtime value', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const generateTimesheet = new GenerateTimesheet(recordsRepository);
    const saveRecord = new SaveRecord(recordsRepository);

    const yearMonth = '2023-03';
    const schedule = ['08:00:00', '12:00:00', '13:00:00', '17:10:00'];

    const monthMoments = makeMonthMoments(yearMonth, schedule);

    for (const moment of monthMoments) {
      await saveRecord.execute({ dayTime: moment });
    }

    const { report } = await generateTimesheet.execute({ yearMonth });

    expect(report.dueHours).toEqual('PT0S');
    expect(report.hoursWorked).toEqual('PT187H50M0S');
    expect(report.overtime).toEqual('PT3H50M0S');
    expect(report.records).toHaveLength(23);
  });

  it('Should be able to generate a time sheet with valid month and overdue value', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const generateTimesheet = new GenerateTimesheet(recordsRepository);
    const saveRecord = new SaveRecord(recordsRepository);

    const yearMonth = '2023-04';
    const schedule = ['08:00:00', '12:00:00', '13:00:00', '16:35:20'];

    const monthMoments = makeMonthMoments(yearMonth, schedule);

    for (const moment of monthMoments) {
      await saveRecord.execute({ dayTime: moment });
    }

    const { report } = await generateTimesheet.execute({ yearMonth });

    expect(report.dueHours).toEqual('PT8H13M20S');
    expect(report.hoursWorked).toEqual('PT151H46M39S');
    expect(report.overtime).toEqual('PT0S');
    expect(report.records).toHaveLength(20);
  });

  it('Should be able to generate a time sheet with valid month and no duehours and overtime values', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const generateTimesheet = new GenerateTimesheet(recordsRepository);
    const saveRecord = new SaveRecord(recordsRepository);

    const yearMonth = '2023-05';
    const schedule = ['08:00:00', '12:00:00', '13:00:00', '17:00:00'];

    const monthMoments = makeMonthMoments(yearMonth, schedule);

    for (const moment of monthMoments) {
      await saveRecord.execute({ dayTime: moment });
    }

    const { report } = await generateTimesheet.execute({ yearMonth });

    expect(report.dueHours).toEqual('PT0S');
    expect(report.hoursWorked).toEqual('PT184H0M0S');
    expect(report.overtime).toEqual('PT0S');
    expect(report.records).toHaveLength(23);
  });
});
