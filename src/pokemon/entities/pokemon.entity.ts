import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//extendemos la clase de Document de mongoose las propiedades de la base de datos
//usamos el decorador de schema de nestjs/mongoose para definir la entidad
@Schema()
export class Pokemon extends Document {
  //LAS ENTIDADES SON CLASES
  @Prop({
    unique: true,
    required: true,
    trim: true,
    index: true,
  })
  name: string;
  //id es generado por mongodb
  @Prop({
    //decorador de property de nest
    unique: true, //unico
    trim: true, //sin espacios
    index: true, //indice sabe donde esta el elemento que estamos buscando
  })
  no: number; //numero
}
//TODO: REVISAR ESTO LUEGO
//usamod schema factory para crear el esquema de la entidad y le pasamos la clase que creamos de nuestra entidad
//exportamos el esquema de la entidad
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
