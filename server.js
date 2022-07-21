let express = require("express")
let bodyParser = require("body-parser")
let app = express()
let http = require("http").Server(app) //These two lines add socket here in the backend
let io = require("socket.io")(http)
let mongoose = require("mongoose")

app.use(express.static(__dirname)) //the whole path, which is /Users/ambertorres/code/flex-time/chat-app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let dbURL =
  "mongodb+srv://user:user@learning-node.rqqu4.mongodb.net/?retryWrites=true&w=majority"

let Message = mongoose.model("Message", {
  name: String,
  message: String,
})

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post("/messages", async (req, res) => {
  try {
    let message = new Message(req.body)

    let savedMessage = await message.save() //save the individual message object

    console.log("saved")

    let censored = await Message.findOne({ message: "badword" }) //search the Message "class"
    if (censored) {
      await Message.remove({ _id: censored.id }) //This is a promise
    } else {
      io.emit("message", req.body) //Server notifies client of new 'message' event.The event is called message, and the req.body contains the message we want to send
    }

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    return console.error(error)
  } finally {
    //use finally if you have a logger: logger.log('message post endpoint was called')
    console.log("post message complete")
  }
})

io.on("connection", (socket) => {
  console.log("user connected")
}) //Check for the connection event. Supply a function that takes a socket.

mongoose.connect(dbURL, (err) => {
  console.log(
    "mongo db connection",
    err ? `There was an error: ${err}` : "No errors at this time"
  )
})

let server = http.listen(3000, () =>
  console.log("server is listening on port ", server.address().port)
)
//Without socket, it's app.listen. With socket, it's http.listen

/**
 * Body-parser is the Node. js body parsing middleware.
 * It is responsible for parsing the incoming request
 * bodies in a middleware before you handle it.
 */
