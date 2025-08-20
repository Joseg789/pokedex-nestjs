import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number; //PARA DEFINIR LOS LIMITES DE LA PAGINACION COMO RESPUESTA DE LA CONSULTA
  //POR EJEMPLO SI SOLICITAMOS 10 REGISTROS POR PAGINA Y EL USUARIO SOLICITA LA PAGINA 2
  //ENTONCES EL OFFSET DEBE SER 10 * 2 = 20
  //EL OFFSET SERA EL NRO DE REGISTROS QUE SE HA OMITIDO DE LA CONSULTA
  @IsNumber()
  @IsOptional()
  @IsPositive()
  offset?: number;
}
