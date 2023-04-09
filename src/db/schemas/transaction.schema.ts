import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class TransactionEntity {
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