import { isEmpty } from 'ramda'
import { getProcessInfo } from 'src/controllers/InformationController'
import * as config from '.'

const unhandledRejections = new Map()

export function validateEnvConfig() {
  if (isEmpty(config.DB_NAME) ||
        isEmpty(config.DB_USER) ||
        isEmpty(config.DB_PASS) ||
        isEmpty(config.DB_HOST) ||
        isEmpty(config.DB_PORT) || 
        isEmpty(config.DB_DIALECT)
  ) {
    console.log('using', config.DB_NAME, config.DB_USER, config.DB_PASS, config.DB_HOST, config.DB_PORT)

    throw new Error('Database Environment variables are missing')
  }

  if (isEmpty(config.NODE_ENV)) {
    throw new Error('Node Environment variable is missing')
  }

  if (isEmpty(config.HTTP_PORT.toString()) || isNaN(config.HTTP_PORT)) {
    throw new Error('HTTP Port Environment variable is missing')
  }

  if (config.REDIS_ENABLED && isEmpty(config.REDIS_URL)) {
    throw new Error('REDIS DB Environment variables are missing')
  }

  console.log('Environment variabless validated')
}

export function validateEnvConfigMongo() {
  if (isEmpty(config.M_DB_NAME) ||
    isEmpty(config.M_DB_USER) ||
    isEmpty(config.M_DB_HOST) ||
    isEmpty(config.M_DB_PORT) || 
    isEmpty(config.M_DB_DIALECT)) {
    throw new Error('Database Environment variables are missing')
  }

  if (isEmpty(config.NODE_ENV)) {
    throw new Error('Node Environment variable is missing')
  }

  if (isEmpty(config.HTTP_PORT.toString()) || isNaN(config.HTTP_PORT)) {
    throw new Error('HTTP Port Environment variable is missing')
  }

  if (config.REDIS_ENABLED && isEmpty(config.REDIS_URL)) {
    throw new Error('REDIS DB Environment variables are missing')
  }

  console.log('Environment variabless validated')
}