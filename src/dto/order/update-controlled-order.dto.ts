import { OrderStatusEnum } from '../../entities/order.entity';

export class UpdateControlledOrderDto {
  id: string;
  status: OrderStatusEnum;
  address: string;
}
