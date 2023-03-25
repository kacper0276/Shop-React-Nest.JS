import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quentity: number;

  @Column()
  description: string;

  @Column()
  img: string;

  @Column()
  seller: string;
}
