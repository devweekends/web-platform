import mongoose, { Connection, Mongoose } from 'mongoose';
import { bindRequestConnection } from '@/lib/model';
import { currentRequestKey } from '@/lib/request-scope';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// Preload models to ensure they are registered
function preloadModels() {
  try {
    // Import models to ensure they are registered
    require('@/models/Tag');
    require('@/models/Mentor');
    require('@/models/Mentee');
    require('@/models/ActivityLog');
    require('@/models/Job');
  } catch (error) {
    // Models will be loaded dynamically
  }
}

const options = {
  bufferCommands: false,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  heartbeatFrequencyMS: 10000, // Ping every 10 seconds
};

// On Workers: the connection being opened for each request, by request
const pendingByRequest = new WeakMap<object, Promise<Connection>>();

/**
 * On Cloudflare Workers a socket belongs to the request that opened it, so each
 * request opens its own connection, and models follow it (lib/model.ts). It
 * is opened once per request however many times this is called.
 */
function connectForRequest(key: object): Promise<Connection> {
  let pending = pendingByRequest.get(key);
  if (!pending) {
    preloadModels();
    pending = mongoose
      .createConnection(MONGODB_URI, { ...options, maxPoolSize: 3 })
      .asPromise()
      .then((connection) => {
        bindRequestConnection(key, connection);
        return connection;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        pendingByRequest.delete(key);
        throw error;
      });
    pendingByRequest.set(key, pending);
  }
  return pending;
}

async function connectDB(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const requestKey = currentRequestKey();
  if (requestKey) {
    await connectForRequest(requestKey);
    return mongoose;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      // Preload models after connection
      preloadModels();
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
