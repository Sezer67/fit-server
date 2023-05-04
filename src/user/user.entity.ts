import { GenderEnum } from 'src/enums/user.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: false })
  height: number;

  @Column({ nullable: false})
  neck: number; // boyun genişliği

  @Column({ nullable: false })
  waist: number; // bel

  @Column({ nullable: false })
  hip: number; // kalça
}
