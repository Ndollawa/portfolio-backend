import { PipeTransform } from '@nestjs/common/';

export abstract class EnumValidationPipe implements PipeTransform {
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
