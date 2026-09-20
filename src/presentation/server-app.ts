import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  destPath: string;
}

export class ServerApp {
  static run({ base, limit, showTable, fileName, destPath }: RunOptions) {
    console.log('Server running...');
    const table = new CreateTable().execute({ base, limit });
    const fileCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      destination: destPath,
    });
    if (showTable) console.log(table);
    fileCreated
      ? console.log('File Created!')
      : console.log('File NOT created');
  }
}
