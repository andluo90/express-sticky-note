var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry:path.join(__dirname,'js/app/index.js'),
    output:{
        path:path.join(__dirname,'../public'),
        filename:'js/index.js'
        
    },

    module:{
        rules:[
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: ["css-loader", "less-loader"]
                })
            }
        ]
    },

    resolve: {
        alias: {
            jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
            mod: path.join(__dirname, "js/mod"),
            less: path.join(__dirname, "less")
        }
    },

    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new ExtractTextPlugin("css/index.css"),
    ]

}