import { Test, TestingModule } from '@nestjs/testing';
import { FolioController } from './folio.controller';
import { FolioService } from './folio.service';

describe('FolioController', () => {
  let folioController: FolioController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FolioController],
      providers: [FolioService],
    }).compile();

    folioController = app.get<FolioController>(FolioController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(folioController.getHello()).toBe('Hello World!');
    });
  });
});
