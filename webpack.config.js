module.exports = {
    entry : './src/index.js',
    output : {
        path : __dirname,
        filename : 'expensetracker.js'
    },
    devServer : {
        inline : true,
        port : 1234
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
                query : {
                    presets : ['es2015','react']
                }
            },


            {
                test: /\.scss|.css$/,
                loader: ['style-loader','css-loader','sass-loader']
                 
            },
            
      {
        test: /\.jpe?g|png|gif|svg|woff|ttf|eot$/,
        loader:  ['url-loader']
      }
        ]
    }
}