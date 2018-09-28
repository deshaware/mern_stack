const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  //name and avatar, when user is removed, we would like to have there important posts to be present
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    //we need like to be linked to the user, hence array of objects
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Posts = mongoose.model('post', PostSchema);