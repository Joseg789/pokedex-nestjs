//aqui configuramos y mapeamos nuestras variables de entorno //tambien por convencion se puede llamar  envConfig
//en el caso de que nuestras variables de entonorno no esten definidas o no existan en esta configuracion usamos las variables por defecto o que definimos aqui
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB, //|| url alternativa
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT! || 7,
});
