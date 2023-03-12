export interface RecordProps {
  id?: string;
  day: string;
  schedule: string[];
}

export class Record {
  private props: RecordProps;

  constructor(props: RecordProps) {
    this.props = {
      ...props,
    };
  }

  public set schedule(schedule: string[]) {
    this.props.schedule = schedule;
  }
  public get schedule(): string[] {
    return this.props.schedule;
  }

  public set day(day: string) {
    this.props.day = day;
  }
  public get day(): string {
    return this.props.day;
  }

  public get id(): string {
    return this.props.id;
  }
}
