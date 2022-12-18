import { Expose } from 'class-transformer';

export class ShowUserDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;
}
