import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
   /* title: {
        type: String,
        required: true
    },
    */
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Road','Electricity','Sanitation','Roadways'] 
    },
    city: {
        type: String,
        required: true
    },
   /* address: {
        type: String,
        required: true
    },
    */
    image: {
        type: String, 
        required: false
    },
    month: {
        type: Date,
        required: true,
        default: Date.now
    },
   /* time: {
        type: String,
        required: true
    },
    */
    urgency: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'] 
    }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
