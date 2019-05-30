requirejs.config({
    paths: {
        vendor: '/js',
		postmonger: 'vendor/postmonger'
    },
    shim: {
        'js/jquery.min': {
            exports: '$'
        },
		'customActivity': {
			deps: ['vendor/jquery.min', 'vendor/postmonger']
		}
    }
});

requirejs( ['vendor/jquery.min', 'customActivity'], function( $, customActivity ) {
	//console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
	//console.log( "REQUIRE ERROR: ", err );
	if( err.requireType === 'timeout' ) {
		console.log( 'modules: ' + err.requireModules );
	}

	throw err;
};
