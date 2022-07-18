import { Test, TestingModule } from '@nestjs/testing';
import { PublishedcontestController } from './publishedcontest.controller';

describe('PublishedcontestController', () => {
  let controller: PublishedcontestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishedcontestController],
    }).compile();

    controller = module.get<PublishedcontestController>(PublishedcontestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
