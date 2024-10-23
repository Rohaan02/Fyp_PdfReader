const mongoose = require("mongoose");

const subChatSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    messages: [
        {
            question: {
                type: String,
                required: true,
            },
            response: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SubChat = mongoose.model("SubChat", subChatSchema);
module.exports = SubChat;
