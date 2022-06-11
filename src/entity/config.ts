import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Configs extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    key!: string
    @Column()
    value!: number
}