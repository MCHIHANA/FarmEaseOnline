import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') // Ensure this matches your database table name
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column()
  productType: string;

  @Column()
  farmName: string;

  @Column()
  location: string;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  available: boolean;
}
