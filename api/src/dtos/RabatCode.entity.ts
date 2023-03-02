import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RabatCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  codeExpired: string;

  @Column()
  valueRabat: number;
}
