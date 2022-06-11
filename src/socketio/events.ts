import { Server } from 'socket.io'

export function configureSocketListeners (io: Server) {
  io.on('connection', (socket) => {
    console.info('socket connection ' + socket.id)

    socket.on('disconnect', () => {
      console.info('Socket disconnect from server ', socket.id)
    })
  })
}
