import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ErrorMiddleware } from '@infra/http/middlewares/error-middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
