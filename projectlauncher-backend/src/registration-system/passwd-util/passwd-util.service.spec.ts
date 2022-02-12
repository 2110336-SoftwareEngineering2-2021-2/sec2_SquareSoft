import { Test, TestingModule } from '@nestjs/testing';
import { PasswdUtilService } from './passwd-util.service';

describe('PasswdUtilService', () => {
  let service: PasswdUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswdUtilService],
    }).compile();

    service = module.get<PasswdUtilService>(PasswdUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
