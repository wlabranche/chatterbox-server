fs = require 'fs'
express = require 'express'
app = do express

console.log __dirname

app.use(express.static(__dirname + '/client'))

defaultCorsHeaders =
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "text/plain"

app.use (req, res, next) ->
  console.log "#{req.method} #{req.url}"
  res.set defaultCorsHeaders
  do next

app.get '/', (req, res) ->
  res.sendfile 'index.html'

app.get '/classes/messages', (req, res) ->
  fs.readFile (__dirname + '/messages.json'), (err, data) ->
    throw err if err
    res.send data

app.post '/classes/messages', (req, res) ->
  req.on 'data', (data) ->
    data = JSON.parse data
    data['createdAt'] = new Date
    fs.readFile (__dirname + '/messages.json'), (err, storedData) ->
      throw err if err
      storedData = JSON.parse storedData
      data['objectId'] = storedData.results.length
      storedData.results.push data
      fs.writeFile (__dirname + '/messages.json'), JSON.stringify(storedData), (err) ->
        throw err if err
      res.send JSON.stringify( objectId: data['objectId'], createdAt: data['createdAt'])

# app.get /^\/classes\/rooms([0-9]+)$/


app.use '/*', (req, res) ->
  res.status(404)
  res.send()

app.listen 3000
