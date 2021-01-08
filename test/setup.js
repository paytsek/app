const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let mongo;

beforeAll(async () => {
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
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

global.signIn = async () => {
  const user = await User.create({
    username: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  })

	const payload = {
    id: user.id,
    email: user.email,
    username: user.username
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: 3600,
  });
  
	return token;
};
