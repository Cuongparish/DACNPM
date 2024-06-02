import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { JobService } from './job.service';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { QueryDTO } from './dto/Req/query.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindJobsWithCampaignIdsDto } from './dto/Req/find-jobs-with-campaign-ids.dto';
import { PermissionsGuard } from '../authorization/permission/permissions.guard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('')
  findJobByCampaignId(@Query('campaignId') campaignId: number) {
    return this.jobService.findJobByCampaignId(campaignId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Post('jobs-by-campaignIds')
  findJobsByCampaignIds(@Body() data: FindJobsWithCampaignIdsDto) {
    return this.jobService.findJobsByCampaignIds(data.campaignIds);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Get('all')
  getAllJobs(
    @Query()
    queryParams: QueryDTO,
  ): Promise<string> {
    return this.jobService.getAllJobs(queryParams);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('valid-jobs')
  getValidJobs(
    @Query()
    queryParams: QueryDTO,
  ): Promise<string> {
    return this.jobService.getValidJobs(queryParams);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('create-info')
  getJobInfo(): Observable<string> {
    return this.jobService.createJobInfo();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Post('create')
  createJob(@Body() data: CreateJobDto): Observable<string> {
    return this.jobService.createJob(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findJobById(@Param('id') id: number): Promise<any> {
    return this.jobService.findJobById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Put('update-status')
  updateJobStatus(@Body() data: UpdateJobDto) {
    return this.jobService.updateJobStatus(data);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('major/create')
  createMajor(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createMajor(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('major/all')
  getAllMajor(): Observable<string> {
    return this.jobService.getAllMajor();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('field/create')
  createField(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createField(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('field/all')
  getAllField(): Observable<string> {
    return this.jobService.getAllField();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('currency/create')
  createCurrency(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createCurrency(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('currency/all')
  getAllCurrency(): Observable<string> {
    return this.jobService.getAllCurrency();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('level/create')
  createLevel(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createLevel(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('level/all')
  getAllLevel(): Observable<string> {
    return this.jobService.getAllLevel();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('location/create')
  createLocation(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createLocation(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('location/all')
  getAllLocation(): Observable<string> {
    return this.jobService.getAllLocation();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('exp/create')
  createExp(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createExp(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('exp/all')
  getAllExp(): Observable<string> {
    return this.jobService.getAllExp();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Post('type/create')
  createJobType(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createJobType(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('type/all')
  getAllJobType(): Observable<string> {
    return this.jobService.getAllJobType();
  }
}
