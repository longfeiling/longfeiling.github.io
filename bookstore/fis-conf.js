//加md5
fis.match('*.{js,css,png}',{
	useHash:true
});

//启用fis-sprite-csssprites 插件
fis.match('::package',{
	spriter: fis.plugin('csssprites')
});

//对css进行图片合并
fis.match('*.css',{
	useSprite: true
});

//启用fis-optimizer-uglify-js 插件
fis.match('*.js',{
	optimizer: fis.plugin('uglify-js')
});

fis.match('*.css',{
	optimizer: fis.plugin('clean-css')
});

fis.match('*.png',{
	optimizer: fis.plugin('png-compressor')
});

//不需要压缩，合并，hash
fis.media('debug').match('*.{js,css,png}',{
	useHash: false,
	useSprite: false,
	optimizer: null
})