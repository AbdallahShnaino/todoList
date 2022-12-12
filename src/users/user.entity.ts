import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Event } from '../events/event.entity';
@Table({ tableName: 'User' })
export class User extends Model {
  @Column({ type: DataType.STRING(50) })
  fullName: string;

  @Column({ type: DataType.STRING(50) })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Event)
  events: Event[];
}
