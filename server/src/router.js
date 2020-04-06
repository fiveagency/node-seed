import express from 'express';
import { authenticate } from '../core/auth';
import { zooRouter } from './zoo';
import { humanRouter } from './human';

/**
 Comment out these imports if you want to use them
 Before commenting out them first check how they are implemented
 and if they are suitable for you
 */
// import { assertAuthenticated } from './shared/auth';

export const router = new express.Router();

const mockTokenProvider = {
  validateToken: async () => Promise.resolve('antinUsername'),
};

router.use(authenticate(mockTokenProvider));
router.use('/v1/zoos', zooRouter);
router.use('/v1/humans', humanRouter);

// Public routes
// Example: router.use('/v1/users/', userRouter);
