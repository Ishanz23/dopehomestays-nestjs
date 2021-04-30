import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CancellationPolicyInput,
  GalleryInput,
  Homestay,
  HomeStayDocument,
  RoomInput,
} from './schema/homestay.schema';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Owner, OwnerDocument } from 'src/owners/schema/owner.schema';

@Injectable()
export class HomestayService {
  constructor(
    @InjectModel(Homestay.name) private homestayModel: Model<HomeStayDocument>,
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async create(payload: CreateHomestayInput) {
    const savedHomestay = await this.homestayModel.create(payload);

    this.addHomestayToOwner(payload.owners, savedHomestay._id);

    return savedHomestay;
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.homestayModel.findById(_id).exec();
  }

  list(filters: ListHomestaysInput) {
    return this.homestayModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateHomestayInput) {
    const updatedHomestay = await this.homestayModel.findByIdAndUpdate(
      payload._id,
      payload,
      { new: true },
    );

    this.addHomestayToOwner(payload.owners, updatedHomestay._id);

    return updatedHomestay;
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.homestayModel.findByIdAndDelete(_id).exec();
  }

  private addHomestayToOwner(
    owners: MongooseSchema.Types.ObjectId[],
    homestayId: MongooseSchema.Types.ObjectId,
  ) {
    if (owners && owners.length) {
      owners.forEach((ownerId) => {
        console.log(ownerId);
        const ownerCursor = this.ownerModel.findById(ownerId);
        ownerCursor.exec().then((owner) => {
          console.log(homestayId);
          let homestays = [];
          if (owner) {
            homestays = [...owner.homestays, homestayId].filter(
              (homestay) => homestay,
            );
          } else {
            homestays = [];
          }
          ownerCursor.updateOne({ _id: ownerId }, { homestays }).exec();
        });
      });
    }
  }
}

@InputType()
export class CreateHomestayInput extends OmitType(
  PartialType(Homestay, InputType),
  ['cancellationPolicies', 'gallery', 'rooms'],
) {
  @Field(() => [GalleryInput], { nullable: 'itemsAndList' })
  gallery?: GalleryInput[];

  @Field(() => [CancellationPolicyInput], { nullable: 'itemsAndList' })
  cancellationPolicies?: CancellationPolicyInput[];

  @Field(() => [RoomInput]) rooms: RoomInput[];
}

@InputType()
export class ListHomestaysInput extends PartialType(CreateHomestayInput) {}

@InputType()
export class UpdateHomestayInput extends OmitType(ListHomestaysInput, ['_id']) {
  @Field(() => String, { nullable: true }) _id: MongooseSchema.Types.ObjectId;
}
