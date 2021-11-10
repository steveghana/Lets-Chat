const mongoose = require("mongoose");
const messageModel = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },

  country: String,
  imagUrl: String,
  Birth: Date,
  Gender: String,
  Language: String,
  id: String,
  ChatHistory: [
    {
      user: {
        id: String,
      },
    },
  ],
  messages: [
    {
      user: {
        FromSomeone: String,
        FromMe: String,
        otherId: String,
        name: String,
        phone: String,
        imagUrl: String,
        sentTo: String,
        country: String,
        nickname: String,
        language: String,
      },
      message: String,
      createdAt: String,
      unRead: Boolean,
    },
  ],

  createdAt: {
    type: Date,
    default: new Date(),
  },
  connectionStatus: { type: String, default: "offline" },
});

const incomingMessage = mongoose.model("incomingMessage", messageModel);
module.exports = incomingMessage;
