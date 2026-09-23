import { existsSync, mkdirSync, writeFileSync } from 'fs';

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export interface SaveFileUseCase {
  execute(options: SaveFileOptions): boolean;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}
  execute({
    fileContent,
    destination = 'out',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    try {
        console.log(existsSync(destination))
      if (!existsSync(destination)) {
        mkdirSync(destination, { recursive: true });
      }

      writeFileSync(`${destination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
}
