import { ApiProperty } from '@nestjs/swagger';

export class VeiculosUpdateDto {
  @ApiProperty()
  public marca: string;

  @ApiProperty()
  public modelo: string;

  @ApiProperty()
  public cor: string;

  @ApiProperty({ maxLength: 7 })
  public placa: string;

  @ApiProperty({ maxLength: 1 })
  public tipo: string;
}
