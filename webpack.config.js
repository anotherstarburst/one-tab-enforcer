const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const PACKAGE = require('./package.json');

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'webp', 'woff', 'woff2'];

const devServerPort = 9000;

module.exports = (env) => {
  const { BUILD_ENV } = env;
  const mode = BUILD_ENV === 'production' ? 'production' : 'development';

  return {
    mode,
    target: 'web',
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      library: 'OneTabEnforcer',
      libraryTarget: 'umd',
      globalObject: 'this',
      umdNamedDefine: true,
      assetModuleFilename: 'images/[hash][ext][query]',
      clean: true,
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    watchOptions: {
      aggregateTimeout: 600,
      ignored: /node_modules/,
    },
    plugins: [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: {
            condition: /^\**!|@preserve|@license|@cc_on/i,
            filename: (fileData) =>
              // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
              `${fileData.filename}.LICENSE.txt${fileData.query}`,
            banner: (licenseFile) =>
              `This file is part of the "${PACKAGE.name}" (version ${PACKAGE.version}) plugin offered by ${PACKAGE.author}. License information can be found in ${licenseFile}`,
          },
          terserOptions: {
            sourceMap: true, // Must be set to true if using source-maps in production
            compress: {
              drop_console: mode === 'production', // only drop the console in production.
              drop_debugger: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: 'ts-loader' },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: 'source-map-loader' },

        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.(jpg|png|svg)$/,
          // really we want to be using `asset` not `asset/inline` here as the get requests need to stay
          // smaller than 8192 bytes - 0.008192Mb...
          // see https://webpack.js.org/guides/asset-modules/ about 'asset' - though I can't seem
          // to find a way to make node modules import bundled images.
          // apparently new URL("./images/someimg.png", import.meta.url) is supposed to help... but
          // I can't make it work.
          type: 'asset/inline',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                sourceMap: true, // <-- IMPORTANT for resolve-url-loader
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
            'resolve-url-loader',
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // <-- IMPORTANT for resolve-url-loader
              },
            },
          ],
          type: 'javascript/auto',
        },
      ],
    },
    resolve: {
      extensions: fileExtensions
        .map((extension) => `.${extension}`)
        .concat(['.ts', '.tsx', '.jsx', '.js', '.css', '.scss']),
    },

    devServer: {
      https: false, // safari needs this to be false otherwise you get drama
      open: ['/index.html'],
      static: {
        directory: path.join(__dirname, 'public'),
        serveIndex: true,
        watch: true,
      },
      compress: true,
      port: devServerPort,
    },
  };
};
