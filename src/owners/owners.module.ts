import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { Owner, OwnerSchema } from './schema/owner.schema';
import { OwnerResolver } from './owner.resolver';
import { Homestay, HomestaySchema } from 'src/homestays/schema/homestay.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Owner.name,
        useFactory: () => {
          const schema = OwnerSchema;
          schema.pre('save', () => {
            console.log('Hi from pre');
          });
          return schema;
        },
      },
      { name: Homestay.name, useFactory: () => HomestaySchema },
    ]),
  ],
  providers: [OwnerService, OwnerResolver],
})
export class OwnersModule {}
