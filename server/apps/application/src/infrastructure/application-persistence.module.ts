import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationRepository } from '../domain/repository';
import { ApplicationSchema } from './schema';
import { TypeOrmApplicationRepository } from './repository/application.repository';
import { DatabaseConfiger, DatabaseOptions } from './database/init';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultConfig: DatabaseOptions = {
          type: 'postgres',

          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: `${configService.get('DB_PASSWORD')}`,
          database: configService.get('DB_APPLICATION_DATABASE'),

          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([ApplicationSchema]),
  ],
  providers: [
    {
      provide: ApplicationRepository,
      useClass: TypeOrmApplicationRepository,
    },
  ],
  exports: [ApplicationRepository],
})
export class NotificationPersistenceModule {}