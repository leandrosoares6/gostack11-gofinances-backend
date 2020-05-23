import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../entities/Transaction';

interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<IBalance> {
    // TODO
  }
}

export default TransactionsRepository;
