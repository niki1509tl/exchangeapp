import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import defaultLogger, { Logger } from '../../../business/services/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let logger: Logger = defaultLogger
        logger.logError(error)
        // Handle the error and send a response to the client
        if (error instanceof Error) {
            response.status(400).json({
                statusCode: 400,
                message: error.message,
            });
        } else {
            response.status(500).json({
                statusCode: 500,
                message: `Internal server error: ${JSON.stringify(error)}`,
            });
        }
    }
}
