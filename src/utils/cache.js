const NodeCache = require( "node-cache" ); 
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 } );

module.exports = myCache