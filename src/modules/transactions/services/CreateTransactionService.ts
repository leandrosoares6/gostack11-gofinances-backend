// import AppError from '../errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';

interface IRequest {
  title: string;
  value: string;
  type: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: IRequest): Promise<Transaction> {
    // TODO
  }
}

export default CreateTransactionService;
