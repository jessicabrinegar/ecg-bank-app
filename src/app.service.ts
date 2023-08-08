import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIntro(): string {
    return 'Welcome to the Brinegar Banking App';
  }
}
