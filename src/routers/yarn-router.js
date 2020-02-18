import express from "express";
import cuid from "cuid";
import validateYarnSchema from "../schema-validation.js";

const router = express.Router();

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

router.get("/api/yarns", (req, res) => {
  res.status(200).json(yarns);
});

router.post("/api/yarns", validateYarnSchema, (req, res) => {
  const yarn = {
    id: cuid(),
    name: req.validatedBody.name,
    brand: req.validatedBody.brand,
    weight: req.validatedBody.weight,
    fibers: req.validatedBody.fibers
  };
  yarns.push(yarn);
  res.status(201).json(yarn);
});

router.delete("/api/yarns/:yarnId", (req, res) => {
  if (!yarns.find(yarn => yarn.id == req.params.yarnId)) {
    throw {
      status: 404,
      messages: ["There is no yarn with this ID"]
    };
  }

  yarns = yarns.filter(yarn => yarn.id !== req.params.yarnId);
  res.status(204).send();
});

router.put("/api/yarns/:yarnId", (req, res) => {
  const { value, error } = yarnSchema.validate(req.body);
  if (error) {
    throw {
      status: 400,
      messages: error.details.map(e => e.message)
    };
  }

  if (value.id !== undefined && req.params.yarnId !== value.id) {
    throw {
      status: 400,
      messages: ["ID in url must match ID in body"]
    };
  }

  const index = yarns.findIndex(yarn => yarn.id === req.params.yarnId);

  if (index === -1) {
    throw {
      status: 404,
      messages: ["There is no yarn with this ID"]
    };
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

export default router;
