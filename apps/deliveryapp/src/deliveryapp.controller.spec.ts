import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryappController } from './deliveryapp.controller';
import { DeliveryappService } from './deliveryapp.service';

describe('DeliveryappController', () => {
  let deliveryappController: DeliveryappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryappController],
      providers: [DeliveryappService],
    }).compile();

    deliveryappController = app.get<DeliveryappController>(DeliveryappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deliveryappController.getHello()).toBe('Hello World!');
    });
  });
});
