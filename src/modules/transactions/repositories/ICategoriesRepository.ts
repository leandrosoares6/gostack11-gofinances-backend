import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByTitle(category: string): Promise<Category | undefined>;
  create(title: string): Promise<Category>;
}
