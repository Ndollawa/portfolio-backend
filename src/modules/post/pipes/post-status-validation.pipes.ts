import { Injectable } from '@nestjs/common';
import { EnumValidationPipe } from 'src/common/pipes/enum-validation.pipe';

@Injectable()
export class PostStatusValidationPipe extends EnumValidationPipe {
  constructor(PostStatusEnum) {
    super(PostStatusEnum);
  }
}
