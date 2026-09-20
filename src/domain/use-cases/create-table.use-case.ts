export interface CreateTableOptions {
  base: number;
  limit?: number;
}
export interface CreateTableUseCase {
  execute(options: CreateTableOptions): string;
}
export class CreateTable implements CreateTableUseCase {
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let output = `============================
        Tabla del ${base}
============================\n`;

    for (let i = 1; i <= limit; i++) {
      output += `${base} x ${i} = ${base * i} \n`;
    }
    return output;
  }
}
