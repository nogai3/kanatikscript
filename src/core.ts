import polyfill from 'globalthis';
import dict from './dict/sortedKanatik.json';

function escapeRegExp(str: string) {
    str = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    if (/^\w+$/.test(str)) {
        str = '\\b' + str + '\\b';
    }
    return str;
}

function replaceAll(text: string, search: string, replacement: string) {
    const regex = new RegExp(escapeRegExp(search), 'g');
    return text.replace(regex, replacement);
}

function transformText(text: string, targetLang: 'js' | 'ks' = 'ks') {
    const sourceIndex = targetLang === 'ks' ? 1 : 0;
    const targetIndex = +!sourceIndex;

    const dictionary = dict.slice().sort((a, b) => b[sourceIndex].length - a[sourceIndex].length);

    dictionary.forEach(([source, target]) => {
        const from = sourceIndex === 0 ? source : target;
        const to = sourceIndex === 0 ? target : source;
        if (typeof from === 'string' && typeof to === 'string') {
            text = replaceAll(text, from, to);
        }
    });

    return text;
}

export function compile(script: string, lang: 'js' | 'ks' = 'ks'): string {
    interface LiteralMap { [key: string]: string; }
    const tmpToken = 'ks_' + Date.now() + '_';
    const jsxLiterals: LiteralMap = {};
    
    script = script.replace(/(<[A-Za-z][^>]*>)([\s\S]+?)(?=<\/[A-Za-z])/g, (_, tag, content, offset) => {
        const key =tmpToken + 'jsx_' + offset;
        jsxLiterals[key] = content;
        return tag + key;
    });

    const stringLiterals: LiteralMap = {};
    script = script.replace(/\"(?:\\.|[^\"\\])*\"|\'(?:\\.|[^\'\\])*\'/g, (val, pos) => {
        const key = tmpToken + pos;
        stringLiterals[key] = val;
        return key;
    });

    const commentRegex = /((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/g;
    const comments = script.match(commentRegex) || [];

    script = transformText(script, lang);
    script = script.replace(commentRegex, () => comments.shift() || '');

    for (const key in stringLiterals) script = script.replace(key, stringLiterals[key]);
    for (const key in jsxLiterals) script = script.replace(key, jsxLiterals[key]);

    const globalObj = polyfill() as any;
    globalObj.kanatik = compile;

    return script;
}