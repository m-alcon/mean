const   webpack = require('webpack'),
        path = require('path'),
        ExtractTextPlugin = require("extract-text-webpack-plugin"),
        HtmlWebpackPlugin = require('html-webpack-plugin')
        

module.exports = function (env) {

    let extractCSS = new ExtractTextPlugin({ filename: '[name].css'}),
        plugins = [
            new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'] }),
            new ExtractTextPlugin({ filename: 'style.bundle.css'}),
            new HtmlWebpackPlugin({ 
                template: path.resolve(__dirname, './index.html'), 
                hash: true 
            }),
        ]

    if (env && env.release) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({ mangle:false }))
        plugins.push(new webpack.NoEmitOnErrorsPlugin())
    }

    return {
        entry:   {
            polyfills: path.resolve(__dirname, './polyfills'),
            vendor:    path.resolve(__dirname, './vendor'),
            app:       path.resolve(__dirname, './app/main'),
        },
        output:  {
            path: env && env.release 
                ? path.resolve(__dirname, "../server/public")
                : path.resolve(__dirname, "./dist"),
            publicPath: "/",
            filename:   "[name].bundle.js"
        },
        devtool: env && env.release 
                    ? '' 
                    : "source-map",
        resolve: {
            extensions: ['.js', '.ts', ".less", ".css"]
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.ts/, 
                    loaders: [
                        { 
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: './client/tsconfig.json'
                            },
                        }, 
                        'angular2-template-loader',
                        'angular-router-loader'
                    ],
                },
                {
                    test: /(\.less|\.css)$/,
                    loader: extractCSS.extract({
                        fallback: 'style-loader',
                        use: ["css-loader", "less-loader"]
                    })
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                },
            ]
        },
    //     devServer: {
    //        proxy: {
    //             "/api": "http://localhost:3000",
    //             "/images": "http://localhost:3000",
    //             "/auth": "http://localhost:3000",
    //             "/img": "http://localhost:3000",
    //             "/uploads": "http://localhost:3000"
    //        }
    //    }
    }
}