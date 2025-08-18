import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    //de la data d elos pokemones recibimos un array de objetos
    // recorremos el arreglo para obtener cada dato y guardarlo en la DB

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/'); //separamos la url en un arreglo
      //como es un string debemos convertirlo a entero o number
      const no = +segments[segments.length - 2]; //para este caso el id o el no viene en la penultima posicion del arreglo [length-2]
    });

    return data;
  }
}
