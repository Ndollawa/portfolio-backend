import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceInterface } from './interfaces/service.interface';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  @Get()
  async getServices(): Promise<ServiceInterface[]> {
    return await this.serviceService.getServices();
  }

  @Get()
  async getServiceById(@Param('id') id: string): Promise<ServiceInterface> {
    return await this.serviceService.getServiceById(id);
  }

  @Post()
  async createService(
    @Body() createServiceData: CreateServiceDto,
  ): Promise<ServiceInterface> {
    return await this.serviceService.createService(createServiceData);
  }

  @Put(':id')
  async updateService(
    @Param() id: string,
    @Body() updateServiceData: UpdateServiceDto,
  ): Promise<ServiceInterface> {
    return await this.serviceService.updateService(id, updateServiceData);
  }

  @Delete()
  async deleteServices(): Promise<ServiceInterface[]> {
    return await this.serviceService.getServices();
  }
}
