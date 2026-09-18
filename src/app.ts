import { yarg } from './config/plugins';

const main = async () => {
  console.log('main iniciada');
  console.log(yarg.base);
};

(async () => {
  await main();
})();
