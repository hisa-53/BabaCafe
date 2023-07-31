import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { LogisticsSettingForIntermediary } from 'src/logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from 'src/logistics/setting/logistics/entities/setting.entity';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './setting/logistics/dto/create-route.dto';
import { CreateTripDto } from './setting/logistics/dto/create-trip.dto';
import { UpdateDeliveryTypeDto } from './setting/logistics/dto/update-delivery-type.dto';
import { Route } from './setting/logistics/entities/route.entity';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectRepository(LogisticsSettingForLogistics)
    private logisticsSettingRepository: Repository<LogisticsSettingForLogistics>,
    @InjectRepository(LogisticsSettingForIntermediary)
    private intermediarySettingRepository: Repository<LogisticsSettingForIntermediary>,
  ) {}

  async getLogisticsSetting(logisticsId: string): Promise<LogisticsSettingForLogistics> {
    return await this.logisticsSettingRepository
      .findOne({ where: { logisticsId }, relations: ['routes', 'routes.trips', 'routes.trips.timetables'] })
      .then((setting) => setting);
  }

  async getIntermediarySetting(intermediaryId: string): Promise<LogisticsSettingForIntermediary> {
    return await this.intermediarySettingRepository.findOne({ where: { intermediaryId } }).then((setting) => setting);
  }

  async updateIntermediarySetting(
    account: Account,
    intermediaryId: string,
    dto: CreateLogisticsSettingForIntermediaryDto,
  ): Promise<LogisticsSettingForIntermediary> {
    const setting = await this.intermediarySettingRepository
      .findOne({
        where: { intermediaryId },
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }
    if (setting.intermediaryId !== account.id) {
      throw new BadRequestException();
    }

    setting.stop = dto.stop;
    this.intermediarySettingRepository.save(setting);
    return setting;
  }

  async createRoute(dto: CreateRouteDto): Promise<Route> {
    const route = new Route();

    await LogisticsService.setProductAttributes(dto, route);
    await route.save();

    return route;
  }

  private static async setProductAttributes(dto: CreateRouteDto, route: Route) {
    route.logisticsSettingId = dto.logisticsSettingId;
    route.name = dto.name;
  }

  async createTrip(account: Account, dto: CreateTripDto) {
    // TODO 便追加の処理
  }

  async updateDeliveryType(logisticsId: string, dto: UpdateDeliveryTypeDto): Promise<LogisticsSettingForLogistics> {
    const setting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId },
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    setting.deliveryType = dto.deliveryType;
    this.logisticsSettingRepository.save(setting);
    return setting;
  }
}
