export interface TransactionsModel {
    id: number;
    created_at: Date;
    sourceAmount: number
    from: string
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