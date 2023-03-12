import { Body, Controller, Post } from '@nestjs/common';
import { SaveRecord } from 'src/application/usecases/save-record';
import { CreatePunchesBody } from '../dtos/createPunches-body';
import { RecordViewModule } from '../view-modules/record-view-module';

@Controller('/v1/punches')
export class PunchesController {
  constructor(private saveRecord: SaveRecord) {}

  @Post()
  async create(@Body() body: CreatePunchesBody) {
    const { dateHour } = body;

    const { record } = await this.saveRecord.execute({
      dayTime: dateHour,
    });

    return RecordViewModule.toHTTP(record);
  }
}
