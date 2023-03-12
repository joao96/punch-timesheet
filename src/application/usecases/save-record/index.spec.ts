import { InMemoryRecordsRepository } from '@test/repositories/in-memory-record-repository';
import { SaveRecord } from '.';
import { AppError } from '../errors/app-error';

// TODO: fix expect rejects to check for the actual error message

describe('Save Record', () => {
  it('Should not be able to update schedule with invalid date format', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '01-03-2023T08:00:00';

    await expect(saveRecord.execute({ dayTime })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should not be able to update schedule with weekend dates', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const saturday = '2023-03-11T08:00:00';

    await expect(
      saveRecord.execute({ dayTime: saturday }),
    ).rejects.toBeInstanceOf(AppError);

    const sunday = '2023-03-12T08:00:00';

    await expect(
      saveRecord.execute({ dayTime: sunday }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update schedule with duplicated entry', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    await expect(saveRecord.execute({ dayTime })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should not be able to update schedule with past date', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    const pastDayTime = '2023-03-01T07:00:00';

    await expect(
      saveRecord.execute({ dayTime: pastDayTime }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update schedule if it already has 4 dates', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    const dayTime2 = '2023-03-01T12:00:00';

    await saveRecord.execute({ dayTime: dayTime2 });
    const dayTime3 = '2023-03-01T13:00:00';

    await saveRecord.execute({ dayTime: dayTime3 });

    const dayTime4 = '2023-03-01T18:00:00';

    await saveRecord.execute({ dayTime: dayTime4 });

    const dayTime5 = '2023-03-01T19:00:00';

    await expect(
      saveRecord.execute({ dayTime: dayTime5 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update schedule if lunch break is less than 1 hour long', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    const dayTime2 = '2023-03-01T12:00:00';

    await saveRecord.execute({ dayTime: dayTime2 });

    const dayTime3 = '2023-03-01T12:30:00';

    await expect(
      saveRecord.execute({ dayTime: dayTime3 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new record', async () => {
    const recordsRepository = new InMemoryRecordsRepository();
    const saveRecord = new SaveRecord(recordsRepository);

    const dayTime = '2023-03-01T08:00:00';

    await saveRecord.execute({ dayTime });

    expect(recordsRepository.records[0].day).toEqual('2023-03-01');
    expect(recordsRepository.records[0].schedule).toEqual(['08:00:00']);
  });
});
