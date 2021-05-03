import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateTravelerInput,
  ListTravelerInput,
  TravelerService,
  UpdateTravelerInput,
} from './traveler.service';
import { Traveler } from './schema/traveler.schema';

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
