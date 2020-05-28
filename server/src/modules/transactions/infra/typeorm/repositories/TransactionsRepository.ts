import { Repository, getRepository } from 'typeorm';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async getBalance(): Promise<IBalanceDTO> {
    const transactions = await this.ormRepository.find();
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public async create({
    title,
    value,
    type,
    category_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async find(): Promise<Transaction[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default TransactionsRepository;
