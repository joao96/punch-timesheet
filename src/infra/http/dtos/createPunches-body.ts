import { IsNotEmpty } from 'class-validator';

export class CreatePunchesBody {
  @IsNotEmpty({ message: 'Campo obrigatório não informado.' })
  dateHour: string;
}
