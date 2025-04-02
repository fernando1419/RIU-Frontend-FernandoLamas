/* eslint-disable no-undef */
import pkg from 'json-server';

const { router: _router, bodyParser, create, defaults } = pkg;

const server = create();
/* global process */
const dbPath = typeof process !== 'undefined' && process.env.NODE_ENV === "production"
   ? "/json-server/db.json" // Production (Docker)
   : "src/app/data/db.json"; // Development

const router = _router(dbPath);
const middlewares = defaults();

server.use(bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
   const delay = 300;

   if (req.method === 'POST' || req.method === 'PATCH') {
      const requiredFields = ['name', 'realName', 'powers', 'universe'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
         return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`,
         });
      }
   }

   setTimeout(next, delay); // just to display loading indicator feature.
});

server.use(router);
server.listen(3000, () => {

   console.log('JSON Server running at http://localhost:3000');
});
