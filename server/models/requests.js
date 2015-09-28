/* See documentation on
 https://github.com/cozy/cozy-db */

var cozydb = require('cozydb');

module.exports = {
  user: {
    all: cozydb.defaultRequests.all
  }
};
