import { Injectable } from '@nestjs/common';
import { CreateVideocallDto } from './dto/create-videocall.dto';
import { UpdateVideocallDto } from './dto/update-videocall.dto';

@Injectable()
export class VideocallService {
  create(createVideocallDto: CreateVideocallDto) {
    return 'This action adds a new videocall';
  }

  findAll() {
    return `This action returns all videocall`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videocall`;
  }

  update(id: number, updateVideocallDto: UpdateVideocallDto) {
    return `This action updates a #${id} videocall`;
  }

  remove(id: number) {
    return `This action removes a #${id} videocall`;
  }
}
