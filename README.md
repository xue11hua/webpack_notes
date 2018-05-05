#第一节
webpack安装4.6.0
npm install -g webpack
npm install webpack-cli -g
webpack -v

npm init创建项目
npm install
npm install --save-dev webpack


卸载: npm uninstall webpack -g
npm install webpack-cli --save-dev


#第二节
webpack打包
webpack  src/b.js --output-filename a.js
会把src下的b.js打包到dist/a.js

#第三节
配置webpack.config.js
配置入口和出口
const path=require('path');

module.exports={
    entry:{//入口
        entry:'./src/b.js',
        entry2:'./src/b2.js'
    },
    output:{//出口
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{},
    plugins:[],
    devServer:{}
}
命令行输入webpack打包文件

#第四节
热更新和服务
配置webpack.config.js
 devServer:{
        contentBase:path.resolve(__dirname,'dist'),//文件路径要监听的文件
        host:'192.168.1.168',//本机ip地址 ipconfig查看本机ip
        compress:true,//是否启用服务器压缩
        port:1717  //端口号
    }
npm install webpack-dev-server --save-dev
#第五节
打包css文件
在js中引入css import css from './css/index.css';
安装
npm install style-loader --save-dev
npm install css-loader --save-dev
配置webpack.config.js

 module:{
        rules:[
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
或者
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
#第六节
js压缩
配置webpack.config.js
引入
const uglify = require('uglifyjs-webpack-plugin');

  plugins:[
        new uglify()
    ],


#第七节
html文件打包
cnpm install --save-dev html-webpack-plugin
引入
配置webpack.config.js
const htmlPlugin=require('html-webpack-plugin');

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
#第八节
css引入图片
图片写成背景
安装
npm install --save-dev file-loader url-loader
配置webpack.config.js
 rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                }]
            },{
                test:/\.(png|jpg|gif)/,
                use[{
                    loader:'url-loader',
                    options:{
                        limit:50000
                    }
                }]
            }
        ]
#第九节
css分离
安装
npm install --save-dev extract-text-webpack-plugin
如果出现错误
Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead

npm install extract-text-webpack-plugin@next
配置
webpack.config.js
引入
const extractTextPlugin=require('extract-text-webpack-plugin');
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
                        limit:500
                    }
                }]
            }
        ]
       new extractTextPlugin("/css/index.css"),
处理图片路径
var website={
    publicPath:'http://192.168.1.168:1717/'
}
 output:{//出口
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
#第十节

图片打包到images文件夹下
配置
webpack.config.js
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
            }
        ]
局部安装webpack
运行webpack
配置
package.json
 "scripts": {
    "server": "webpack-dev-server",
    "build":"webpack"
  },

处理html中img引入图片
安装国人写的
cnpm insatll --save-dev html-withimg-loader
配置
webpack.config.js
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


