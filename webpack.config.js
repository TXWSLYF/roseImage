module.exports = {

    mode: 'development',
    devtool: 'source-map',
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=1024&name=[name].[ext]&outputPath=imgs/',
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    devServer: {
        contentBase: __dirname + "/build",
        compress: true,
        port: 9000
    }
}