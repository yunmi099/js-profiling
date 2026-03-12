import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { httpRequestDurationSeconds } from './metrics';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = process.hrtime.bigint();
    const httpCtx = context.switchToHttp();
    const req = httpCtx.getRequest();

    return next.handle().pipe(
      finalize(() => {
        const res = httpCtx.getResponse();
        const end = process.hrtime.bigint();
        const seconds = Number(end - now) / 1_000_000_000;
        const method = (req.method || 'GET').toUpperCase();
        const status = String(res.statusCode || 200);
        const route = (req.route && req.route.path) || req.path || 'unknown';
        httpRequestDurationSeconds.labels({ method, route, status_code: status }).observe(seconds);
      })
    );
  }
}

