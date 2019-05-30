requirejs.config({
    paths: {
        vendor: '/js',
        postmonger: 'vendor/postmonger'
    },
    shim: {
        'js/jquery.min': {
            exports: '$'
        },
        'modal': {
            deps: ['vendor/jquery.min', 'vendor/postmonger']
        }
    }
});

requirejs( ['vendor/jquery.min', 'modal'], function( $, modal ) {
    //console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
    //console.log( "REQUIRE ERROR: ", err );
    if( err.requireType === 'timeout' ) {
        console.log( 'modules: ' + err.requireModules );
    }

    throw err;
};
