import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TravelerService } from './traveler.service';
import { TravelerResolver } from './traveler.resolver';
import { Traveler, TravelerSchema } from './schema/traveler.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Traveler.name, schema: TravelerSchema },
    ]),
    AuthModule,
  ],
  providers: [TravelerService, TravelerResolver],
  exports: [TravelerService],
})
export class TravelersModule {}
