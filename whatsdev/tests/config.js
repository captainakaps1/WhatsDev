const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

exports.setup = async function() {
    const server = await MongoMemoryServer.create();
    await mongoose.connect(server.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return server;
};

exports.teardown = async function(server) {
    await server.stop();
};