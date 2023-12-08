const vitePreprocess = import('@sveltejs/vite-plugin-svelte').then(m => m.vitePreprocess());

module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: {
        script: async (options) => (await vitePreprocess).script(options),
        style: async (options) => (await vitePreprocess).style(options)
    }
};