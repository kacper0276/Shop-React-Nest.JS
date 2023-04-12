import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  namePhoto: string;
}
