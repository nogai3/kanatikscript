import { dict } from './dict';
import * as fs from 'fs';

export const sortDictToFile = (dict: string[][]): void => {
    dict.sort((a, b) => b[1].length - a[1].length);
    const fileContent = JSON.stringify(dict, null, '\t').replace(/\\/g, '');
    fs.writeFile('src/dict/sortedKanatik.json', fileContent, (err: NodeJS.ErrnoException | null) => {
        if (err) console.error(err);
        else console.log('Dictionary sorted and saved!');
    });
};
sortDictToFile(dict);