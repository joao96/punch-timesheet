import { GenerateTimesheet } from '@application/usecases/generate-timesheet';
import { Module } from '@nestjs/common';
import { SaveRecord } from 'src/application/usecases/save-record';
import { DatabaseModule } from '../database/database.module';
import { PunchesController } from './controllers/punches.controller';
import { TimesheetsController } from './controllers/timesheets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PunchesController, TimesheetsController],
  providers: [SaveRecord, GenerateTimesheet],
})
export class HttpModule {}
