import { Injectable } from '@nestjs/common';
import { HiDomainService } from '../domain/hi.domain.service';

@Injectable()
export class HiApplicationService {
  constructor(private readonly hiDomainService: HiDomainService) {}

  async getHello(): Promise<string> {
    return this.hiDomainService.getHello();
  }

  async createHello(data: { message: string }): Promise<string> {
    return this.hiDomainService.createHello(data);
  }

  async getHelloById(id: string): Promise<string> {
    return this.hiDomainService.getHelloById(id);
  }

  async testQuery(name: string, age: number): Promise<string> {
    return this.hiDomainService.testQuery(name, age);
  }
}
