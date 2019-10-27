let a='a';
let url;
if(a=='b'){
    url='https://www.sunnyyang.com/openapi';
}else{
    url='https://www.doseeing.com/openapi';
}
module.exports = {
    publicPath:'./',
    devServer: {
        proxy: {
            '/openapi': {
                target: url,
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