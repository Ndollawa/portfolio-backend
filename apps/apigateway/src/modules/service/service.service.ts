import { Injectable } from '@nestjs/common';
import { ServiceRepository } from './service.repository';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceInterface } from './interfaces/service.interface';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getServiceById(serviceId: string): Promise<ServiceInterface> {
    return this.serviceRepository.findOne({ _id: serviceId });
  }

  async getServices(): Promise<ServiceInterface[]> {
    return this.serviceRepository.find({});
  }

  async createService(
    createServiceData: CreateServiceDto,
  ): Promise<ServiceInterface> {
    return this.serviceRepository.create(createServiceData);
  }

  async updateService(
    serviceId: string,
    updateServiceData: UpdateServiceDto,
  ): Promise<ServiceInterface> {
    return this.serviceRepository.findOneAndUpdate(
      { _id: serviceId },
      updateServiceData,
    );
  }

  async deleteServiceById(serviceId: string): Promise<boolean> {
    return this.serviceRepository.deleteOne({ _id: serviceId });
  }

  async deleteManyServices(serviceIds: string): Promise<boolean> {
    return this.serviceRepository.deleteMany({ _id: serviceIds });
  }
}
