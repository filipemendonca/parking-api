import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class VeiculosDto {
  @IsNotEmpty()
  @ApiProperty()
  public marca: string;

  @IsNotEmpty()
  @ApiProperty()
  public modelo: string;

  @IsNotEmpty()
  @ApiProperty()
  public cor: string;

  @IsNotEmpty()
  @ApiProperty({ maxLength: 7 })
  public placa: string;

  @IsNotEmpty()
  @IsIn(['C', 'M'])
  @ApiProperty({ maxLength: 1 })
  public tipo: string;
}
