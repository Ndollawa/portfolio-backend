import { Test, TestingModule } from '@nestjs/testing';
import { OnlineshopController } from './onlineshop.controller';
import { OnlineshopService } from './onlineshop.service';

describe('OnlineshopController', () => {
  let onlineshopController: OnlineshopController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OnlineshopController],
      providers: [OnlineshopService],
    }).compile();

    onlineshopController = app.get<OnlineshopController>(OnlineshopController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(onlineshopController.getHello()).toBe('Hello World!');
    });
  });
});
