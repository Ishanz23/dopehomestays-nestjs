import { Module } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { TravelerResolver } from './traveler.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Traveler, TravelerSchema } from './schema/traveler.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Traveler.name, schema: TravelerSchema },
    ]),
  ],
  providers: [TravelerService, TravelerResolver],
  exports: [TravelerService],
})
export class TravelersModule {}
