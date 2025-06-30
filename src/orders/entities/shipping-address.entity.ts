import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() fullName: string;
  @Column() phone: string;
  @Column() addressLine1: string;
  @Column({ nullable: true }) addressLine2?: string;
  @Column() city: string;
}
