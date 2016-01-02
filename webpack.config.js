module.exports = {
    entry: './app/scripts/main',

    output: {
        filename: 'bundle.js',
        path: './app/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
