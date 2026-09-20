import { ServerOptions } from 'http';
import { yarg } from './config/plugins';
import { ServerApp } from './presentation/server-app';



const main = async () => {
  const {b: base, l: limit, s: showTable, n: fileName, d: destPath} = yarg;
  ServerApp.run({base, limit, showTable, fileName, destPath});
};

(async () => {
  await main();
})();
