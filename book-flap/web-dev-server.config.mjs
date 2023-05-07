// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  open: true,

  port: 8082,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  //appIndex: 'demo/index.html',
  //rootDir: '../../',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
  ],
  mimeTypes: {
    // image/png gibi tüm image dosya türlerinin MIME türlerini ekleyin.
    'image/png': ['png'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/gif': ['gif'],
    'image/svg+xml': ['svg'],
  },
  // See documentation for all available options
});
