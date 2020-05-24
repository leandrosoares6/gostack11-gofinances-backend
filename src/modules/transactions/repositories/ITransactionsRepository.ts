import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IBalanceDTO from '../dtos/IBalanceDTO';

export default interface ITransactionsRepository {
  getBalance(): Promise<IBalanceDTO>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
}
