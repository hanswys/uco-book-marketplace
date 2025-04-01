const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        sold: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Book', bookSchema)