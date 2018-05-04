const path=require('path');

const htmlPlugin=require('html-webpack-plugin');
module.exports={
    entry:{//入口
        entry:'./src/b.js'
    },
    output:{//出口
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                }]
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
        })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.1.168',
        compress:true,
        port:1717
    }
}