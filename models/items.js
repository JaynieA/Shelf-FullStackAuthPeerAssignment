var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var ItemSchema = new Schema ({
  description: {type: String, required: true},
  placer: {type: String, required: true},
  img_url: {type: String, required: true}
});

var Items = mongoose.model('items', ItemSchema);

module.exports = Items;
