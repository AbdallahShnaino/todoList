import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({ tableName: 'Event' })
export class Event extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING(50) })
  title: string;

  @Column({ type: DataType.DECIMAL })
  locLongitude: number;

  @Column({ type: DataType.DECIMAL })
  locLatitude: number;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING(8) })
  type: string;

  @Column({ type: DataType.DATE })
  startingAt: Date;

  @Column({ type: DataType.DATE })
  finishedAt: Date;
}
