import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  //importamos el modelo par apoder usarlo en el servicio y el modulo common para usar nuestros adapters
  imports: [PokemonModule, CommonModule],
})
export class SeedModule {}
