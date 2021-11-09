import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MoongodbDataSource} from '../datasources';
import {Prodcuto, ProdcutoRelations} from '../models';

export class ProdcutoRepository extends DefaultCrudRepository<
  Prodcuto,
  typeof Prodcuto.prototype.id,
  ProdcutoRelations
> {
  constructor(
    @inject('datasources.moongodb') dataSource: MoongodbDataSource,
  ) {
    super(Prodcuto, dataSource);
  }
}
