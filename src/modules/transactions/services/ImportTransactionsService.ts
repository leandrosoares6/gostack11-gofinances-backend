import { injectable, inject } from 'tsyringe';
// import fs from 'fs';
// import path from 'path';
// import uploadConfig from '@config/upload';
// import * as csv from 'fast-csv';

// import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class ImportTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(file: string): Promise<Transaction[]> {
    /* const filePath = path.resolve(uploadConfig.tmpFolder, file);
    const trasactions: Transaction[] = [];

    const createTransaction = new CreateTransactionService(
      this.transactionsRepository,
      this.categoriesRepository,
    );

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', async row => {
        const { title, type, value, category } = row;

        const transaction = await createTransaction.execute({
          title,
          type,
          value,
          category,
        });

        if (!transaction) {
          throw new AppError('Invalid format file.');
        } else {
          trasactions.push(transaction);
        }
      })
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
    await fs.promises.unlink(filePath);

    console.log(trasactions); */
    return [];
  }
}

export default ImportTransactionsService;
