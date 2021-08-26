import express from 'express';
import appProperties from '../common/app-properties.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.end(appProperties.getAppInfo());
});

export { router as default };
