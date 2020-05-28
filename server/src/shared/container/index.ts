import { container } from 'tsyringe';

import './providers';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';
import ICategoriesRepository from '@modules/transactions/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/transactions/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
