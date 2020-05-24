import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import ListTransactionsService from '@modules/transactions/services/ListTransactionsService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      title,
      type,
      value,
      category,
    });

    return response.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTansactions = container.resolve(ListTransactionsService);

    const transactions = await listTansactions.execute();

    return response.json(transactions);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    await deleteTransaction.execute(id);

    return response.status(204).send();
  }
}
