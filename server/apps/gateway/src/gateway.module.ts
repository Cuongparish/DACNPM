import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { UploadModule } from './upload/upload.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { CVModule } from './cv/cv.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmployerModule } from './employer/employer.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './authorization';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ApplicationModule,
    NotificationModule,
    JobModule,
    UploadModule,
    CompanyModule,
    UserModule,
    CVModule,
    AuthorizationModule,
    ConfigModule.forRoot(),
    EmployerModule,
    AdminModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService, JwtStrategy],
})
export class GatewayModule {}
