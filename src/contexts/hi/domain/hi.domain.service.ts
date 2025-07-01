import { Injectable } from '@nestjs/common';

@Injectable()
export class HiDomainService {
  getHello(): string {
    return 'Hello from Domain Service!';
  }

  createHello(data: any): string {
    return `Created hello with data: ${JSON.stringify(data)}`;
  }

  getHelloById(id: string): string {
    return `Hello with ID: ${id}`;
  }

  testQuery(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old`;
  }
}

