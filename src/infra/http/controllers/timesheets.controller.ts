import { GenerateTimesheet } from '@application/usecases/generate-timesheet';
import { Controller, Get, Param } from '@nestjs/common';
import { ReportViewModule } from '../view-modules/report-view-module';

@Controller('/v1/timesheets/')
export class TimesheetsController {
  constructor(private generateTimesheet: GenerateTimesheet) {}

  @Get(':month')
  async create(@Param('month') month: string) {
    const { report } = await this.generateTimesheet.execute({
      yearMonth: month,
    });

    return ReportViewModule.toHTTP(report);
  }
}
