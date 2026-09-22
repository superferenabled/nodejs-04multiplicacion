import { describe, expect, test } from 'vitest';
import { CreateTable } from './create-table.use-case';

describe('createtableusecase', () => {
  test('should create table with default values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n').length;

    console.log(table);

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 10 = 20');
    expect(rows).toBe(10);
  });

  test('should create table with custom values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 3, limit: 20 });
    const rows = table.split('\n').length;

    console.log(table);

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('3 x 1 = 3');
    expect(table).toContain('3 x 20 = 60');
    expect(rows).toBe(20);
  });
});
