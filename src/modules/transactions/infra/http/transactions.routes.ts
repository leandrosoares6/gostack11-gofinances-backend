import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TransactionsController from './controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

transactionsRouter.delete('/:id', transactionsController.destroy);

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
