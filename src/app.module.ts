import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; //este paquete viene de nodejs y nos permite unir rutas de forma dinamica
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), //le especificamos el path o directorio donde se encuentra la carpeta public O LA CARPETA QUE DESEAMOS CARGAR NUESTROS ARCHIVOS
    }),
    //cargamos mongooseModule para poder usar la base de datos
    /**TODO: cambiar la url por una variable de entorno */
    MongooseModule.forRoot('mongodb://localhost:27017/pokedex'), //le pasamos la url de nuestra db que estamos usando con docker
    //cargamos el modulo pokemon
    PokemonModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
