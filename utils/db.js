import mongoose, { connections } from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Already Connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connections.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    // await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      // await mongoose.disconnect();
      console.log('not disconnected in production');
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
