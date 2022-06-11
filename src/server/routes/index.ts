/* eslint-disable no-unused-vars */

import { Router } from 'express'
import { IGetSocketFunc } from 'src/shared/interfaces/socket.interface';

export default function getRoute (getSocketInstance: IGetSocketFunc) {
  const router = Router()
  router.get("/health", (req, res) => res.status(200).json({alive:true}));

  return router
}
