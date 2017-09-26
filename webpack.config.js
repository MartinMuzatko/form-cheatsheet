var webpack = require('webpack')
var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {

    entry: {
        'main' : './src/main.js',
        'vendor' : './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, ''), // string
        filename: "dist/[name].js", // string
        publicPath: "/", // string
    },

    module: {
        // configuration regarding modules

        rules: [
            //{ test: /\.js$/, loader: 'source-map', enforce: 'pre' },
            { test: /\.html$/, loader: 'riotjs' },
            { test: /\.js|\.html$/, loader: 'babel', options: { presets: 'es2015-riot' }},
            //{ test: /\.(jpe?g|png|gif|mp4)$/i, loader: 'file?name=img/[name].[ext]'},
            //{ test: /fonts\/.*\.(woff|eot|svg|otf|ttf)$/i, loader: `file?name=fonts/[name].[ext]`},
            {
                test: /\.less$/, use: ExtractTextPlugin.extract(
                    [
                        {loader:'css'},
                        {loader:'postcss', options: {
                            plugins: () => {return [
                                autoprefixer({browsers: 'last 3 versions'}),
                                cssnano(),
                            ]}
                        }},
                        {loader:'less'}
                    ]
                ),

            },
            {
                test: /\.scss$/, use: ExtractTextPlugin.extract(
                    [
                        {loader:'css'},
                        {loader:'postcss', options: {
                            plugins: () => {return [
                                autoprefixer({browsers: 'last 3 versions'}),
                                cssnano(),
                            ]}
                        }},
                        {loader:'sass'}
                    ]
                ),
            },
            { test: /\.json$/, loader: 'json'},
            { test: /\.html$/, loader: 'riotjs' },
        ],

    },

    resolveLoader: {
        moduleExtensions: ["-loader"]
    },

    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new ExtractTextPlugin("dist/css/[name].css"),
        new HtmlWebpackPlugin({
            template: 'index.ejs'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
    ],

    devtool: "source-map", // enum

    context: __dirname, // string (absolute path!)

    target: "web", // enum

    stats: { //object
        //assets: true,
        colors: true,
        errors: true,
        //errorDetails: true,
        //hash: true,
    },

    devServer: {

        contentBase: path.join(__dirname, ''), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },
}
