let express = require("express")
let app = express()

app.use(express.static(__dirname)) //the whole path, which is /Users/ambertorres/code/flex-time/chat-app

let server = app.listen(3000, () =>
  console.log("server is listening on port ", server.address().port)
)
