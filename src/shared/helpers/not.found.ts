import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
