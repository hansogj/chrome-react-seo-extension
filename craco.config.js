module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => ({
            ...webpackConfig,
            entry: {
                main: [env === 'development' &&
                    require.resolve('webpack/hot/dev-server'), paths.appIndexJs].filter(Boolean),
                content: './src/chromeServices',
            },
            output: {
                ...webpackConfig.output,
                filename: 'static/js/[name].js',
            },
            optimization: {
                /*   ...webpackConfig.optimization,
                  runtimeChunk: false, */
            }
        }),
    }
}
