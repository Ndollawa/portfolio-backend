import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiedsController } from './classifieds.controller';
import { ClassifiedsService } from './classifieds.service';

describe('ClassifiedsController', () => {
  let classifiedsController: ClassifiedsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClassifiedsController],
      providers: [ClassifiedsService],
    }).compile();

    classifiedsController = app.get<ClassifiedsController>(ClassifiedsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(classifiedsController.getHello()).toBe('Hello World!');
    });
  });
});
