import { GenderEnum } from 'src/enums/user.enum';
import { Test } from 'src/test/test.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, type: 'enum', enum: GenderEnum })
  gender: number;

  @Column({ type: 'boolean', default: false})
  isEmailVerified: boolean;

  @Column({ nullable: false, default: 60})
  weight: number;

  @Column({ nullable: false })
  height: number;

  @Column({ nullable: false})
  neck: number; // boyun genişliği

  @Column({ nullable: false })
  waist: number; // bel

  @Column({ nullable: false })
  hip: number; // kalça

  @OneToMany(() => Test, (entity) => entity.user)
  tests: Test[];
}
