import { describe, expect, test, vi } from 'vitest';
import { ServerApp } from './server-app';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

const options = {
  base: 2,
  limit: 10,
  showTable: true,
  destPath: 'test-destination',
  fileName: 'test-filename',
};

const logSpy = vi.spyOn(console, 'log');
const createTableSpy = vi.spyOn(CreateTable.prototype, 'execute');
const saveFileSpy = vi.spyOn(SaveFile.prototype, 'execute');

describe('serverapp', () => {
  test('should create server app instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });
  test('should run server app with options', () => {
    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenCalledWith('File Created!');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destPath,
      fileName: options.fileName,
    });
  });
});
