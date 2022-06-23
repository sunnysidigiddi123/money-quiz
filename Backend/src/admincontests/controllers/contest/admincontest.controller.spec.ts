import { Test, TestingModule } from '@nestjs/testing';
import { AdminContestController } from './admincontest.controller';

describe('ContestController', () => {
  let controller: AdminContestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminContestController],
    }).compile();

    controller = module.get<AdminContestController>(AdminContestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
