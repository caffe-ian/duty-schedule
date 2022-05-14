const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	data: {}
}, { collection: "table", versionKey: false });

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
