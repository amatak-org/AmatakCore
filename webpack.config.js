const path = require('path');
const Path = require("path");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

// Insert Plugins
//var Stripe = require('stripe');

const opts = {
  rootDir: process.cwd(),
  devBuild: process.env.NODE_ENV !== "production"
};

module.exports = {
  entry: {
    app: ["./src/js/app.js", "./src/js/app.scss"],

    //Add Plugins to the Amatak Admin Panel
    //stripe: ["./src/plugins/src/index.js", "./src/plugins/src/cjs.js"],

  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  output: {
    path: Path.join(opts.rootDir, "dist"),
    pathinfo: opts.devBuild,
    filename: "js/[name].js",
    chunkFilename: 'js/[name].js',
    clean: true,
  },
  performance: { hints: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5
        }
      }),
      new CssMinimizerPlugin({})
    ],
    runtimeChunk: false
  },
  plugins: [
    // Extract css files to seperate bundle
    new MiniCssExtractPlugin({
      filename: "css/app.css",
      chunkFilename: "css/app.css"
    }),
    // Copy fonts and images to dist
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/img", to: "assets/img" }
      ]
    }),
    // Copy dist folder to static
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: "./dist/", destination: "./root" }
          ]
        }
      }
    }),
    //Amatak Official Plugins Go Here
    //new Stripe({ options: true })
  ],
  module: {
    rules: [
    // File Loader
    {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option

            // To get relative path you can use
            // const relativePath = path.relative(context, resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_public_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return `public_path/${url}`;
          },
        },
      },
      // Babel-loader
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },

      //import HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // Css-loader & sass-loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require.resolve("sass"),
            }
          }
        ]
      },
      // Load fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      },
      // Load images
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]"
        }
      },
    ]
  },
  resolve: {
    extensions: [".js", ".scss"],
    modules: ["node_modules"],
    alias: {
      request$: "xhr"
    }
  },

  // SetUp Hosting Server
  devServer: {

   allowedHosts: 'auto',
    static: {
    //Multi hosts assigned.
      //directory: Path.join(__dirname, "panel"),
      directory: Path.join(__dirname, "root"),
    },
    client: {
      overlay: true,
    },
    compress: true,
    port: 8080,
    open: true
  }
};
