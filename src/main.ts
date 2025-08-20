import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  //Con esto podemos cambiar el nopmbre global de nuestra ruta raiz
  app.setGlobalPrefix('api/v2'); //en la ruta api se va a redireccionar a la ruta raiz

  //validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //para que nos devuelva un objeto de la clase que creamos en el controlador
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
main();
