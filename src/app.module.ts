import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Global()
@Module({
  imports: [
    UserModule,
    ClientsModule.register([
      {
        name:'USER_SERVICE',
        transport:Transport.GRPC,
        options:{
          package:'user',
          protoPath:join(__dirname,'protos/user.proto'),
          url:'localhost:5000'
        }
      }
    ])
  ],
  controllers: [],
  providers: [],
  exports: [ClientsModule]
})
export class AppModule {}
