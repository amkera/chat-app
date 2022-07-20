let express = require("express")
let bodyParser = require("body-parser")
let app = express()
let http = require("http").Server(app) //These two lines add socket here in the backend
let io = require("socket.io")(http)

app.use(express.static(__dirname)) //the whole path, which is /Users/ambertorres/code/flex-time/chat-app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let messages = [
  { name: "Tim", message: "Hello" },
  { name: "Jane", message: "I'm Jane" },
]

app.get("/messages", (req, res) => {
  res.send(messages)
})

app.post("/messages", (req, res) => {
  console.log(req.body)
  messages.push(req.body) //Add the new message to the messages array
  io.emit("message", req.body) //Server notifies client of new 'message' event
  res.sendStatus(200)
})

io.on("connection", (socket) => {
  console.log("user connected")
}) //Check for the connection event. Supply a function that takes a socket.

let server = http.listen(3000, () =>
  console.log("server is listening on port ", server.address().port)
)
//Without socket, it's app.listen. With socket, it's http.listen

/**
 * Body-parser is the Node. js body parsing middleware.
 * It is responsible for parsing the incoming request
 * bodies in a middleware before you handle it.
 */
