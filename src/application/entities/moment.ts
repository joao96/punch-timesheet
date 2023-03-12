import { AppError } from '@application/usecases/errors/app-error';
import dayjs from 'dayjs';

export class Moment {
  private readonly date: string;

  get value(): string {
    return this.date;
  }

  private validateFormat(date: string): boolean {
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss';
    const parsedDate = dayjs(date, dateFormat, true);
    return parsedDate.isValid();
  }

  constructor(date: string) {
    const hasValidFormat = this.validateFormat(date);

    if (!hasValidFormat) {
      throw new AppError('Data e hora em formato inválido.');
    }

    this.date = date;
  }
}
