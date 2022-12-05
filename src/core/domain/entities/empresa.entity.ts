import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'empresa' })
export class EmpresaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 250, type: 'varchar' })
  public nome: string;

  @Column({ length: 14, type: 'varchar' })
  public cnpj: string;

  @Column({ length: 500, type: 'varchar' })
  public endereco: string;

  @Column({ name: 'qtd_vagas_carros', type: 'integer' })
  public qtdVagasCarros: number;

  @Column({ name: 'qtd_vagas_motos', type: 'integer' })
  public qtdVagasMotos: number;
}
