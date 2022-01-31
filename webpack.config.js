const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");


module.exports = {
    entry: {
        app: "./public/js/index.js",
      },
      output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
      },    
      devServer: {
        static: {
          directory: __dirname,
        },
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath: function(url) {
                    return url.replace('../', '/public/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
      
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        }),
        new WebpackPwaManifest({
          name: "Budget Tracker",
          short_name: "Budget",
          description: "An app that allows you to track your money and update your budget tracker.",
          start_url: "../index.html",
          background_color: "#01579b",
          theme_color: "#ffffff",
          fingerprints: false,
          inject: false,
          icons: [{
            src: path.resolve("./icons/icon-512x512.png"),
            sizes: [72, 96, 128, 144, 152, 192, 384, 512],
            destination: path.join("public", "icons")
          }]
        })        
    ],
    mode: 'development'
};
