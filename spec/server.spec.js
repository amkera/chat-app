let request = require("request")

describe("get messages", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages", (err, response) => {
      console.log(response.body)
      expect(response.statusCode).toEqual(200)
      done() //Need to call done() when this async code finishes
    })
  })

  it("should return non empty list of messages", (done) => {
    request.get("http://localhost:3000/messages", (err, response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0)
      done() //Need to call done() when this async code finishes
    })
  })
})

describe("get messages from a specific user", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages/Amber", (err, response) => {
      expect(response.statusCode).toEqual(200)
      done() //Need to call done() when this async code finishes
    })
  })

  it("name should be Amber", () => {
    request.get("http://localhost:3000/messages/Amber", (err, response) => {
      expect(JSON.parse(response.body)[0]).toEqual("Amber")
      done() //Need to call done() when this async code finishes
    })
  })
})
