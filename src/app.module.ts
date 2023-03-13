import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ErrorMiddleware } from '@infra/http/middlewares/error-middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
