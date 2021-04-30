import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateOwnerInput,
  ListOwnerInput,
  OwnerService,
  UpdateOwnerInput,
} from './owner.service';
import { Owner } from './schema/owner.schema';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private ownerService: OwnerService) {}

  // Queries

  @Query(() => Owner)
  async owner(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.ownerService.getById(_id);
  }

  @Query(() => [Owner])
  async owners(@Args('filters', { nullable: true }) filters?: ListOwnerInput) {
    return this.ownerService.list(filters);
  }

  // Mutations

  @Mutation(() => Owner)
  async createOwner(@Args('payload') owner: CreateOwnerInput) {
    return this.ownerService.create(owner);
  }

  @Mutation(() => Owner)
  async updateOwner(@Args('payload') owner: UpdateOwnerInput) {
    return this.ownerService.update(owner);
  }

  @Mutation(() => Owner)
  async deleteOwner(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.ownerService.delete(_id);
  }
}
