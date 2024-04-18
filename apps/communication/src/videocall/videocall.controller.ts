import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideocallService } from './videocall.service';
import { CreateVideocallDto } from './dto/create-videocall.dto';
import { UpdateVideocallDto } from './dto/update-videocall.dto';

@Controller()
export class VideocallController {
  constructor(private readonly videocallService: VideocallService) {}

  @MessagePattern('createVideocall')
  create(@Payload() createVideocallDto: CreateVideocallDto) {
    return this.videocallService.create(createVideocallDto);
  }

  @MessagePattern('findAllVideocall')
  findAll() {
    return this.videocallService.findAll();
  }

  @MessagePattern('findOneVideocall')
  findOne(@Payload() id: number) {
    return this.videocallService.findOne(id);
  }

  @MessagePattern('updateVideocall')
  update(@Payload() updateVideocallDto: UpdateVideocallDto) {
    return this.videocallService.update(updateVideocallDto.id, updateVideocallDto);
  }

  @MessagePattern('removeVideocall')
  remove(@Payload() id: number) {
    return this.videocallService.remove(id);
  }
}
