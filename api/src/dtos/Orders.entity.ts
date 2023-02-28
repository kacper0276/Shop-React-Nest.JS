import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productQuantity: number;

  @Column()
  productPrice: number;

  @Column()
  adres: string;

  @Column()
  seller: string;

  @Column()
  clientEmail: string;

  @Column()
  date: Date;
}
