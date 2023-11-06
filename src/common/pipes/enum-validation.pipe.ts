import { Injectable, PipeTransform } from '@nestjs/common/';

@Injectable()
export class EnumValidationPipe implements PipeTransform {
  readonly allowedStatuses: any;
  constructor(allowedStatuses: any) {
    this.allowedStatuses = [...allowedStatuses];
  }

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid) {
    }
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
