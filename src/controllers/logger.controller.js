import { logger } from '../config/logger.config.js';

export const testLogger = async (req, res) => {

    logger.debug('Logger test - nivel debug');

    logger.http('Logger test - nivel http');

    logger.info('Logger test - nivel info');

    logger.warning('Logger test - nivel warning');

    logger.error('Logger test - nivel error');

    logger.fatal('Logger test - nivel fatal');
    return res.status(200).json({
        status: 'success',
        message: 'Todos los niveles del logger fueron ejecutados'
    });
};
