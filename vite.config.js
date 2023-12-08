import {defineConfig} from 'vite';

// https://vitejs.dev/config/
module.exports = defineConfig(async ({command, mode}) => {
    const {svelte} = await import('@sveltejs/vite-plugin-svelte');
    return {
        plugins: [svelte()]
    };
});