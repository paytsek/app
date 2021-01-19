const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let mongo;

beforeAll(async () => {
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signIn = async (loggedInUser) => {
	const user = await User.create({
		username: 'John Doe',
		email: 'john@example.com',
		password: '123456',
		firstName: 'John',
		lastName: 'Doe',
	});

	const payload = {
		_id: user._id,
		email: user.email,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
	};

	const token = jwt.sign(loggedInUser || payload, process.env.JWT_SECRET_KEY, {
		expiresIn: 3600,
	});

	return token;
};

global.signInAdmin = async (loggedInUser) => {
	const user = await User.create({
		username: 'Jane Doe',
		email: 'jane@example.com',
		password: '123456',
		firstName: 'Jane',
    lastName: 'Doe',
    role: 'admin'
	});

	const payload = {
		_id: user._id,
		email: user.email,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
	};

	const token = jwt.sign(loggedInUser || payload, process.env.JWT_SECRET_KEY, {
		expiresIn: 3600,
	});

	return token;
};
