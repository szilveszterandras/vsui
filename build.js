var path = require('path');
var Webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackDevServer = require("webpack-dev-server");

var config = {
    entry: "app",
    output: {
        path: path.resolve("./build"),
        filename: "vsui.[hash].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl'],
        alias: {},
        root: path.resolve("./src/app")
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                },
                exclude: [path.resolve(__dirname, "node_modules")]
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("css!stylus")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("vsui.[hash].css"),
        new HtmlWebpackPlugin({
            template: "src/assets/index.src",
            filename: "index.html",
            inject: true
        })
    ]
};

if (process.argv[2] == "dev") {
    config.devtool = '#eval-source-map';
    config.debug = true;

    var compiler = Webpack(config);
    (new WebpackDevServer(compiler)).listen(8080);
} else {
    module.exports = config;
}
