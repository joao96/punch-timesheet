import { GenerateTimesheet } from '@application/usecases/generate-timesheet';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from 'src/sentry-interceptor';
import { ReportViewModule } from '../view-modules/report-view-module';

@UseInterceptors(SentryInterceptor)
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
