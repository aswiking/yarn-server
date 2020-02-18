import express from "express";
import cuid from "cuid";
import Joi from "@hapi/joi";

const app = express();

app.use(express.json());

const yarnSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string()
    .min(1)
    .required(),
  brand: Joi.string()
    .min(1)
    .required(),
  weight: Joi.string().min(1),
  fibers: Joi.string().min(1)
});

let yarns = [
  {
    id: "1",
    name: "Drops Alpaca",
    brand: "Drops",
    weight: "Sport",
    fibers: "100% alpaca"
  },
  {
    id: "2",
    name: "Felted Tweed",
    brand: "Rowan",
    weight: "DK",
    fibers: "50% wool, 25% alpaca, 25% rayon"
  },
  {
    id: cuid(),
    name: "Sparrow",
    brand: "Quince and Co",
    weight: "Fingering",
    fibers: "100% linen"
  },
  {
    id: cuid(),
    name: "Gloss Fingering",
    brand: "Knit Picks",
    weight: "Fingering",
    fibers: "70% wool, 30% silk"
  }
];

app.get("/api/yarns", (req, res) => {
  res.status(200).json(yarns);
});

app.post("/api/yarns", (req, res) => {
  const { value, error } = yarnSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      messages: error.details.map(e => e.message)
    });
  }

  const yarn = {
    id: cuid(),
    name: value.name,
    brand: value.brand,
    weight: value.weight,
    fibers: value.fibers
  };
  yarns.push(yarn);
  res.status(201).json(yarn);
});

app.delete("/api/yarns/:yarnId", (req, res) => {
  if (!yarns.find(yarn => yarn.id == req.params.yarnId)) {
    console.log("There is no yarn with this ID");
    res.status(404).json({
      status: 404,
      messages: ["There is no yarn with this ID"]
    });
  } else {
    yarns = yarns.filter(yarn => yarn.id !== req.params.yarnId);
    res.status(204).send();
  }
});

app.put("/api/yarns/:yarnId", (req, res) => {
  const { value, error } = yarnSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      messages: error.details.map(e => e.message)
    });
  }

  if (value.id !== undefined && req.params.yarnId !== value.id) {
    return res.status(400).json({
      status: 400,
      messages: ["ID in url must match ID in body"]
    });
  }

  const index = yarns.findIndex(yarn => yarn.id === req.params.yarnId);

if (index === -1) {
  return res.status(404).json({
    status: 404,
    messages: ["There is no yarn with this ID"]
  });
}

  console.log(index);
  yarns[index] = {
    id: req.params.yarnId,
    name: value.name,
    brand: value.brand,
    weight: value.weight,
    fibers: value.fibers
  };
  return res.status(201).json(yarns[index]);
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
