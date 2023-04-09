import { Client } from 'pg';
import { config } from 'dotenv';
config();

export default class PostgreSQLConnection {
    private static instance: PostgreSQLConnection;
    private client: Client;

    private constructor() {
        this.client = new Client({
            connectionString: process.env.DB_CONNECTION_STRING
        });
    }

    public static getInstance(): PostgreSQLConnection {
        if (!PostgreSQLConnection.instance) {
            PostgreSQLConnection.instance = new PostgreSQLConnection();
        }

        return PostgreSQLConnection.instance;
    }

    public async connect(): Promise<void> {
        if (!this.client) {
            await this.client.connect();
            console.log('Connected to PostgreSQL database');
        }
    }

    public async query(sql: string): Promise<any> {
        await this.connect();
        return this.client.query(sql);
    }
}
