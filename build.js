const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/kanatik.js',
    platform: 'browser',
    format: 'esm',
    sourcemap: true,
    loader: { '.json': 'json' }
}).catch(() => process.exit(1));