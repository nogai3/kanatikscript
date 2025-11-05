import { compile } from './core'
export { compile as kanatik };

if (typeof window !== 'undefined') {
    document.querySelectorAll('[language="KanatikScript"], [type="text/x-kanatikscript"]').forEach(convertKanatikScript);
}

async function convertKanatikScript(scriptNode: Element) {
    if (!scriptNode.parentNode) return;

    const scriptContent: string = scriptNode.textContent || await fetchScriptContent(scriptNode);
    scriptNode.parentNode.removeChild(scriptNode);

    appendScriptNode(compile(scriptContent, 'ks'));
}

async function fetchScriptContent(node: Element) {
    const src = node.getAttribute('src');
    if (!src) return '';
    const response = await fetch(src);
    return response.text();
}

function appendScriptNode(content: string) {
    const script = document.createElement('script');
    script.innerHTML = content;
    document.body.appendChild(script);
}