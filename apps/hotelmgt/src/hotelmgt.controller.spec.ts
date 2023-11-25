import { Test, TestingModule } from '@nestjs/testing';
import { HotelmgtController } from './hotelmgt.controller';
import { HotelmgtService } from './hotelmgt.service';

describe('HotelmgtController', () => {
  let hotelmgtController: HotelmgtController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HotelmgtController],
      providers: [HotelmgtService],
    }).compile();

    hotelmgtController = app.get<HotelmgtController>(HotelmgtController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hotelmgtController.getHello()).toBe('Hello World!');
    });
  });
});
