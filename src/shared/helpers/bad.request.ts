import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty()
  public statusCode: number;

  @ApiProperty()
  public message: string[];

  @ApiProperty()
  public error: string;
}
