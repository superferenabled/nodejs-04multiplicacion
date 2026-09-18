import { writeFileSync, existsSync,mkdirSync } from 'fs';
console.log('hola mundo!');
const base = 5;
const outputPath = './salidona';
const output = `============================
         Tabla del ${base}
============================

${base} x 1 = ${base * 1 }
${base} x 2 = ${base * 2 }
${base} x 3 = ${base * 3 }
${base} x 4 = ${base * 4 }
${base} x 5 = ${base * 5 }
${base} x 6 = ${base * 6 }
${base} x 7 = ${base * 7 }
${base} x 8 = ${base * 8 }
${base} x 9 = ${base * 9 }
${base} x 10 = ${base * 10}`;

console.log(output);

if (!existsSync(outputPath)){
  mkdirSync(outputPath, {recursive: true})
}

writeFileSync(`${outputPath}/tabla-${base}.txt`, output);


console.log('file created!');