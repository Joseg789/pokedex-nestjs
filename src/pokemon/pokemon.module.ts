import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  imports: [
    //PASAMOS EL NAME QUE HEREDAMOS DE DOCUUMENT Y EL SCHEMA QUE CREAMOS
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
  //exportamos el modulo para que pueda ser usado en otros archivos o en otros servicios
  exports: [MongooseModule],
})
export class PokemonModule {}
