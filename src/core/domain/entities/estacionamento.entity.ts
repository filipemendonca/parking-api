import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estacionamento' })
export class EstacionamentoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'integer',
  })
  public veiculoId: number;

  @Column({
    type: 'integer',
  })
  public empresaId: number;

  @Column({ name: 'data_entrada', type: 'datetime' })
  public dataEntrada: Date;

  @Column({ name: 'data_saida', type: 'datetime', nullable: true })
  public dataSaida?: Date;
}
