import mongoose from "mongoose";

const topDealsSchema = new mongoose.Schema({
    dealName: {
        type: String,
        reuiqred: true,
        trim: true,
        unique: true,
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.startTime;
            },
            message: "End time must be greater than or equal to start time."
        }
    }
})

export const TopDeals = mongoose.model("TopDeals", topDealsSchema);