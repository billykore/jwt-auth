import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column("int", { default: 0 })
    tokenVersion: number;

}
