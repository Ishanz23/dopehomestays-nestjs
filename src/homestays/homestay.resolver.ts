import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import {
  CreateHomestayInput,
  HomestayService,
  ListHomestaysInput,
  UpdateHomestayInput,
} from './homestay.service';
import { Homestay } from './schema/homestay.schema';

@Resolver(() => Homestay)
export class HomestayResolver {
  constructor(private homestayService: HomestayService) {}

  // Queries

  @Query(() => Homestay)
  async homestay(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.homestayService.getById(_id);
  }

  @Query(() => [Homestay])
  async homestays(
    @Args('filters', { nullable: true }) filters: ListHomestaysInput,
  ) {
    return this.homestayService.list(filters);
  }

  // Mutations

  @Mutation(() => Homestay)
  async createHomestay(
    @Args('payload')
    homestay: CreateHomestayInput,
  ) {
    return this.homestayService.create(homestay);
  }

  @Mutation(() => Homestay)
  async updateHomestay(
    @Args('payload')
    homestay: UpdateHomestayInput,
  ) {
    return this.homestayService.update(homestay);
  }

  @Mutation(() => Homestay)
  async deleteHomestay(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.homestayService.delete(_id);
  }
}
