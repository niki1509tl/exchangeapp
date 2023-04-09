import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class TransactionsEntity {
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    created_at: Date
    @Column({ type: 'double precision' })
    sourceAmount: number
    @Column()
    from: string
    @Column()
    to: string
    @Column()
    transactionId: string
}