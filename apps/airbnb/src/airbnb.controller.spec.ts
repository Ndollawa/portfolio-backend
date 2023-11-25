import { Test, TestingModule } from '@nestjs/testing';
import { AirbnbController } from './airbnb.controller';
import { AirbnbService } from './airbnb.service';

describe('AirbnbController', () => {
  let airbnbController: AirbnbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AirbnbController],
      providers: [AirbnbService],
    }).compile();

    airbnbController = app.get<AirbnbController>(AirbnbController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(airbnbController.getHello()).toBe('Hello World!');
    });
  });
});
