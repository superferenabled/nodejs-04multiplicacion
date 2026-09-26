import { describe, expect, test, vi } from 'vitest';
import { ServerApp } from './presentation/server-app';

describe('App', () => {
  test('should call server run with values', async () => {
    const serverRunMock = vi.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'app.ts',
      '-b',
      '10',
      '-l',
      '5',
      '-s',
      'true',
      '-n',
      'test-file',
      '-d',
      'test-destination',
    ];

    await import('./app')
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      destPath: 'test-destination'
    })
  });
});
