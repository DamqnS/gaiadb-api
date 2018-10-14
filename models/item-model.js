const mongoose = require("mongoose");

// Item schema

const itemschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  skills: {
    passive: {
      type: String
    },
    debuff: {
      type: String
    },
    active: {
      type: String
    }
  },
  stats: [
    {
      _name: {
        type: String
      },
      _value: {
        type: Number
      }
    }
  ],
  added: {
    type: Date,
    default: Date.now
  }
});

const Item = (module.exports = mongoose.model("Item", itemschema, "items"));
