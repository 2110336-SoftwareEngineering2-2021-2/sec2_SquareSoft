import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe("f");
    });
  });
});
