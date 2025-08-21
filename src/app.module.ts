import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; //este paquete viene de nodejs y nos permite unir rutas de forma dinamica
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], //PARA CARGAR NUESTRO ARCHIVOO DE CONFIGURACION DE NUESTRAS VARIABLES DE ENTORNO
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), //le especificamos el path o directorio donde se encuentra la carpeta public O LA CARPETA QUE DESEAMOS CARGAR NUESTROS ARCHIVOS
    }),
    //cargamos mongooseModule para poder usar la base de datos
    /**TODO: cambiar la url por una variable de entorno */
    MongooseModule.forRoot(process.env.MONGODB!, {
      dbName: 'pokemonsdb', //le pasamos el nombre de la base de datos que queremos usar
    }), //le pasamos la url de nuestra db que estamos usando con docker Y EL ! PARA QUE TS SEPA QUE ESTA DEFINIDA
    //cargamos el modulo pokemon
    PokemonModule,
    CommonModule,
    SeedModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
