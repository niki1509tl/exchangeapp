import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from 'src/db/schemas/transaction.schema';
import TransactionStorage from 'src/db/transaction.storage';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity])],
    providers: [TransactionStorage],
    controllers: [],
})
export class TransactionModule { }
