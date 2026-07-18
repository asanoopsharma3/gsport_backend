import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

function parseCorsOrigins(value: string | undefined): true | Set<string> {
  if (!value || value.trim() === '' || value.trim() === '*') {
    return true;
  }
  return new Set(
    value
      .split(',')
      .map((s) => normalizeOrigin(s))
      .filter(Boolean),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const corsEnabled = process.env.CORS_ENABLED !== 'false';
  if (corsEnabled) {
    const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);
    app.enableCors({
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean | string) => void,
      ) => {
        // Non-browser clients (Postman, server-to-server) omit Origin.
        if (!origin) {
          callback(null, true);
          return;
        }
        if (allowedOrigins === true) {
          callback(null, origin);
          return;
        }
        const normalized = normalizeOrigin(origin);
        if (allowedOrigins.has(normalized)) {
          callback(null, origin);
          return;
        }
        callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
        'x-api-key',
        'transactionid',
      ],
    });
  }

  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT ?? 3004;
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
  if (corsEnabled) {
    const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);
    console.log(
      'CORS enabled',
      allowedOrigins === true
        ? '(all origins)'
        : `[${[...allowedOrigins].join(', ')}]`,
    );
  }
}
bootstrap();
