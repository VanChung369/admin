import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  /**
   * @name Enable hash mode
   * @description Let the product after build include hash suffix. Typically used for incremental releases and to avoid browser load caches.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Enable reactQuery
   * @description using reactQuery.
   */
  // reactQuery: {
  //   devtool: true,
  //   queryClient: true,
  // },

  /**
   * @name Enable dva
   * @description i don't know how to use dva so i'm using redux.
   */
  // dva: {},

  /**
   * @name compatibility settings
   * @description Setting ie11 is not necessarily perfectly compatible, you need to check all dependencies you use
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },

  /**
   * @name Routing configuration, files not imported in routing will not be compiled
   * @description Only support path，component，routes，redirect，wrappers，title configuration
   * @doc https://umijs.org/docs/guides/routes
   */
  routes,

  /**
   * @name Theme configuration
   * @description Although it is called a theme, it is actually just a variable setting of less
   * @doc antd https://ant.design/docs/react/customize-theme-cn
   * @doc umi theme https://umijs.org/docs/api/config#theme
   */
  theme: {
    'root-entry-name': 'variable',
  },

  /**
   * @name moment Internationalization configuration
   * @description If there is no requirement for internationalization, the js package size can be reduced after opening
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,

  /**
   * @name proxy configuration
   * @description You can let your local server proxy to your server, so that you can access the data of the server
   * @see It should be noted that the following agents can only be used during local development, and cannot be used after build.
   * @doc  https://umijs.org/docs/guides/proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  /**
   * @name Fast Hot Update Configuration
   * @description A nice hot update component that can keep state when updating
   */
  fastRefresh: true,

  /**
   * @name metas Configuration Meta Tags
   * @description A nice SEO
   */
  metas: [],

  //============== The following are the plugin configurations of max ===============
  /**
   * @name dataflow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},

  /**
   * A global initial data stream that can be used to share data between plugins
   * @description It can be used to store some global data, such as user information, or some global state. The global initial state is created at the beginning of the entire Umi project。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},

  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Ant Design',
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },

  /**
   * @name moment2dayjs plugin
   * @description Replace moment in the project with dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },

  /**
   * @name Internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },

  /**
   * @name antd plugin
   * @description Built-in babel import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},

  /**
   * @name Network request configuration
   * @description It provides a unified network request and error handling scheme based on the useRequest of axios and ahooks.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},

  /**
   * @name permission plugin
   * @description Permission plugin based on initialState, initialState must be opened first
   * @doc https://umijs.org/docs/max/access
   */
  access: {},

  /**
   * @name <head> additional script in
   * @description Configure additional scripts in <head>
   */
  headScripts: [{ src: '/scripts/loading.js', async: true }],

  //================ pro plugin configuration =================
  presets: ['umi-presets-pro'],

  /**
   * @name Configuration of the openAPI plugin
   * @description Generate serve and mock based on the openapi specification, which can reduce a lot of boilerplate code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},

  exportStatic: {},
});
