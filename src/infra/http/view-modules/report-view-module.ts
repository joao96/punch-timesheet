import { Report } from '@application/entities/report';

export class ReportViewModule {
  static toHTTP(report: Report) {
    return {
      month: report.yearMonth,
      hoursWorked: report.hoursWorked,
      overtime: report.overtime,
      dueHours: report.dueHours,
      records: report.records,
    };
  }
}
