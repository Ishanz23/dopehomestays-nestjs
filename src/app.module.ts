import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomestaysModule } from './homestays/homestays.module';
import { TravelersModule } from './travelers/travelers.module';
import { BookingsModule } from './bookings/bookings.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/dopehomestays', {
      useFindAndModify: false,
    }),
    HomestaysModule,
    TravelersModule,
    BookingsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
