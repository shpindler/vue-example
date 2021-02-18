import { config as dotenv } from 'dotenv'
import { Configuration } from '@nuxt/types'
import fse from 'fs-extra'
import { sliceStartSlash, sliceEndSlash } from './utils'

dotenv()

const BASE_URL = process.env.BASE_URL
  ? sliceEndSlash(process.env.BASE_URL)
  : ''
const STATIC_ROOT = process.env.STATIC_ROOT
  ? sliceStartSlash(sliceEndSlash(process.env.STATIC_ROOT))
  : ''

const nuxtConfig: Configuration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | АСУ УЦПК',
    meta: [{ charset: 'utf-8' }],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href:
          process.env.npm_lifecycle_event === 'dev'
            ? '/nuxt-static/favicon.png'
            : [STATIC_ROOT, 'nuxt-static/favicon.png'].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/extjs/resources/css/ext-all.css',
        ].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/extjs/resources/css/ux/ux-all.css',
        ].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [BASE_URL, STATIC_ROOT, 'm3/css/m3.css'].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [BASE_URL, STATIC_ROOT, 'm3/css/icons.css'].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [BASE_URL, STATIC_ROOT, 'ext/css/lightbox.css'].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [BASE_URL, STATIC_ROOT, 'm3/css/locking-grouping-grid.css'].join(
          '/',
        ),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/extjs/resources/css/ux/calendar.css',
        ].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/extjs/resources/css/ux/gridsummary.css',
        ].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [BASE_URL, STATIC_ROOT, 'ext/css/TreeGrid.css'].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/livegrid/resources/css/ext-ux-livegrid.css',
        ].join('/'),
      },
      {
        rel: 'stylesheet',
        href: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/resources/css/htmleditorplugins.css',
        ].join('/'),
      },
      // { rel: 'stylesheet', href: [BASE_URL, STATIC_ROOT, 'css/ext-theme.css'].join('/') }
    ],
    script: [
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=es2015' },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'vendor/extjs/adapter/ext/ext-base.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/extjs/ext-all.js'].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/extjs/ux-all.js'].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/extjs/locale/ext-lang-ru.js'].join(
          '/',
        ),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/extjs/locale/ux-lang-ru.js'].join(
          '/',
        ),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'm3/js/m3-opt.js'].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'm3/js/ext-extensions/LockingGridColumnWithHeaderGroup.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/extjs/gridsummary.js'].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'vendor/livegrid/livegrid-all.js'].join(
          '/',
        ),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'm3/js/ext-extensions/MultiGroupingGrid.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'm3/js/ext-extensions/ExportGrid.js'].join(
          '/',
        ),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Divider.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Image.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Link.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.MidasCommand.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Plugins.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.SpecialCharacters.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Table.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [
          BASE_URL,
          STATIC_ROOT,
          'VinylFox-ExtJS.ux.HtmlEditor.Plugins/src/Ext.ux.form.HtmlEditor.Word.js',
        ].join('/'),
        defer: true,
      },
      {
        src: [BASE_URL, STATIC_ROOT, 'm3/js/fias/AddressPanel.js'].join('/'),
        defer: true,
      },
      { src: [BASE_URL, STATIC_ROOT, 'project.js'].join('/'), defer: true },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#e3432d' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (!config.module || !config.resolve || !config.output) {
        throw new Error('Ошибка конфигурации Webpack.')
      }

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      config.resolve.modules = ['components', 'node_modules']
      const vueLoader = config.module.rules.find(
        rule => rule.loader === 'vue-loader',
      )
      if (!vueLoader || !vueLoader.options) {
        throw new Error('Не найден vue-loader.')
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      vueLoader.options.transformAssetUrls = {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
        'vue-img': ['src', 'blank-src'],
      }
      if (!isDev) {
        config.output.publicPath = '/static/_nuxt/'
      }
    },
    extractCSS: true,
    analyze: true,
    transpile: [/typed-vuex/],
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex',
    '@nuxtjs/dotenv',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-material-design-icons',
    '@shpindler/nuxt-global-components',
  ],
  axios: {
    baseURL: BASE_URL,
    credentials: true,
  },
  globalComponents: {
    path: 'Global',
  },
  plugins: fse.readdirSync('./plugins/core').map(d => `~plugins/core/${d}`),
  watch: ['~plugins/core'],
  css: ['~assets/scss/main.scss', '~assets/scss/ext-theme.scss'],
  pageTransition: 'fade',
  styleResources: {
    scss: fse.readdirSync('./assets/scss/resources').map((d) => {
      return `~assets/scss/resources/${d}`
    }),
  },
}

export default nuxtConfig
