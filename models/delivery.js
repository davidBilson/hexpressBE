const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
    deliveryItem: {
        type: String
    },
    pickupPoint: {
        type: String
    },
    pickupPointTime: {
        type: String,
    },
    deliveryPoint: {
        type: String
    },
    deliveryTime: {
        type: String
    },
    itemDelivered: {
        type: Boolean,
    },
    deliveryFee: {
        type: Number,
    },
    deliveryFeePaid: {
        type: Boolean
    }
})

// Export the model based on the defined schema
module.exports = mongoose.model('delivery', DeliverySchema)