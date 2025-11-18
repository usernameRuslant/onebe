import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/Session.js';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(32).toString('base64url');
  const refreshToken = crypto.randomBytes(48).toString('base64url');

  const now = Date.now();

  const accessTokenValidUntil = new Date(now + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(now + ONE_DAY);

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  return {
    session,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const setSessionCookies = (res, sessionData) => {
  const {
    accessToken,
    refreshToken,
    session,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  } = sessionData;

  const isProd = process.env.NODE_ENV === 'production';

  const cookieOption = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOption,
    expires: accessTokenValidUntil,
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOption,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...cookieOption,
    expires: refreshTokenValidUntil,
  });
};
