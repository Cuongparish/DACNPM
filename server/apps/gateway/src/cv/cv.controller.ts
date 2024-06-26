import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CVService } from './cv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../authorization/permission/permissions.guard';
import { UserClaims } from '../authorization/entity/user-claims.entity';
import { GetUser } from '../authorization/get-user.decorator';

@Controller('cv')
export class CVController {
  uploadService: any;
  constructor(private readonly cvService: CVService) {}

  //find all (pending)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllCVs(): Observable<any> {
    return this.cvService.getAllCVs();
  }

  @Get('hello')
  getHello(): Observable<any> {
    return this.cvService.getHello();
  }

  //find one by id -> hr + user
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getCVById(
    @GetUser() user: UserClaims,
    @Param('id') id: number,
  ): Observable<any> {
    const hasRole = user.permissions;
    if (hasRole[0] === 'role:hr' || hasRole[0] === 'role:user') {
      return this.cvService.getCVById(id);
    }
    throw new ForbiddenException(
      'You are not authorized to access this resource',
    );
  }
  //create cv
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  createCV(
    @GetUser() user: UserClaims,
    @UploadedFile() file: any,
    @Body('templateId') templateId: string,
  ): Observable<any> {
    const numericTemplateId = parseInt(templateId, 10);
    return this.cvService.createCV(file, user.sub, numericTemplateId);
  }
  //update status cv
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Put(':id')
  updateCV(
    @Param('id') id: number,
    @Body('isPublic') isPublic: boolean,
  ): Observable<any> {
    return this.cvService.updateCV(id, isPublic);
  }
  //delete cv
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Delete(':id')
  deleteCV(@Param('id') id: number): Observable<any> {
    return this.cvService.deleteCV(id);
  }
  //dowmload cv
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('download/:id')
  downloadCV(@Param('id') id: number, @Res() res: Response): Observable<any> {
    return this.cvService.downloadCV(id, res);
  }

  // @Get('/test')
  // getCVsById(): Observable<any[]> {
  //   return this.cvService.getCVsById();
  // }
}
