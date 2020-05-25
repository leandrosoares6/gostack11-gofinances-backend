import { uuid } from 'uuidv4';

import ICategoriesRepository from '@modules/transactions/repositories/ICategoriesRepository';
import Category from '../../infra/typeorm/entities/Category';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByTitle(title: string): Promise<Category | undefined> {
    const category = this.categories.find(
      findCategory => findCategory.title === title,
    );

    return category;
  }

  public async create(title: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), title });

    this.categories.push(category);

    return category;
  }
}

export default FakeCategoriesRepository;
