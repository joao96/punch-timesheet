import { RecordsRepository } from '@application/repositories/records-repository';
import { AppError } from '@application/usecases/errors/app-error';
import { SaveRecord } from '@application/usecases/save-record';
import { InMemoryRecordsRepository } from '@test/repositories/in-memory-record-repository';
import { PunchesController } from './punches.controller';

describe('Punches Controller', () => {
  let inMemoryRepository: RecordsRepository;
  let saveRecord: SaveRecord;
  let controller: PunchesController;

  beforeAll(() => {
    inMemoryRepository = new InMemoryRecordsRepository();
    saveRecord = new SaveRecord(inMemoryRepository);
    controller = new PunchesController(saveRecord);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a punch', async () => {
    const date = '2023-03-13T08:00:00';
    const record = await controller.create({ date });

    expect(record).toEqual({
      day: '2023-03-13',
      schedule: ['08:00:00'],
    });
  });

  it('should not be able to register a punch without a valid date', async () => {
    await expect(controller.create({ date: '' })).rejects.toBeInstanceOf(
      AppError,
    );

    await expect(
      controller.create({ date: '13-03-2023T08:00:00' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
