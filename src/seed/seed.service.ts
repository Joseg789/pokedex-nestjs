import { Injectable } from '@nestjs/common';
import { PokeResponse } from './poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  //INYECTAMOS EL MODELO PARA PODER USARLO
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    //injectamos la dependencia de axios
    // private readonly http: FetchAdapter, //nombramos nuestra dependencia como http aunque podria ser cualquier nombre/// CON FETCH
    private readonly http: AxiosAdapter, //nombramos nuestra dependencia como http aunque podria ser cualquier nombre/// con AXIOS
  ) {}

  async executeSeed() {
    //si hace falta podemos limpiar la db antes de ejecutar el seed
    await this.pokemonModel.deleteMany({}); //eliminamos todos los pokemones de la db
    //obtenemos los datos de la api
    const data = await this.http.get<PokeResponse>( //como ya extraemos la data en el adapter no es necesario desesctructurarla
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    //de la data d elos pokemones recibimos un array de objetos
    // recorremos el arreglo para obtener cada dato y guardarlo en la DB
    const pokemonsToInsert: { name: string; no: number }[] = []; //creamos un arreglo para guardar los pokemones que vamos a insertar [{name,no}]
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/'); //separamos la url en un arreglo
      //como es un string debemos convertirlo a entero o number
      const no = +segments[segments.length - 2]; //para este caso el id o el no viene en la penultima posicion del arreglo [length-2]
      //creamos un objeto con los datos que necesitamos guardar en la DB
      // const pokemon = {
      //   name,
      //   no,
      // };
      // //creamos el pokemon en la db
      // await this.pokemonModel.create(pokemon);

      //----------------------MANEARA MAS OPTIMA--------------------------------------
      //guardamos todos los pokemones en un arreglo y luego los insertamos por lote en la db
      pokemonsToInsert.push({ name, no });
    });
    //tambien podriamos hacerlo con un arreglo de promesas y luego resolver todas las promesas con un promise.all pero es mejor  insertar todo por lotes porque es mas eficienteS
    //insertamos por lote en la db
    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'seed executed successfully';
  }
}
