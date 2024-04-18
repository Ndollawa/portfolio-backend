import { PartialType } from '@nestjs/mapped-types';
import { CreateVideocallDto } from './create-videocall.dto';

export class UpdateVideocallDto extends PartialType(CreateVideocallDto) {
  id: number;
}
