import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    title,
    value,
    type,
    category,
  }: IRequest): Promise<Transaction> {
    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Invalid type.');
    }

    const { income } = await this.transactionsRepository.getBalance();
    if (type === 'outcome' && income < value) {
      throw new AppError('Outcome transaction without a valid balance!');
    }
    let transactionCategory: Category;

    const findCategory = await this.categoriesRepository.findByTitle(category);

    if (!findCategory) {
      transactionCategory = await this.categoriesRepository.create(category);
    } else {
      transactionCategory = findCategory;
    }

    const transaction = await this.transactionsRepository.create({
      title,
      value,
      type,
      category_id: transactionCategory.id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
