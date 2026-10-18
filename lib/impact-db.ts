import mongoose, { Connection } from 'mongoose';

const IMPACT_MONGODB_URI = process.env.IMPACT_MONGODB_URI || '';

interface ImpactMongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var impactMongoose: ImpactMongooseCache | undefined;
}

const cached: ImpactMongooseCache = global.impactMongoose || {
  conn: null,
  promise: null,
};

if (!global.impactMongoose) {
  global.impactMongoose = cached;
}

export default async function connectImpactDB(): Promise<Connection> {
  if (!IMPACT_MONGODB_URI) {
    throw new Error('Please define the IMPACT_MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .createConnection(IMPACT_MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        connectTimeoutMS: 10000,
        heartbeatFrequencyMS: 10000,
      })
      .asPromise()
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
