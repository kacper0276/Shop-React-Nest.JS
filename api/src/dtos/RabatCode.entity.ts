import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RabatCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  codeExpired: Date;

  @Column()
  valueRabat: number;
}
