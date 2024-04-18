import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  const PORT: number | string = process.env.PORT || 4000;

  await app.listen(PORT, '0.0.0.0');
  console.log(`App is listening on port: `, PORT);
}
bootstrap();
