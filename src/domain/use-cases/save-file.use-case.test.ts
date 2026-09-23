import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { SaveFile, type SaveFileOptions } from './save-file.use-case';
import * as fs from 'fs';

vi.mock('fs', {spy: true});

describe('savefileusecase', () => {
  beforeEach(() => {
    if (fs.existsSync('out')) fs.rmSync('out', { recursive: true });
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync('out')) fs.rmSync('out', { recursive: true });
  });

  test('should savefile with default values', () => {
    const saveFile = new SaveFile();

    const filePath = './out/table.txt';
    const options = { fileContent: 'test content' };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('should savefile with custom values', () => {
    const saveFile = new SaveFile();

    const fileName = 'table-10';
    const destination = 'out/tests';
    const filePath = `./${destination}/${fileName}.txt`;

    const options = {
      fileContent: 'test content custom',
      fileName,
      destination,
    } as SaveFileOptions;

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    // console.log({ fileExists, filePath, result });
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();

    const mkdirMock = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Folder not created');
    });

    const result = saveFile.execute({
      fileContent: 'content',
      destination: 'out/fail',
    });
    expect(result).toBe(false);
    mkdirMock.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();

    const writeFileMock = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('File not created');
    });

    const result = saveFile.execute({
      fileContent: 'content',
      destination: 'out/fail',
    });
    expect(result).toBe(false);
    writeFileMock.mockRestore();
  });
  
});
