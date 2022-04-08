import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
