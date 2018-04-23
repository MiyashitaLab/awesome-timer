require("babel-core/register");
module.exports = {
  entry: __dirname + "/src/main.jsx",
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: __dirname + "/dist",
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/       
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.ttf$/,
        loader: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};
