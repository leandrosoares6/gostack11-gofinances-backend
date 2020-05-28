import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@modules/transactions/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return findCategory;
  }

  public async create(title: string): Promise<Category> {
    const category = this.ormRepository.create({
      title,
    });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
