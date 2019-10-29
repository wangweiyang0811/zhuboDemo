module.exports = {
    publicPath:'./',
    devServer: {
        proxy: {
            '/openapi': {
                target: 'https://www.doseeing.com/openapi',
                ws: true,
                secure: false,
                changeOrigin: true ,  
                pathRewrite:{
                    '^/openapi':''
                }
            }
        }
    }
};