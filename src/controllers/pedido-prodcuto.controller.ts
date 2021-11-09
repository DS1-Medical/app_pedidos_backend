import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Prodcuto,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProdcutoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/prodcuto', {
    responses: {
      '200': {
        description: 'Pedido has one Prodcuto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prodcuto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prodcuto>,
  ): Promise<Prodcuto> {
    return this.pedidoRepository.prodcuto(id).get(filter);
  }

  @post('/pedidos/{id}/prodcuto', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prodcuto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcuto, {
            title: 'NewProdcutoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) prodcuto: Omit<Prodcuto, 'id'>,
  ): Promise<Prodcuto> {
    return this.pedidoRepository.prodcuto(id).create(prodcuto);
  }

  @patch('/pedidos/{id}/prodcuto', {
    responses: {
      '200': {
        description: 'Pedido.Prodcuto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcuto, {partial: true}),
        },
      },
    })
    prodcuto: Partial<Prodcuto>,
    @param.query.object('where', getWhereSchemaFor(Prodcuto)) where?: Where<Prodcuto>,
  ): Promise<Count> {
    return this.pedidoRepository.prodcuto(id).patch(prodcuto, where);
  }

  @del('/pedidos/{id}/prodcuto', {
    responses: {
      '200': {
        description: 'Pedido.Prodcuto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prodcuto)) where?: Where<Prodcuto>,
  ): Promise<Count> {
    return this.pedidoRepository.prodcuto(id).delete(where);
  }
}
