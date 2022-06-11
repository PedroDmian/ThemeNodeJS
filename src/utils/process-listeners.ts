import { getProcessInfo } from '../controllers/InformationController'

const unhandledRejections = new Map()

export function configureListeners () {
  process.on('beforeExit', async (code) => {
    console.info('Process beforeExit event with code: ', code, await getProcessInfo())
  })

  process.on('exit', async (code) => {
    console.info('Process exit event with code: ', code, await getProcessInfo())
    // sequelize.close()
  })

  process.on('uncaughtException', async (err) => {
    console.info('Process uncaughtException with err: ', err, await getProcessInfo())
  })

  process.on('unhandledRejection', async (reason, promise) => {
    console.info('Process unhandledRejection with reason: ', reason, await getProcessInfo())
    unhandledRejections.set(promise, reason)
  })

  process.on('rejectionHandled', async (promise) => {
    console.info('Process rejectionHandled: ', await getProcessInfo())
    unhandledRejections.delete(promise)
  })

  console.log('Process listeners configured')
}
