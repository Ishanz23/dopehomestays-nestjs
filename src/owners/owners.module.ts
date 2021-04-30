import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { Owner, OwnerSchema } from './schema/owner.schema';
import { OwnerResolver } from './owner.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  providers: [OwnerService, OwnerResolver],
})
export class OwnersModule {}
