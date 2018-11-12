const mongoose = require("mongoose");

// Item schema

const itemschema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			index: true
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
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Item", itemschema, "items");
