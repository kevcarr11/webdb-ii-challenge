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

server.post("/api/cars", validateCarData, async (req, res, next) => {
  const { vin, make, model, year, mileage, transmissionType, titleStatus } = req.body

  try {
    const payload = {
      vin,
      make,
      model,
      year,
      mileage,
      transmissionType,
      titleStatus
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

server.put("/api/cars/:id", validateCarData, validateCarId, async (req, res, next) => {
  const { vin, make, model, year, mileage, transmissionType, titleStatus } = req.body

  try {
    const payload = {
      vin,
      make,
      model,
      year,
      mileage,
      transmissionType,
      titleStatus
    }

    await db("cars")
      .where('id', req.params.id)
      .update(payload)
    res.json(await db("cars")
      .where("id", req.params.id)
      .first())
  } catch (err) {
    next(err)
  }
})

server.delete("/api/cars/:id", validateCarId, async (req, res, next) => {
  try {
    await db("cars")
      .where("id", req.params.id)
      .del()
    res.status(204)
      .end()
  } catch (err) {
    next(err)
  }
})

async function validateCarId(req, res, next) {
  try {
    const car = await db("cars")
      .where("id", req.params.id)
      .first()
    if (car) {
      next()
    } else {
      res.status(404).json({ message: "car not found" })
    }
  } catch (err) {
    next(err)
  }
}

function validateCarData(req, res, next) {
  const carData = req.body
  if (!carData.vin || !carData.make || !carData.model || !carData.mileage || !carData.year) {
    return res.status(400).json({ errorMessage: "Please provide vin, make, model, year and mileage for the car." })
  }
  next()
}

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