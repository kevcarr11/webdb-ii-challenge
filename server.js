const express = require("express")
const db = require("./utils/db")

const server = express()
const port = 4000
const host = "0.0.0.0"

server.use(express.json())

server.use((req, res, next) => {
  console.log(``)
  next()
})

server.get("/", (req, res) => {
  res.json({
    message: "Server is up and running"
  })
})

server.get("/api/cars", async (req, res, next) => {

  try {
    res.json(await db("cars")
    .select())
  } catch (err) {
    next()
  }
})

server.post("/api/cars", async (req, res, next) => {
const { vin, make, model, mileage } = req.body

  try {
    const payload = {
      vin: vin,
      make: make,
      model: model,
      mileage: mileage
    }

    const [id] = await db("cars")
      .insert(payload)
    res.json(await db("cars")
    .where("id", id)
    .first())
  } catch (err) {
    next(err)
  }
})

server.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An internal error occurred"
  })
})


server.listen(port, host, () => {
  console.log(`Server Running on http://${host}:${port}`)
})