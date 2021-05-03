import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import {
  CreateOwnerInput,
  ListOwnerInput,
  OwnerService,
  UpdateOwnerInput,
} from './owner.service';
import {
  Owner,
  OwnerLoginResponse,
  OwnerPaswordUpdateResponse,
} from './schema/owner.schema';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  // Queries

  @Query(() => Owner)
  async owner(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.ownerService.getById(_id);
  }

  @Query(() => [Owner])
  @UseGuards(GqlAuthGuard)
  async owners(@Args('filters', { nullable: true }) filters?: ListOwnerInput) {
    return this.ownerService.list(filters);
  }

  // Mutations

  @Mutation(() => Owner)
  async createOwner(@Args('payload') owner: CreateOwnerInput) {
    return this.ownerService.create(owner);
  }

  @Mutation(() => OwnerLoginResponse)
  ownerLogin(@Args('email') email: string, @Args('password') password: string) {
    return this.ownerService.login(email, password);
  }

  @Mutation(() => OwnerPaswordUpdateResponse)
  @UseGuards(GqlAuthGuard)
  updateOwnerPassword(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
    @Args('currentPassword', { description: 'Provide your old password' })
    currentPassword: string,
    @Args('newPassword', { description: 'Provide a new password' })
    newPassword: string,
  ) {
    return this.ownerService.updateOwnerPassword({
      _id,
      currentPassword,
      newPassword,
    });
  }

  @Mutation(() => Owner)
  @UseGuards(GqlAuthGuard)
  async updateOwner(@Args('payload') owner: UpdateOwnerInput) {
    return this.ownerService.update(owner);
  }

  @Mutation(() => Owner)
  @UseGuards(GqlAuthGuard)
  async deleteOwner(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.ownerService.delete(_id);
  }
}
