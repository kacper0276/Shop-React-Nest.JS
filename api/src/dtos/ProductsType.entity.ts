import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
