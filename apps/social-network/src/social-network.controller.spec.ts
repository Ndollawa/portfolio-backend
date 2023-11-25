import { Test, TestingModule } from '@nestjs/testing';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetworkService } from './social-network.service';

describe('SocialNetworkController', () => {
  let socialNetworkController: SocialNetworkController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocialNetworkController],
      providers: [SocialNetworkService],
    }).compile();

    socialNetworkController = app.get<SocialNetworkController>(SocialNetworkController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(socialNetworkController.getHello()).toBe('Hello World!');
    });
  });
});
