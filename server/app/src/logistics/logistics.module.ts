import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { ShippingSchedule } from './schedule/entities/shipping-schedule.entity';
import { LogisticsSettingForIntermediary } from './setting/intermediary/entities/setting.entity';
import { Route } from './setting/logistics/entities/route.entity';
import { LogisticsSettingForLogistics } from './setting/logistics/entities/setting.entity';
import { Trip } from './setting/logistics/entities/trip.entity';
import { LogisticsSettingForProducer } from './setting/producer/entities/setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsSettingForProducer,
      LogisticsSettingForLogistics,
      LogisticsSettingForIntermediary,
      Account,
      Route,
      Trip,
      ShippingSchedule,
    ]),
  ],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [LogisticsService],
})
export class LogisticsModule {}
