import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
