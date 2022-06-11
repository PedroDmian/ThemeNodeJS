/* eslint-disable no-unused-vars */

/*import { isEmpty } from 'lodash'
import { RedisAdapter, createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

// If needed to pass options
// const redisOptions: SocketIORedisOptions = {}
export let redis: any = null

export function createRedisAdapter (redisURL: string, redisAuth: string = null) {
  console.info('Create Redis Adapter ✅')

  const paramsRedis: any = {
    path: redisURL,
    port: 6379,
    password: !isEmpty(redisAuth) ? redisAuth : ''
  }

  const pubClient: any = createClient(paramsRedis)
  const subClient: any = pubClient.duplicate()

  redis = createAdapter(pubClient, subClient)
  if (redis) {
    console.info('REDIS Adapter creado')
  } else {
    console.info('REDIS Adapter NO creado')
  }
  return redis
}
*/