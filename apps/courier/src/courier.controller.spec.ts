import { Test, TestingModule } from '@nestjs/testing';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

describe('CourierController', () => {
  let courierController: CourierController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CourierController],
      providers: [CourierService],
    }).compile();

    courierController = app.get<CourierController>(CourierController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(courierController.getHello()).toBe('Hello World!');
    });
  });
});
