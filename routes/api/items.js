const express = require("express");
const router = express.Router();

//Item schema
const Item = require("../../models/item-model");
// GET all items
// Excluding stats._id and __v fields on the response
router.get("/", (req, res) => {
	Item.find({}, { "stats._id": 0, __v: 0, added: 0 })
		.sort("-added")
		.exec()
		.then(docs => {
			console.log("Retrieved documents");
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err.message);
			res.status(500).json({
				message: "An error occured while retrieving documents"
			});
		});
});

// POST item
router.post("/", (req, res) => {
	const item = new Item({
		name: req.body.name,
		class: req.body.class,
		type: req.body.type,
		rarity: req.body.rarity,
		level: req.body.level,
		description: req.body.description,
		skills: req.body.skills,
		stats: req.body.stats
	});
	item
		.save()
		.then(result => {
			// loop results.stats to remove _id field in response
			let res_stats = [];
			for (let i = 0, len = result.stats.length; i < len; i++) {
				stats = {
					_name: result.stats[i]._name,
					_value: result.stats[i]._value
				};
				res_stats.push(stats);
			}
			const new_item = {
				id: result._id,
				name: result.name,
				class: result.class,
				type: result.type,
				rarity: result.rarity,
				level: result.level,
				description: result.description,
				skills: result.skills,
				stats: res_stats
			};
			res.status(201).json({
				message: "Created document",
				created_item: new_item
			});
		})
		.catch(err => {
			console.log(err.message);
			res.status(500).json({
				message: "An error occured while creating document"
			});
		});
});

// GET single item
router.get("/:id", (req, res) => {
	const id = req.params.id;

	Item.findById(id, { "stats._id": 0, __v: 0, added: 0 })
		.exec()
		.then(doc => {
			console.log("Retrieved document: \n" + doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: "No such document exists with this id"
				});
			}
		})
		.catch(err => {
			console.log(err.message);
			res.status(500).json({
				message: "An error occured while retrieving documents"
			});
		});
});

// DELETE single item
router.delete("/:id", (req, res) => {
	const id = req.params.id;

	Item.deleteOne({ _id: id }, err => {
		if (!err) {
			res.status(200).json({
				message: "Successfuly deleted document with id: " + id
			});
		} else {
			console.log(err);
			res.status(500).json({
				message: "An error occured while trying to delete document"
			});
		}
	});
});

module.exports = router;
