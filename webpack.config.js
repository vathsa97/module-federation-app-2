const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const webpack = require("webpack");

module.exports = (_, argv) => ({
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath:
      argv.mode === "production"
        ? "https://module-federation-app-2-vathsa97.vercel.app/"
        : "http://localhost:3000/",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new webpack.DefinePlugin({
      process: {
        env: {
          SC_CLASS_PREFIX: JSON.stringify("APP2-"),
        },
      },
    }),
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./App2": "./src/App",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      // shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
