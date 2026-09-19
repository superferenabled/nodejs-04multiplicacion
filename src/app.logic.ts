import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { yarg } from './config/plugins';

const {b: base, l: limit, s: showTable} = yarg;

const outputPath = './out/files';
let output = `============================
         Tabla del ${base}
============================\n`;

for (let i = 1; i <= limit; i++) {
  output += `${base} x ${i} = ${base * i} \n`;
}

if (showTable) console.log(output);

if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true });
}

writeFileSync(`${outputPath}/tabla-${base}.txt`, output);
console.log('file created!');
