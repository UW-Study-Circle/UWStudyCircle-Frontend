const autoprefixer = require('autoprefixer');

module.exports = [{
    mode: 'production',
    entry: ['./scss/app.scss', './js/app.js'],
    output: {
        filename: 'bundle.js'    },
    module: {

        loaders: [
            {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
            {loader: 'style-loader!css-loader', test: /\.css$/},
            {loader: 'url-loader', test: /\.gif$/},
            {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
          ],
        },
        resolve: {
          alias: {
            config$: './configs/app-config.js',
            react: './vendor/react-master',
          },
          extensions: ['', 'js', 'jsx'],
          modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules',
          ],
        
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['./node_modules']
                            }
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
}];
