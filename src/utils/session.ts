import env from 'env-var';
import session from 'express-session';

const APP_SECRET = env.get('APP_SECRET').required().asString();

const middleware = session({
  secret: APP_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: env.get('NODE_ENV').asString() === 'production',
    maxAge: 1500000000,
    httpOnly: true,
  },
});

export default middleware;
