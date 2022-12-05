import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estacionamento' })
export class EstacionamentoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'veiculo_id',
    foreignKeyConstraintName: 'veiculo_id',
    type: 'integer',
  })
  public veiculoId: number;

  @Column({
    name: 'empresa_id',
    foreignKeyConstraintName: 'empresa_id',
    type: 'integer',
  })
  public empresaId: number;

  @Column({ name: 'data_entrada', type: 'datetime' })
  public dataEntrada: Date;

  @Column({ name: 'data_saida', type: 'datetime' })
  public dataSaida: Date;
}
