import { PartialType } from '@nestjs/mapped-types';
import { User } from '@app/common';

export interface UpdateUserDto {
    id:String;
    data:Partial<User> 
}
