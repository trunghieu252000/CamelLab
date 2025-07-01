import { Injectable } from '@nestjs/common';
import { IHiRepository } from '../domain/repositories/hi.repository.interface';

@Injectable()
export class HiRepository implements IHiRepository {
  sayHi(who: string): string {
    return 'Hi Infrastructure';
  }
}
// auto-commit 41
// auto-commit 100
