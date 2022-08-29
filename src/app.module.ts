import { AlertaModule } from './modules/alerta/alerta.module';
import { DocumentoModule } from './modules/documento/documento.module';
import { SolicitudModule } from './modules/solicitud/solicitud.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './modules/role/role.module';


@Module({
  imports: [
    AlertaModule,
    DocumentoModule,
    SolicitudModule,
    AuthModule,
    UserModule,
    ConfigModule,
    DatabaseModule,
    RoleModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
