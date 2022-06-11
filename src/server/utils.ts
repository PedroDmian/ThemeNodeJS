// ? Libs
import { Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';
import moment from 'moment';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// ? Values External "Configuration"
import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  HTTP_HOST,
  HTTP_PORT,
  LOG_ENABLED
} from '../config';

export const numCPUs = require("os").cpus.length;
export const debug = require("debug")("be-template:server");

const onError = (port: number|string|false) => {
  return (error:any) => {
    if (error.syscall !== "listen" ) {
      throw error;
    };
    const bind = typeof port === "string" ? "S " + port : "Port " + port;
    
    // ? handle error
    switch(error.code) {
      case "EACCESS":
        console.error(bind + " requires elevates privilegs");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    };
  };
};

const onListenign = (server: Server) => {
  return () => {
      const addr = server.address();
      const bind = typeof addr === "string" ? "S " + addr : "Port " + addr?.port;
      debug("🚀  Listening on " + bind);
  };
};

function logRequest (type: 1 | 2 | 3, req: Request, res: Response, reqerror?: Error) {
  if (req.url.includes('.ico')) {
    // disable logger on this routes
    return;
  }

  if (type === 1) {
    console.info(`INCOMING | ${moment().format('YYYY-MM-DD HH:mm:ss SSS')} | ${req.host} | ${req.ip} | ${req.originalUrl} | ${req.statusCode} | ${req.method} | ${req.url} | ${req.path}`);
  } else if (type === 2) {
    console.debug(`OUTGOING | ${moment().format('YYYY-MM-DD HH:mm:ss SSS')} | ${req.host} | ${req.ip} | ${req.originalUrl} | ${req.statusCode} | ${req.method} | ${req.url} | ${req.path}`);
  } else if (type === 3) {
    console.error(`ERROR | ${moment().format('YYYY-MM-DD HH:mm:ss SSS')} | ${req.host} | ${req.ip} | ${req.originalUrl} | ${req.statusCode} | ${req.method} | ${req.url} | ${req.path} | ${reqerror?.name} | ${reqerror?.message} | ${reqerror?.stack}`);
  }
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logRequest(2, req, res);

  if (res.statusCode === 200) {
    res.json(res.locals);
    return
  }

  let err = ''

  switch (res.statusCode) {
    case 400:
      err = 'Bad Request';
      res.statusCode = 400;
      break
    case 401:
      err = 'Not Authorized';
      res.statusCode = 401;
      break
    case 404:
      err = 'Not Found';
      res.statusCode = 404;
      break
    case 403: 
      err = 'Forbidden';
      res.statusCode = 403;
      break
    default:
      err = 'Server Error';
      res.statusCode = 500;
      break
  }

  const newError = new Error(err)
  next(newError)
}

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500);
  if (LOG_ENABLED) {
    logRequest(3, req, res, err);
  }
  res.end(err.message);
}

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (LOG_ENABLED) {
    logRequest(1, req, res);
  }
  next();
}

export const serverUp = async (http: Server): Promise<Server> => {
  if (isNaN(HTTP_PORT)) {
    throw new Error('🚫 Http port invalid. Port ' + HTTP_PORT);
  }

  return new Promise((resolve, reject) => {
    let server: Server;

    try {
      server = http.listen(HTTP_PORT, () => resolve(server))
      server.on("error", onError(HTTP_PORT));
      server.on("listening", onListenign(server));

      console.info(`🥳 Worker ${process.pid} started. Listening on port ${HTTP_PORT}`);

      server.on('close', () => console.debug('onClose'))
    
    } catch (err) {
      console.error('Server not initiated', err)
      reject(err)
    }
  })
}

export const facebookPassportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })

  return passport.use('facebook',
    new FacebookStrategy({
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${HTTP_HOST}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'name', 'email'],
      enableProof: true
    }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    })
  )
}

export const googlePassportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })

  return passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${HTTP_HOST}/auth/google/callback`,
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
  }))
}
