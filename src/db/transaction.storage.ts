import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsEntity } from './schemas/transaction.schema';

@Injectable()
export default class TransactionStorage {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionRepository: Repository<TransactionsEntity>,
    ) { }

    async findAll(): Promise<TransactionsEntity[]> {
        return await this.transactionRepository.find();
    }

    async create(transaction: TransactionsEntity): Promise<TransactionsEntity> {
        return await this.transactionRepository.save(transaction);
    }
}

