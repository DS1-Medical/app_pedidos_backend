import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MoongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Prodcuto} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProdcutoRepository} from './prodcuto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  public readonly prodcuto: HasOneRepositoryFactory<Prodcuto, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.moongodb') dataSource: MoongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProdcutoRepository') protected prodcutoRepositoryGetter: Getter<ProdcutoRepository>,
  ) {
    super(Pedido, dataSource);
    this.prodcuto = this.createHasOneRepositoryFactoryFor('prodcuto', prodcutoRepositoryGetter);
    this.registerInclusionResolver('prodcuto', this.prodcuto.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
