import { Body, Controller, Post } from '@nestjs/common';
import { SaveRecord } from 'src/application/usecases/save-record';
import { CreatePunchesBody } from '../dtos/createPunches-body';
import { RecordViewModule } from '../view-modules/record-view-module';

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
