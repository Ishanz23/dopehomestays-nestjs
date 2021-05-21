import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateTravelerInput,
  ListTravelerInput,
  TravelerService,
  UpdateTravelerInput,
} from './traveler.service';
import {
  Traveler,
  TravelerLoginResponse,
  TravelerPaswordUpdateResponse,
} from './schema/traveler.schema';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Traveler)
export class TravelerResolver {
  constructor(private travelerService: TravelerService) {}

  // Queries

  @Query(() => Traveler)
  async traveler(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.travelerService.getById(_id);
  }

  @Query(() => [Traveler])
  async travelers(
    @Args('filters', { nullable: true }) filters?: ListTravelerInput,
  ) {
    return this.travelerService.list(filters);
  }

  // Mutations

  @Mutation(() => Traveler)
  async createTraveler(@Args('payload') traveler: CreateTravelerInput) {
    return this.travelerService.create(traveler);
  }

  @Mutation(() => TravelerLoginResponse)
  travelerLogin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.travelerService.login(email, password);
  }

  @Mutation(() => TravelerLoginResponse)
  travelerMobileLogin(
    @Args('mobile') mobile: string,
    @Args('password') password: string,
  ) {
    return this.travelerService.mobileLogin(mobile, password);
  }

  @Mutation(() => TravelerPaswordUpdateResponse)
  @UseGuards(GqlAuthGuard)
  updateTravelerPassword(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
    @Args('currentPassword', { description: 'Provide your old password' })
    currentPassword: string,
    @Args('newPassword', { description: 'Provide a new password' })
    newPassword: string,
  ) {
    return this.travelerService.updateTravelerPassword({
      _id,
      currentPassword,
      newPassword,
    });
  }

  @Mutation(() => Traveler)
  async updateTraveler(@Args('payload') traveler: UpdateTravelerInput) {
    return this.travelerService.update(traveler);
  }

  @Mutation(() => Traveler)
  async deleteTraveler(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.travelerService.delete(_id);
  }
}
