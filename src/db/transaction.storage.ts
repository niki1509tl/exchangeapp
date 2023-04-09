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

    async findAfterDate(date: Date, page: number, limit: number): Promise<{ conversions: TransactionEntity[], totalCount: number }> {
        const conversions = await this.transactionRepository.createQueryBuilder('transactions')
            .where('transactions.created_at > :date', { date })
            .skip(page * limit).limit(limit).getMany()
        const totalCount = await this.transactionRepository.createQueryBuilder('transactions')
            .where('transactions.created_at > :date', { date }).getCount()

        return { conversions, totalCount }
    }

    async findBytransactionid(transactionid: string) {
        return await this.transactionRepository.findBy({ transactionid })
    }

    async create(transaction: TransactionEntity): Promise<TransactionEntity> {
        return await this.transactionRepository.save(transaction);
    }
}

