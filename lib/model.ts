import mongoose, { Connection, Model, Schema } from 'mongoose'

import { currentRequestKey } from '@/lib/request-scope'

/**
 * Mongoose models that follow the request they are used in.
 *
 * On Cloudflare Workers a socket belongs to the request that opened it, so each
 * request gets its own database connection (lib/db.ts). A model compiled on
 * the global connection would send every request's queries down one shared
 * socket. defineModel returns the usual model, wrapped so that, inside a
 * Worker request, every use goes to the same model compiled on that request's
 * connection. Outside Workers (next dev, next build, scripts) it is the plain
 * global model.
 */

const schemas = new Map<string, Schema>()
const requestConnections = new WeakMap<object, Connection>()

/** The connection opened for the request being served, if any */
export function requestConnection(): Connection | undefined {
  const key = currentRequestKey()
  return key ? requestConnections.get(key) : undefined
}

/** Ties a connection to the request being served, with every model registered on it */
export function bindRequestConnection(key: object, connection: Connection) {
  requestConnections.set(key, connection)
  // Registered up front so populate() can find a ref by name
  for (const [name, schema] of schemas) {
    if (!connection.models[name]) connection.model(name, schema)
  }
}

function modelFor<T>(name: string, fallback: Model<T>): Model<T> {
  const connection = requestConnection()
  if (!connection) return fallback
  return (connection.models[name] as Model<T> | undefined) ?? connection.model<T>(name, schemas.get(name)!)
}

export function defineModel<T>(name: string, schema: Schema): Model<T> {
  schemas.set(name, schema)
  const global = (mongoose.models[name] as Model<T> | undefined) ?? mongoose.model<T>(name, schema)
  // A connection already open in this request learns about this model too
  const open = requestConnection()
  if (open && !open.models[name]) open.model(name, schema)

  return new Proxy(global, {
    get(_target, property) {
      const model = modelFor(name, global)
      const value = Reflect.get(model, property, model)
      return typeof value === 'function' && property !== 'prototype' ? value.bind(model) : value
    },
    set(_target, property, value) {
      return Reflect.set(modelFor(name, global), property, value)
    },
    construct(_target, args) {
      return Reflect.construct(modelFor(name, global), args)
    },
  })
}
