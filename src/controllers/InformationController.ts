import { server } from '../server'
import { NODE_ENV } from '../config'
import moment from 'moment'
import process from 'process'
import { SDK_VERSION } from '@sentry/node'

const { version, name, engines, description } = require('../../package.json')

export async function getProcessInfo (): Promise<object> {
  const result = {
    date_iso: moment.utc().toISOString(),
    cpu: process.cpuUsage(),
    memory_usage: process.memoryUsage(),
    resource_usage: process.resourceUsage(),
    node_version: process.version,
    exit_code: process.exitCode,
    uptime: Math.floor(process.uptime()),
    process_id: process.pid,
    platform: process.platform,
    node_env: NODE_ENV,
    http_connections: server.connections,
    http_max_connections: server.maxConnections,
    http_timeout: server.timeout,
    http_listening: server.listening,
    program_version: version,
    program_name: name,
    program_engines: engines,
    program_description: description,
    sentry_sdk_name: 'SDK_NAME',
    sentry_sdk_version: 'SDK_VERSION'
  }

  return result
}
