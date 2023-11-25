import { Test, TestingModule } from '@nestjs/testing';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';

describe('MessengerController', () => {
  let messengerController: MessengerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessengerController],
      providers: [MessengerService],
    }).compile();

    messengerController = app.get<MessengerController>(MessengerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(messengerController.getHello()).toBe('Hello World!');
    });
  });
});
