import { Test, TestingModule } from '@nestjs/testing';
import { PublishedcontestService } from './publishedcontest.service';

describe('PublishedcontestService', () => {
  let service: PublishedcontestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishedcontestService],
    }).compile();

    service = module.get<PublishedcontestService>(PublishedcontestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
