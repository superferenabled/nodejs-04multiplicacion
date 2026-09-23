import { beforeEach } from 'node:test';
import { describe, expect, test, vi } from 'vitest';

const originalArgv = process.argv;
const runCommand = async (args: string[]) => {
  process.argv = [...originalArgv, ...args];
  vi.resetModules();
  const { yarg } = await import('./yargs.plugin');
  return yarg;
};

describe('argv tests', () => {
  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    // console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: './out',
      }),
    );
  });

  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '10',
      '-l',
      '50',
      '-s',
      'true',
      '-n',
      'multitable',
      '-d',
      'in',
    ]);
    // console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 50,
        s: true,
        n: 'multitable',
        d: 'in',
      }),
    );
  });
});
