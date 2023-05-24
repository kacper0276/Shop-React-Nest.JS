import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productQuantity: string;

  @Column()
  productPrice: string;

  @Column()
  adres: string;

  @Column()
  seller: string;

  @Column()
  deliveryType: string;

  @Column()
  clientEmail: string;

  @Column()
  date: string;

  @Column()
  status: Boolean;

  @Column()
  startCompleted: Boolean;
}
