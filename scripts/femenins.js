import fs from 'fs/promises';

(async function main(){
  let dict = await fs.readFile('./dicts/ca.txt','utf8');
  let words = dict.split('\n');
  let pw = '';
  for (let i=0; i<words.length; i++) {
    let cw = words[i];
    if (cw=='-a') cw=pw+'a';
    else if (cw=='-ada') cw=pw.slice(0,-2)+'ada';
    else if (cw=='-ana') cw=pw.slice(0,-2)+'ana';
    else if (cw=='-iva') cw=pw.slice(0,-2)+'iva';
    else if (cw=='-ida') cw=pw.slice(0,-2)+'ida';
    else if (cw=='-àcia') cw=pw.slice(0,-3)+'àcia';
    else if (cw=='-ària') cw=pw.slice(0,-3)+'ària';
    else if (cw=='-àrdia') cw=pw.slice(0,-4)+'àrdia';
    else if (cw=='-ània') cw=pw.slice(0,-3)+'ània';
    else if (cw=='-àquia') cw=pw.slice(0,-4)+'àquia';
    else if (cw=='-issa') cw=pw.slice(0,-2)+'issa';
    else if (cw=='-esa') cw=pw.slice(0,-2)+'esa';
    else if (cw=='-osa') cw=pw.slice(0,-2)+'osa';
    else if (cw=='-ina') cw=pw.slice(0,-1)+'ina';
    else if (cw=='-ossa') cw=pw.slice(0,-2)+'ossa';
    else if (cw=='-òloga') cw=pw.slice(0,-4)+'òloga';
    else if (cw=='-íngia') cw=pw.slice(0,-4)+'íngia';
    else if (cw=='-íria') cw=pw.slice(0,-3)+'íria';
    else if (cw=='-ília') cw=pw.slice(0,-3)+'ília';
    else if (cw=='-ínia') cw=pw.slice(0,-3)+'ínia';
    else if (cw=='-ídia') cw=pw.slice(0,-3)+'ídia';
    else if (cw=='-ícia') cw=pw.slice(0,-3)+'ícia';
    else if (cw=='-ígia') cw=pw.slice(0,-3)+'ígia';
    else if (cw=='-ítria') cw=pw.slice(0,-4)+'ítria';
    else if (cw=='-òssia') cw=pw.slice(0,-4)+'òssia';
    else if (cw=='-àlia') cw=pw.slice(0,-3)+'àlia';
    else if (cw=='-ònia') cw=pw.slice(0,-3)+'ònia';
    else if (cw=='-òria') cw=pw.slice(0,-3)+'òria';
    else if (cw=='-oqua') cw=pw.slice(0,-2)+'oqua';
    else if (cw=='-èria') cw=pw.slice(0,-3)+'èria';
    else if (cw=='-ècia') cw=pw.slice(0,-3)+'ècia';
    else if (cw=='-ènia') cw=pw.slice(0,-3)+'ènia';
    else if (cw=='-útia') cw=pw.slice(0,-3)+'útia';
    else if (cw=='-òquina') cw=pw.slice(0,-5)+'òquina';
    else if (cw=='-àgena') cw=pw.slice(0,-4)+'àgena';
    else if (cw=='-èmina') cw=pw.slice(0,-4)+'èmina';
    else if (cw=='-ògina') cw=pw.slice(0,-4)+'ògina';
    else if (cw=='-òclina') cw=pw.slice(0,-5)+'òclina';
    else if (cw=='-ègena') cw=pw.slice(0,-4)+'ègena';
    else if (cw=='-ògena') cw=pw.slice(0,-3)+'ògena';
    else if (cw=='-ïda') cw=pw.slice(0,-2)+'ïda';
    else if (cw=='-ígena') cw=pw.slice(0,-4)+'ígena';
    else if (cw.startsWith('-')) {
      console.log(pw,cw);
    }
    if (words[i]!=cw) words[i]=cw;
    pw = cw;    
  }
  fs.writeFile('./dicts/ca.fems.txt',words.join('\n'),'utf8');
  
})()
