import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { HomestaysModule } from './homestays/homestays.module';
import { TravelersModule } from './travelers/travelers.module';
import { BookingsModule } from './bookings/bookings.module';
import { OwnersModule } from './owners/owners.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      debug: false,
      cors: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URL'),
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    HomestaysModule,
    TravelersModule,
    BookingsModule,
    OwnersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
