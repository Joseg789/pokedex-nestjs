import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapters.interface';
import { Injectable } from '@nestjs/common';

@Injectable() //si queremos injectar esto en otro servicio debemos decorarlo con @Injectable()
//esto es para que el compilador lo reconozca como un provider
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  //si axios cambia yo solo debo cambiar esta clase
  //y no necesito cambiar el resto de la

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data; //si todo sale bien retornamos la data
    } catch (error) {
      throw new Error('check logs this is an error');
    }
  }
}
