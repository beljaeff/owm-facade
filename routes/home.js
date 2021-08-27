import express from 'express';
import config from '../common/app-configs.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.end(config.getAppInfo());
});

export { router as default };
