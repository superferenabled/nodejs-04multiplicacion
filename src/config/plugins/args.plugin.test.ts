import { describe, expect, test } from 'vitest';
import { yarg } from './yargs.plugin';

describe('argv tests', () => {
  test('should return default values', () => {
    console.log(yarg)
  })
})