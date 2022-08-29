import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AlertaController],
  providers: [AlertaService],
})
export class AlertaModule {}
