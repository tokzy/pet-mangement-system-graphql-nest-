import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.dbHost,
      port: parseInt(process.env.dbPort),
      username: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
