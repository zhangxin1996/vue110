const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry:'./src/main.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
    })
  ],
  module:{
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']},  //处理css的loader
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']}, //处理less的loader
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}, //处理scss的loader
      {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=5491&name=[hash:8]-[name].[ext]'},  //处理图片的loader
      {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},  //处理字体文件的loader
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},  //配置babel来转化高级的es6语法
      {test:/\.vue$/,use:'vue-loader'}    // 处理.vue文件的loader
    ]
  },
  resolve:{
    alias:{   //  修改vue包被导入时候的路径
      // 'vue$':'vue/dist/vue.js'
    }
  }
}