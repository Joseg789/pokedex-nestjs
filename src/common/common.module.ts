import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { FetchAdapter } from './adapters/fetch.adapter';

@Module({
  providers: [AxiosAdapter, FetchAdapter], //defiimos nuestros providers
  exports: [AxiosAdapter, FetchAdapter], //exportamos nuestros providers para que puedan ser usados por otros módulos
})
export class CommonModule {}
