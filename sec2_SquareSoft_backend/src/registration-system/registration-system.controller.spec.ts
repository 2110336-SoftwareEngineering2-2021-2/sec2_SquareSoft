import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationSystemController } from './registration-system.controller';

describe('RegistrationSystemController', () => {
  let controller: RegistrationSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationSystemController],
    }).compile();

    controller = module.get<RegistrationSystemController>(RegistrationSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
