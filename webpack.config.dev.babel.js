import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssNext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssReporter from 'postcss-reporter';
import StyleLintPlugin from 'stylelint-webpack-plugin';
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
      main: './app.js'
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
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                emitWarning: true,
                configFile: '.eslintrc'
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
                loader: "css-loader",
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
                loader: "sass-loader",
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
                exports: false
              }
            }
          ]
        },
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        LANG: JSON.stringify("ru")
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "common"
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'pug/index.pug',
        minfy: false
      }),

      new HtmlWebpackPlugin({
        filename: 'ru/index.html',
        template: path.resolve(PATHS.views, 'ru/index.pug'),
        minfy: false
      }),

      new HtmlWebpackPlugin({
        filename: 'en/index.html',
        template: path.resolve(PATHS.views, 'en/index.pug'),
        minfy: false
      }),

      new HtmlWebpackPlugin({
        filename: 'jpy/index.html',
        template: path.resolve(PATHS.views, 'jpy/index.pug'),
        minfy: false
      }),

      extractStyles,

      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src/' + stylesType,
        files: '**/*' + stylesExtension,
        failOnError: false,
        quiet: true,
      }),

      new CopyWebpackPlugin([
        {
          from: PATHS.static,
          to: PATHS.dist
        }
      ]),

      new BrowserSyncPlugin({
        files: "dist/**/*.*",
        hostname: "localhost",
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
