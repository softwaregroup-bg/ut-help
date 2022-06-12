import { createRequire } from 'module';

const require = createRequire(import.meta.url);
process.argv.push('--config', require.resolve('.'), '.');
