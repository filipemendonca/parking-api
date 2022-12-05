import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 250 })
  public username: string;

  @Column({ length: 250 })
  public password: string;
}
