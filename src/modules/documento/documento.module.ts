import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
