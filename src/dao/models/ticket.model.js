import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true,
        unique: true    
    },
});

const ticketModel = mongoose.model('Tickets', ticketSchema);
export default ticketModel;