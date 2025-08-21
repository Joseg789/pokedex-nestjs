//usaremos joi para validar los datos que llegan desde el front por ejemplo
//se puede usar joi para validar datos

import * as Joi from 'joi'; //* para importar todo de Joi
export const JoiValidationSchema = Joi.object({
  //validaremos en este caso que nuestrras variables de entorno esten estrictamente definidas
  //sino arrojamos errores
  MONGODB: Joi.required(), //ES OBLIGATORIO que exista una variable de entorno llamada MONGODB POR ESO EL REQUIRED
  PORT: Joi.number().default(3005), //puede ser cualquier numero por defecto por ejemplo definimos 3005
  //si no se definen variables de entorno por defecto se usara un valor por defecto
  DEFAULT_LIMIT: Joi.number().default(6), //si no se definen variables de entorno por defecto se usara un valor por defecto
});
//ESTE SCHEMA LO PASAMOS AL MODULO DONDE QUERAMOS USARLO O EN EL MODULO DE CONFIGURACION EN APP.MODULE
