import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Event } from './event.entity';

@Table({ tableName: 'EventGroup' })
export class EventGroup extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING(15) })
  role: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER })
  eventId: number;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
