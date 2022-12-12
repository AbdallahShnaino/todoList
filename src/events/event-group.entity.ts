import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Event } from './event.entity';

@Table({ tableName: 'EventGroup', timestamps: false })
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
  @Column({ type: DataType.INTEGER })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
