const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
require('colors');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5001;

const start = async () => {
	const db =
		process.env.NODE_ENV === 'development' && process.env.MONGO_URI_DEV;

	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected'.white.inverse.bold);
	} catch (error) {
		console.log('Connection failed'.red.bold, error);
	}

	app.listen(PORT, () =>
		console.log(`Server running at port: ${PORT}`.green.inverse.bold)
	);
};

start();
