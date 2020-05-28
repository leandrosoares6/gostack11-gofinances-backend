import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';
import IBalanceDTO from '../dtos/IBalanceDTO';

interface IResponse {
  transactions: Transaction[];
  balance: IBalanceDTO;
}

@injectable()
class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const balance = await this.transactionsRepository.getBalance();

    const transactions = await this.transactionsRepository.find();

    return {
      transactions,
      balance,
    };
  }
}

export default ListTransactionsService;
