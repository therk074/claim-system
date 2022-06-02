import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ClaimStore } from '../../claim-store/schema/claim-store.schema';
import { StatusType } from '../../status-type/schema/status-type.schema';
import { User } from '../../users/schema/users.schema';

export type ClaimHistoryDocument = ClaimHistory & Document;

@Schema({ timestamps: true })
export class ClaimHistory {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimStore' })
    claim_store: ClaimStore;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatusType' })
    status_type: StatusType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    add_by:User
}

export const ClaimHistorySchema = SchemaFactory.createForClass(ClaimHistory);