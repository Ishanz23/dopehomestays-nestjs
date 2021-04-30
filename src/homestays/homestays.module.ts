import { Module } from '@nestjs/common';
import { HomestaysController } from './homestays.controller';
import { HomestayResolver } from './homestay.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Homestay, HomestaySchema } from './schema/homestay.schema';
import { HomestayService } from './homestay.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Homestay.name, schema: HomestaySchema },
    ]),
  ],
  controllers: [HomestaysController],
  providers: [HomestayService, HomestayResolver],
})
export class HomestaysModule {}
