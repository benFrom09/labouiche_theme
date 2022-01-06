const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = "development";

if(process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode:mode,
    entry: {
        main:path.resolve(__dirname,'./js/index.js'),
    },
    output: {
        path:path.resolve(__dirname,'../build'),
        filename:'[name].bundle.js',
        assetModuleFilename:"images/[hash][ext][query]",
        clean:true
    },

    module: {
        rules:[
            {
                test:/\.(png|jpe?g|gif|svg)$/i,
                type:"asset/ressource"
            },
            {
                test:/\.(scss|css)$/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{publicPath:""},
                    },
                    'css-loader','sass-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            }
        ],
       
    },
    plugins:[new MiniCssExtractPlugin()],
    devtool:"source-map"
}