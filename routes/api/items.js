const express = require("express");
const router = express.Router();

//Item schema
const Item = require("../../models/item-model");

// Excluding stats._id and __v fields on the response
const removedFields = {
	"stats._id": 0,
	__v: 0,
	added: 0
};

// GET all items
router.get("/", (req, res) => {
	// if a query params exist search based on it
	const searchObj = {};
	if (req.query.search) {
		// use regex on the input
		const regex = new RegExp(escapeRegex(req.query.search), "gi");
		searchObj.name = regex;
	}
	if (req.query.class) {
		classSearch = capitalizeFirstLetter(req.query.class);
		searchObj.class = classSearch;
	}
	if (req.query.type) {
		typeSearch = capitalizeFirstLetter(req.query.type);
		searchObj.type = typeSearch;
	}
	if (req.query.rarity) {
		raritySearch = capitalizeFirstLetter(req.query.rarity);
		searchObj.rarity = raritySearch;
	}
	Item.find(searchObj, removedFields)
		.sort("-added")
		.exec()
		.then(docs => {
			console.log("Successfuly retrieved documents");
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err.message);
			res.status(404).json({
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
			res.status(201).json({
				message: "Successfuly created document",
				id: result._id,
				name: result.name
			});
		})
		.catch(err => {
			console.log(err.message);
			res.status(400).json({
				message: "An error occured while creating document"
			});
		});
});

// GET single item
router.get("/:id", (req, res) => {
	const id = req.params.id;

	Item.findById(id, removedFields)
		.exec()
		.then(doc => {
			console.log("Retrieved document: \n" + doc.name);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: "An error occured while retrieving document"
				});
			}
		})
		.catch(err => {
			console.log(err.message);
			res.status(400).json({
				message: "An error occured while retrieving document"
			});
		});
});

// DELETE single item
router.delete("/:id", (req, res) => {
	const id = req.params.id;

	Item.findByIdAndDelete(req.params.id, err => {
		if (!err) {
			res.status(200).json({
				message: "Successfuly deleted document with id: " + id
			});
		} else {
			console.log(err.message);
			res.status(400).json({
				message: "An error occured while deleting document"
			});
		}
	});
});

// escape input search text
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// capitalize the first letter
function capitalizeFirstLetter(search) {
	if (typeof search !== "string") return "";
	return search.charAt(0).toUpperCase() + search.slice(1);
}
module.exports = router;
