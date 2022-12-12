import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({ tableName: 'Task' })
export class Task extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING(50) })
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column
  status: boolean;

  @Column({ type: DataType.DATE })
  determinedAt: Date;
}
