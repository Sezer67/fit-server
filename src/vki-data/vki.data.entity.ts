import { Test } from "src/test/test.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('vki')
export class Vki extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: false})
    height: number;

    @Column({ nullable: false})
    weight: number;

    @OneToOne(() => Test, (entity) => entity.fatRate, { nullable: true })
    @JoinColumn({name: 'testId'})
    test: Test;

    @Column({ nullable: true })
    testId: string;
}