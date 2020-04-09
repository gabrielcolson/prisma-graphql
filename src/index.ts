import env from 'env-var';

import Server from './server';

const PORT = env.get('PORT').required().asPortNumber();

const server = new Server();

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
