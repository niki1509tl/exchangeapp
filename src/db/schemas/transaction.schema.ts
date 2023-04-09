import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"
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
    @Unique(['transactionid'])
    transactionid: string
}