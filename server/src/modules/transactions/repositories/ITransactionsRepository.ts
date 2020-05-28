import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IBalanceDTO from '../dtos/IBalanceDTO';

export default interface ITransactionsRepository {
  getBalance(): Promise<IBalanceDTO>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  find(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | undefined>;
  destroy(id: string): Promise<void>;
}
