import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // Allow null values for optional fields
  full_name: string;

  @Column({ nullable: true }) // Allow null values for optional fields
  farm_name: string;

  @Column({ nullable: true }) // Allow null values for optional fields
  location: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) // Allow null values for optional fields
  contact_details: string;

  @Column()
  password: string;
}
