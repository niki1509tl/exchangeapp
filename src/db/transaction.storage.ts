import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './schemas/transaction.schema';

@Injectable()
export default class TransactionStorage {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) { }

    async findAll(): Promise<TransactionEntity[]> {
        return await this.transactionRepository.find();
    }

    async create(transaction: TransactionEntity): Promise<TransactionEntity> {
        return await this.transactionRepository.save(transaction);
    }
}

