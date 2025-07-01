import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduledTasksService {
  private readonly logger = new Logger(ScheduledTasksService.name);

  constructor() {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Running scheduled task every minute');
    // Add your scheduled task logic here
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyTask() {
    this.logger.debug('Running daily scheduled task');
    // Add your daily task logic here
  }

  @Cron('0 */6 * * *') // Every 6 hours
  async handleSixHourTask() {
    this.logger.debug('Running six-hour scheduled task');
    // Add your six-hour task logic here
  }
} // auto-commit 46
// auto-commit 105
