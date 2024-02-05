import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @MessagePattern('createService')
  create(@Payload() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @MessagePattern('findAllService')
  findAll() {
    return this.serviceService.findAll();
  }

  @MessagePattern('findOneService')
  findOne(@Payload() id: number) {
    return this.serviceService.findOne(id);
  }

  @MessagePattern('updateService')
  update(@Payload() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(updateServiceDto.id, updateServiceDto);
  }

  @MessagePattern('removeService')
  remove(@Payload() id: number) {
    return this.serviceService.remove(id);
  }
}
