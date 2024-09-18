import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';

describe('OfficeController', () => {
  let officeController: OfficeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OfficeController],
      providers: [OfficeService],
    }).compile();

    officeController = app.get<OfficeController>(OfficeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(officeController.getHello()).toBe('Hello World!');
    });
  });
});
