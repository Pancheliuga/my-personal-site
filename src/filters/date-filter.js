const { DateTime } = require('luxon');

module.exports = value => {
    return DateTime.fromISO(value).toFormat('MMMM dd, yyyy');
  };