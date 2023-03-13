import { GenerateTimesheet } from '@application/usecases/generate-timesheet';
import { SaveRecord } from '@application/usecases/save-record';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PunchesController } from './controllers/punches.controller';
import { TimesheetsController } from './controllers/timesheets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PunchesController, TimesheetsController],
  providers: [SaveRecord, GenerateTimesheet],
})
export class HttpModule {}
