const mongoose = require('mongoose')

const connectDB = async () => {
    try { 
        const conn = await mongoose.connect(
        'mongodb+srv://mannysally000:AnotherDayAnotherSlay@bob0.ezj6avw.mongodb.net/?retryWrites=true&w=majority&appName=Bob0', 
        ); 
        console.log(`MongoDB Connected: `);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;


//${conn.connection.host}
// {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }