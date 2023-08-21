import { baseAPI } from '../api/base';
import type { TSuggestTrip as SuggestTrip } from './../../../../server/app/src/logistics/logistics.service';
import type { CreateLogisticsSettingForIntermediaryDto } from './../../../../server/app/src/logistics/setting/intermediary/dto/create-setting.dto';
import type { TLogisticsSettingForIntermediary } from './../../../../server/app/src/logistics/setting/intermediary/entities/setting.entity';
import type { TLogisticsSettingForLogistics } from './../../../../server/app/src/logistics/setting/logistics/entities/setting.entity';
import type { CreateLogisticsSettingForProducerDto } from './../../../../server/app/src/logistics/setting/producer/dto/create-setting.dto';
import type { TLogisticsSettingForProducer } from './../../../../server/app/src/logistics/setting/producer/entities/setting.entity';
import type { Jsonify } from 'type-fest';

export type TProducerSetting = Jsonify<TLogisticsSettingForProducer>;
export type TLogisticsSetting = Jsonify<TLogisticsSettingForLogistics>;
export type TIntermediarySetting = Jsonify<TLogisticsSettingForIntermediary>;
export type TProducerSettingForm = Jsonify<CreateLogisticsSettingForProducerDto>;
export type TIntermediarySettingForm = Jsonify<CreateLogisticsSettingForIntermediaryDto>;
export type TSuggestTrip = Jsonify<SuggestTrip>;

export class LogisticsRepository {
  get baseEndpoint(): string {
    return 'logistics';
  }

  async getProducerSetting(id: string): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/${id}`,
    });
  }

  async getLogisticsSetting(id: string): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${id}`,
    });
  }

  async getIntermediarySetting(id: string): Promise<TIntermediarySetting> {
    return await baseAPI<TIntermediarySetting>({
      endpoint: `${this.baseEndpoint}/setting/intermediary/${id}`,
    });
  }

  async updateProducerSetting(id: string, body: TProducerSettingForm): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/${id}`,
      method: 'PUT',
      body,
    });
  }

  async updateIntermediarySetting(id: string, body: TIntermediarySettingForm): Promise<TIntermediarySetting> {
    return await baseAPI<TIntermediarySetting>({
      endpoint: `${this.baseEndpoint}/setting/intermediary/${id}`,
      method: 'PUT',
      body,
    });
  }

  async getTripSuggestions(pickupStop: string, deliveryStop: string, count: number): Promise<Record<string, string>[]> {
    return await baseAPI<Record<string, string>[]>({
      endpoint: `${this.baseEndpoint}/tripsuggestions?pickup-stop=${pickupStop}&delivery-stop=${deliveryStop}&count=${count}`,
    });
  }
}
