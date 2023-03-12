import { Record } from './record';

export interface ReportProps {
  yearMonth: string;
  hoursWorked: string;
  overtime: string;
  dueHours: string;
  records: Record[];
}

export class Report {
  private props: ReportProps;

  constructor(props: ReportProps) {
    this.props = {
      ...props,
    };
  }

  public set yearMonth(yearMonth: string) {
    this.props.yearMonth = yearMonth;
  }
  public get yearMonth(): string {
    return this.props.yearMonth;
  }

  public set hoursWorked(hoursWorked: string) {
    this.props.hoursWorked = hoursWorked;
  }
  public get hoursWorked(): string {
    return this.props.hoursWorked;
  }

  public set overtime(overtime: string) {
    this.props.overtime = overtime;
  }
  public get overtime(): string {
    return this.props.overtime;
  }

  public set dueHours(dueHours: string) {
    this.props.dueHours = dueHours;
  }
  public get dueHours(): string {
    return this.props.dueHours;
  }

  public set records(records: Record[]) {
    this.props.records = records;
  }
  public get records(): Record[] {
    return this.props.records;
  }
}
