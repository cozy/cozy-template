module.exports = function(compound) {
  return process.on('uncaughtException', function(err) {
    console.error(err);
    return console.error(err.stack);
  });
};