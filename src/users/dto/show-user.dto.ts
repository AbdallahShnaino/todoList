import { Expose } from 'class-transformer';

export class ShowUserDto {
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  email: string;
}
