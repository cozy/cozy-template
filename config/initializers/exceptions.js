module.exports = function(compound) {
  process.on('uncaughtException', function(err) {
    console.error(err);
    return console.error(err.stack);
  });
};
