import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  status: boolean;

  @Prop({ required: true })
  determinedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
