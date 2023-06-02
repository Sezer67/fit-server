import { GenderEnum } from "src/enums/user.enum";
import { Test } from "src/test/test.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('fat-rate')
export class FatRate extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: false})
    age: number;

    @Column({ nullable: false})
    height: number;

    @Column({ nullable: false})
    weight: number;

    @Column({ nullable: false})
    neck: number;

    @Column({ nullable: false })
    waist: number; // bel

    @Column({ nullable: false })
    hip: number; // kalça

    @Column({type: 'enum', enum: GenderEnum})
    gender: GenderEnum;

    @OneToOne(() => Test, (entity) => entity.fatRate, { nullable: true })
    @JoinColumn({name: 'testId'})
    test: Test;

    @Column({ nullable: true })
    testId: string;
}