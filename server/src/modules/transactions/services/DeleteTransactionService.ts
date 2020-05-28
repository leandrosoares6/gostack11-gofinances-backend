import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    await this.transactionsRepository.destroy(id);
  }
}

export default DeleteTransactionService;
