import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class TransactionsEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    created_at: Date
    @Column()
    sourceAmount: number
    @Column()
    from: string
    @Column()
    to: string
}