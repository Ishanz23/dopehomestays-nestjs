import { Module } from '@nestjs/common';
import { HomestaysController } from './homestays.controller';
import { HomestayResolver } from './homestay.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Homestay, HomestaySchema } from './schema/homestay.schema';
import { HomestayService } from './homestay.service';
import { Owner, OwnerSchema } from 'src/owners/schema/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Homestay.name, schema: HomestaySchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
  ],
  controllers: [HomestaysController],
  providers: [HomestayService, HomestayResolver],
})
export class HomestaysModule {}
