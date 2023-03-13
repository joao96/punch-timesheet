import { RecordsRepository } from '@application/repositories/records-repository';
import { AppError } from '@application/usecases/errors/app-error';
import { GenerateTimesheet } from '@application/usecases/generate-timesheet';
import { InMemoryRecordsRepository } from '@test/repositories/in-memory-record-repository';
import { TimesheetsController } from './timesheets.controller';

describe('Timesheets Controller', () => {
  let inMemoryRepository: RecordsRepository;
  let generateTimesheet: GenerateTimesheet;
  let controller: TimesheetsController;

  beforeAll(() => {
    inMemoryRepository = new InMemoryRecordsRepository();
    generateTimesheet = new GenerateTimesheet(inMemoryRepository);
    controller = new TimesheetsController(generateTimesheet);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not be able to generate a timesheet report without a valid date', async () => {
    await expect(controller.create('')).rejects.toBeInstanceOf(AppError);

    await expect(controller.create('2023-04')).rejects.toBeInstanceOf(AppError);
  });
});
