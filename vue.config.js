module.exports = {
    publicPath:'./',
    devServer: {
        proxy: {
            '/openapi': {
                target: 'https://www.doseeing.com/openapi',
                ws: true,
                secure: true,
                changeOrigin: true ,  
                pathRewrite:{
                    '^/openapi':''
                }
            }
        }
    }
};