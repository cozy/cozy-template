app = module.exports = require("railway").createServer()
unless module.parent
  port = process.env.PORT or 9251
  app.listen port
  console.log "Railway server listening on port %d within %s environment", port, app.settings.env
