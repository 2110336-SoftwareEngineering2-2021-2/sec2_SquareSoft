import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationSystemService } from './registration-system.service';

describe('RegistrationSystemService', () => {
  let service: RegistrationSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationSystemService],
    }).compile();

    service = module.get<RegistrationSystemService>(RegistrationSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
