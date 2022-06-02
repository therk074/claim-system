import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { StatusType } from '../../status-type/schema/status-type.schema';
import { User } from '../../users/schema/users.schema';

export type ClaimStoreDocument = ClaimStore & Document;

@Schema({ timestamps: true })
export class ClaimStore {

    @Prop()
    claim_id: number;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    customer_name: string;

    @Prop({ required: true })
    customer_email: string;

    @Prop({ required: true })
    customer_phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatusType' })
    status_type: StatusType;

    @Prop()
    link_status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Username' })
    add_by: User;
}

export const ClaimStoreSchema = SchemaFactory.createForClass(ClaimStore);