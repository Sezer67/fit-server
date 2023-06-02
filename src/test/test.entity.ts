import { TestType, testTypeName } from "src/enums/user.enum";
import { FatRate } from "src/fat-rate-data/fat-rate-data.entity";
import { User } from "src/user/user.entity";
import { Vki } from "src/vki-data/vki.data.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('test')
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({type: 'enum', enum: TestType})
    type: TestType;

    @CreateDateColumn()
    date: Date;

    @Column()
    suggestions: string;

    @Column()
    result: number;

    @Column({nullable: false, default: "Zayıf"})
    description: string;

    @Column({nullable: true})
    img: string;

    @ManyToOne(() => User, (user) => user.tests)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: string;

    @OneToOne(() => FatRate, (entity) => entity.test, { nullable: true })
    @JoinColumn({name: 'fatRateId'})
    fatRate: FatRate;

    @Column({ nullable: true })
    fatRateId: string;

    @OneToOne(() => Vki, (entity) => entity.test, { nullable: true })
    @JoinColumn({name: 'vkiId'})
    vki: Vki;

    @Column({ nullable: true })
    vkiId: string;
}