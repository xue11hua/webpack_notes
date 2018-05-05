const path=require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');
const extractTextPlugin=require("extract-text-webpack-plugin");
var website={
    publicPath:'http://192.168.1.168:1717/' //处理图片路径
}
module.exports={
    entry:{//入口
        entry:'./src/b.js'
    },
    output:{//出口
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath  //处理图片路径
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.(html|htm)$/,
                use:[ 'html-withimg-loader'] 
            }
        ]
    },
    plugins:[
        // new uglify()
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("/css/index.css"),
        
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.1.168',
        compress:true,
        port:1717
    }
}