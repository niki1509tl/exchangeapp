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

export const createTransactionQuery =
    `CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        from VARCHAR(255) NOT NULL,
        to VARCHAR(255) NOT NULL,
        sourceAmount INTEGER NOT NULL,
    );
`; 