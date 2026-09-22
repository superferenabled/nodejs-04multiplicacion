import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { SaveFile, type SaveFileOptions } from './save-file.use-case';
import * as fs from 'fs';

describe('savefileusecase', () => {
  beforeEach(() => {
    if (fs.existsSync('out')) fs.rmSync('out', { recursive: true });
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
});
