import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
//en los servicios va la logica
@Injectable()
export class PokemonService {
  //injeccion de dependencias para injectar el repositorio o modelo

  constructor(
    //inyectamos el modelo
    @InjectModel(Pokemon.name) //nombre de la entidad o del modelo que queremos usar
    //tambien pasamos como generico el modelo con el que estamos trabajando
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  //POST //CREATE
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase(); //convertimos el nombre a minusculas
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto); //creamos el pokemon con el objeto que nos llega por parametro
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        //ESTE ERROR ES PORQUE HAY UN REGISTRO DUPLICADO EN LA DB
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      //para recordar los throws detienen la ejecucion
      throw new InternalServerErrorException(
        'Cant Create Pokemon -Check server logs',
      );
    }
  }

  //GET ALL
  findAll() {
    return `This action returns all pokemon`;
  }
  //GET ONE BY TERM (puede ser id,. numero o nombre )
  async findOne(term: string) {
    let pokemon: Pokemon | null = null; //lo definimos como null por defecto por si no lo encontramos y asi TS no nos diga que puede ser null
    //buscamos por numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //buscamos por nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    //buscamos por mongoid
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no " ${term}" not found`,
      );
    }
    return pokemon;
  }
  //PUT // PATCH BY ID

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term); //buscamos el pokemon
    if (!pokemon) {
      throw new BadRequestException(`Pokemon not found`);
    }

    //si el nombre viene en el dto lo pasamos a minusculas y sin espacios (para que no haya problemas
    if (updatePokemonDto.name) {
      //pasamos el nombre a minusculas y sin espacios en el caso dee que se actualice el nombre
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true }); //para que nos devuelva el pokemon actualizado
    } catch (error) {
      if (error.code === 11000) {
        //si el error es 11000 es porque el nombre ya existe o pokemon ya existe
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Error updating pokemon-Check serer logs`,
      );
    }

    // si todo sale bien  retornamos erl pokemon con los datos actualizados
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }
  //DELETE ONE BY ID
  async remove(id: string) {
    const pokemon = await this.findOne(id); //buscamos el pokemon
    if (!pokemon) {
      throw new BadRequestException(`Pokemon not found`);
    }
    await pokemon.deleteOne(); //eliminamos el pokemon
    return `Pokemon "${pokemon.name}" Deleted`;
  }
}
