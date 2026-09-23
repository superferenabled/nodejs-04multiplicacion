import { afterEach, describe, expect, test, vi } from 'vitest';
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

  afterEach(() => {
    vi.clearAllMocks();
  })

  test('should create server app instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  // test('should run server app with options', () => {
  //   ServerApp.run(options);

  //   expect(logSpy).toHaveBeenCalledTimes(3);
  //   expect(logSpy).toHaveBeenCalledWith('Server running...');
  //   expect(logSpy).toHaveBeenCalledWith('File Created!');

  //   expect(createTableSpy).toHaveBeenCalledTimes(1);
  //   expect(createTableSpy).toHaveBeenCalledWith({
  //     base: options.base,
  //     limit: options.limit,
  //   });

  //   expect(saveFileSpy).toHaveBeenCalledTimes(1);
  //   expect(saveFileSpy).toHaveBeenCalledWith({
  //     fileContent: expect.any(String),
  //     destination: options.destPath,
  //     fileName: options.fileName,
  //   });
  // });

  test('should run with custom values mocked', () => {
    const createMock = vi.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = vi.fn().mockReturnValue(true);
    const logMock = vi.fn();
    const logErrorMock = vi.fn();

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      destination: options.destPath,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith(expect.any(String));
  });
});
