import { Report } from '@application/entities/report';

export class ReportViewModule {
  static toHTTP(report: Report) {
    return {
      mes: report.yearMonth,
      horasTrabalhadas: report.hoursWorked,
      horasExcedentes: report.overtime,
      horasDevidas: report.dueHours,
      registros: report.records,
    };
  }
}
