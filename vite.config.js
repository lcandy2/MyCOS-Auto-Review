import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: {
        jquery: [['default', '$'],
        ['default', 'jquery']],
      },
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '自动评教：适用于 MyCOS / 麦可思 的自动评教 MyCOS Auto Review',
        description: '一键评教，自动完成课程评价，支持单选、多选、文本评价。支持仅填充评价和填充并提交评价两种模式。适用于所有采用 MyCOS / 麦可思 （评教系统左上角有MyCOS或M标识）系统的高校或其他单位。',
        icon: 'http://www.mycos.com.cn/Uploads/icopic/54a0fcc38f623.ico',
        author: 'lcandy2',
        namespace: 'https://github.com/lcandy2/MyCOS-Auto-Review',
        match: ['*://*.edu.cn/*', '*://*.mycospxk.com/*'],
        "run-at": 'document-start',
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          jquery: cdn.jsdelivr('jQuery', 'dist/jquery.min.js'),
        },
      },
    }),
  ],
});
