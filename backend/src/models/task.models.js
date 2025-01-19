const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    priority : {
        type : Number,
        enum : [1, 2, 3, 4, 5],
        required : true
    },
    status: {
        type : String,
        enum : ["Pending", "Finished"],
        required : true
    },
    startTime : {
        type : Date,
        required : true
    },
    endTime : {
        type : Date,
        required : true
    },
    blockchainHash: {
        type: String,
        required: false // This can be optional initially
    }
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
