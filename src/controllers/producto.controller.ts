import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Prodcuto} from '../models';
import {ProdcutoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(ProdcutoRepository)
    public prodcutoRepository : ProdcutoRepository,
  ) {}

  @post('/prodcutos')
  @response(200, {
    description: 'Prodcuto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prodcuto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcuto, {
            title: 'NewProdcuto',
            exclude: ['id'],
          }),
        },
      },
    })
    prodcuto: Omit<Prodcuto, 'id'>,
  ): Promise<Prodcuto> {
    return this.prodcutoRepository.create(prodcuto);
  }

  @get('/prodcutos/count')
  @response(200, {
    description: 'Prodcuto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prodcuto) where?: Where<Prodcuto>,
  ): Promise<Count> {
    return this.prodcutoRepository.count(where);
  }

  @get('/prodcutos')
  @response(200, {
    description: 'Array of Prodcuto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prodcuto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prodcuto) filter?: Filter<Prodcuto>,
  ): Promise<Prodcuto[]> {
    return this.prodcutoRepository.find(filter);
  }

  @patch('/prodcutos')
  @response(200, {
    description: 'Prodcuto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcuto, {partial: true}),
        },
      },
    })
    prodcuto: Prodcuto,
    @param.where(Prodcuto) where?: Where<Prodcuto>,
  ): Promise<Count> {
    return this.prodcutoRepository.updateAll(prodcuto, where);
  }

  @get('/prodcutos/{id}')
  @response(200, {
    description: 'Prodcuto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prodcuto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prodcuto, {exclude: 'where'}) filter?: FilterExcludingWhere<Prodcuto>
  ): Promise<Prodcuto> {
    return this.prodcutoRepository.findById(id, filter);
  }

  @patch('/prodcutos/{id}')
  @response(204, {
    description: 'Prodcuto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodcuto, {partial: true}),
        },
      },
    })
    prodcuto: Prodcuto,
  ): Promise<void> {
    await this.prodcutoRepository.updateById(id, prodcuto);
  }

  @put('/prodcutos/{id}')
  @response(204, {
    description: 'Prodcuto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prodcuto: Prodcuto,
  ): Promise<void> {
    await this.prodcutoRepository.replaceById(id, prodcuto);
  }

  @del('/prodcutos/{id}')
  @response(204, {
    description: 'Prodcuto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prodcutoRepository.deleteById(id);
  }
}
