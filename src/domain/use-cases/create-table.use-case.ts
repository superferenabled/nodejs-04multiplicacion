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
    let output: string = '';
    const arrValues: string[] = [];
    for (let i = 1; i <= limit; i++) {
      arrValues.push(`${base} x ${i} = ${base * i}`)
    }
    output += arrValues.join('\n')
    return output;
  }
}
