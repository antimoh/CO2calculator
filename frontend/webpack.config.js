const prod = require('./config/webpack.prod');
const dev = require('./config/webpack.dev');

module.exports = (env) => {
    if (env.prod) {
        return prod;
    }
    return dev;
}