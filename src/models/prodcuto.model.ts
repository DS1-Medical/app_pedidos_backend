import {Entity, model, property} from '@loopback/repository';

@model()
export class Prodcuto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<Prodcuto>) {
    super(data);
  }
}

export interface ProdcutoRelations {
  // describe navigational properties here
}

export type ProdcutoWithRelations = Prodcuto & ProdcutoRelations;
