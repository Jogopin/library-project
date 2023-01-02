const { Schema, model, default: mongoose } = require('mongoose');

//we are going to update the model with this new Schema for authos in a different file Author.model.js
// const authorSchema = new Schema(
//   {
//     name : String,
//     age:Number,
//     country: String
//   }
// )
const bookSchema = new Schema(
  {
    title: String,
    description: String,
    // author: authorSchema, //Embedded documents
    //authors:[authorSchema], //multiple embedded documents
    author:{
      type:mongoose.Schema.Types.ObjectId, // or Schema.Types.ObjectId
      ref: "Author"
    },
    
    rating: Number
  },
  {
    timestamps: true
  }
);
 
module.exports = model('Book', bookSchema);