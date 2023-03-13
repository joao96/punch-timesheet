import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SaveRecord } from 'src/application/usecases/save-record';
import { SentryInterceptor } from 'src/sentry-interceptor';
import { CreatePunchesBody } from '../dtos/createPunches-body';
import { RecordViewModule } from '../view-modules/record-view-module';

@UseInterceptors(SentryInterceptor)
@Controller('/v1/punches')
export class PunchesController {
  constructor(private saveRecord: SaveRecord) {}

  @Post()
  async create(@Body() body: CreatePunchesBody) {
    const { date } = body;

    const { record } = await this.saveRecord.execute({
      dayTime: date,
    });

    return RecordViewModule.toHTTP(record);
  }
}
