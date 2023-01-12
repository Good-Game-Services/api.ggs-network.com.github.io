const { Signale } = require('signale'); //require signale

function log(scope, msg) {
    const logger = new Signale({ scope: scope });
    logger.log(msg);
}
function warn(scope, msg) {
    const logger = new Signale({ scope: scope });
    logger.warn(msg);
}
function info(scope, msg) {
    const logger = new Signale({ scope: scope });
    logger.info(msg);
}
function success(scope, msg) {
    const logger = new Signale({ scope: scope });
    logger.success(msg);
}
function error (scope, msg) {
    const logger = new Signale({ scope: scope, msg: msg});
    logger.error(msg);
}

module.exports = {
    log,
    warn,
    info,
    success,
    error
}