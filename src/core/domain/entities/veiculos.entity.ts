import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'veiculos' })
export class VeiculosEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 250 })
  public marca: string;

  @Column({ length: 250 })
  public modelo: string;

  @Column({ length: 250 })
  public cor: string;

  @Column({ length: 7 })
  public placa: string;

  @Column({ length: 1 })
  public tipo: string;
}
