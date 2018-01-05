import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';
import postcssNext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssReporter from 'postcss-reporter';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const PATHS = {
  src: path.join(__dirname, 'src'),
  js: path.join(__dirname, 'src/js'),
  static: path.join(__dirname, 'src/static'),
  views: path.join(__dirname, 'src/pug/views'),
  dist: path.join(__dirname, 'dist'),
};

const extractStyles = new ExtractTextPlugin({ filename: 'css/[name].css' });

const postcssProcessors = [
  postcssImport,
  postcssExtend,
  postcssNext,
  postcssReporter({ clearReportedMessages: true }),
];

const scssProcessors = [
  postcssReporter({ clearReportedMessages: true }),
];

module.exports = env => {
  const stylesType = process.env.STYLES; // postcss or scss
  const stylesExtension = stylesType === 'scss' ? '.scss' : '.css';

  return {
    context: PATHS.src,

    entry: {
      main: './app.js',
      dashboard: './dashboard.js'
    },

    output: {
      path: PATHS.dist,
      filename: 'js/[name].js'
    },

    watch: env.dev,

    devtool: 'cheap-module-eval-source-map',

    devServer: {
      contentBase: PATHS.dist,
      watchContentBase: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.js,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: ['transform-runtime']
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: postcssProcessors,
                }
              }
            ],
            publicPath: '../'
          })
        },
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: scssProcessors
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            publicPath: '../'
          })
        },
        {
          test: /\.pug$/,
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                exports: false,
                pretty: true
              }
            }
          ]
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          use: 'file-loader?name=my_assets/[name].[ext]'
        },
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        LANG: JSON.stringify('ru'),
        RECAPTCHA_KEY: JSON.stringify('6LehUz8UAAAAAAsd3PdAh6mYg5gWdGVfcw7_PSI0')
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'pug/index.pug',
        minify: false,
        excludeAssets: [/dashboard\.(css|js)/]
      }),

      new HtmlWebpackPlugin({
        filename: 'ru/index.html',
        template: path.resolve(PATHS.views, 'ru/index.pug'),
        minify: false,
        excludeAssets: [/dashboard\.(css|js)/]
      }),

      new HtmlWebpackPlugin({
        filename: 'en/index.html',
        template: path.resolve(PATHS.views, 'en/index.pug'),
        minify: false,
        excludeAssets: [/dashboard\.(css|js)/]
      }),

      new HtmlWebpackPlugin({
        filename: 'jp/index.html',
        template: path.resolve(PATHS.views, 'jp/index.pug'),
        minify: false,
        excludeAssets: [/dashboard\.(css|js)/]
      }),

      new HtmlWebpackPlugin({
        filename: 'dashboard/login/index.html',
        template: path.resolve(PATHS.views, 'dashboard/login.pug'),
        minify: false
      }),

      new HtmlWebpackPlugin({
        filename: 'dashboard/registration/index.html',
        template: path.resolve(PATHS.views, 'dashboard/registration.pug'),
        minify: false
      }),

      new HtmlWebpackPlugin({
        filename: 'dashboard/profile/index.html',
        template: path.resolve(PATHS.views, 'dashboard/profile.pug'),
        minify: false
      }),

      new HtmlWebpackExcludeAssetsPlugin(),

      extractStyles,

      new CopyWebpackPlugin([
        {
          from: PATHS.static,
          to: PATHS.dist
        }
      ]),

      new BrowserSyncPlugin({
        files: 'dist/**/*.*',
        hostname: 'localhost',
        port: 8080,
        server: { baseDir: ['dist'] },
        reloadDelay: 50,
        injectChanges: false,
        reloadDebounce: 500,
        reloadOnRestart: true
      }),
    ],
  }
};
