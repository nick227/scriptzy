
import chatGptControllers from '../src/controllers/chatGptControllers.js';
import apiHandlers from '../src/controllers/apiControllers.js';
import { collectionNames, methods } from '../src/constants.js';
import multer from 'multer';
const upload = multer();

const routes = collectionNames.reduce((acc, endpoint) => {
  methods.forEach(method => {
    acc.push({
      type: method,
      path: `/api/${endpoint}`,
      fn: apiHandlers[method]
    });
  });
  return acc;
}, [
  {
    type: 'get',
    path: '/api/chatgpt/:endpoint?',
    fn: chatGptControllers
  }, {
    type: 'post',
    path: '/api/chatgpt/:endpoint?',
    fn: chatGptControllers,
    middleware: upload.fields([{ name: 'image', maxCount: 1 }, { name: 'voice', maxCount: 1 }])
  }
]);

export default routes;
