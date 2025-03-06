import mongoose from "mongoose";

const CATEGORY_ENUM = ['Road', 'Electricity', 'Sanitation', 'Roadways'];
const URGENCY_ENUM = ['Low', 'Medium', 'High'];

const complaintSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: CATEGORY_ENUM
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        validate: {
            validator: function (value) {
                return !value || /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value);
            },
            message: "Invalid image URL format"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    urgency: {
        type: String,
        required: true,
        enum: URGENCY_ENUM
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
