/**
 * @file Wallpaper with code
 * @author shad
 * @version 0.1
 * @license MIT
 */

let TEXT;
let LOGO;
let CANVAS;
let CANVASCONTEXT;
let CANVASIMG;

$( document ).ready( () => {

	// get the base canvas
	CANVAS = document.getElementById( 'canvas' );
	CANVASCONTEXT = CANVAS.getContext( '2d' );
	// and the canvas who will hold the image used for the text colors
	CANVASIMG = document.getElementById( 'canvas-img' );

	fitCanvasToContainer( CANVAS );
	fitCanvasToContainer( CANVASIMG );

	$( '#generate' ).on( 'click', buildPoster );

} );

/**
 * fit canvas to container
 * @param  {HTMLElement} canvas
 * @author shad
 */
function fitCanvasToContainer( canvas ){
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

/**
 * get the text from the given url
 * @param  {String} url
 * @author shad
 */
function getText( callback ) {
	const text_url = $( '#text_url' ).val();

	if( !text_url ) {
		throw 'no url for the text was given';
	}

	$.get( text_url, function( data ) {
		TEXT = data.toString();
		callback();
	} );
}

/**
 * get the logo url
 * @author shad
 */
function getLogo( callback ) {
	const logo = $( '#logo' );
	const logo_img = logo[ 0 ].files[ 0 ];

	if( !logo_img ) {
		throw 'no file for the logo was given';
	}

	LOGO = logo_img;
	callback();
}

/**
 * build the poster
 * @author shad
 */
function buildPoster() {

	getLogo( function() {
		getText( function() {

			CANVASCONTEXT.font = '7px Arial';

			const width = CANVAS.width;
			const height = CANVAS.height;

			// handle the special CANVAS with img for color
			const ctxImg = CANVASIMG.getContext( '2d' );
			const logo = document.getElementById( 'img' );

			const reader = new FileReader();
			reader.addEventListener( 'load', function() {
			    logo.src = reader.result;
			}, false );

			$( logo ).on( 'load', function() {

				ctxImg.drawImage( img,
					CANVAS.width / 2 - img.width / 2,
					CANVAS.height / 2 - img.height / 2 );
				// ctxImg.contrast = 50;

				let x = 6;
				let y = 8;
				for( let i = 0; i < TEXT.length; i++ ) {

					// get the color at the text position
					const img_data = ctxImg.getImageData( x, y, 6, 8 ).data;
					let color = "#" + ( "000000" + rgbToHex( img_data[ 0 ], img_data[ 1 ], img_data[ 2 ] ) ).slice( -6 );

					if( color === '#ffffff' || color === '#000000' ) {
						color = '#a5a5a5';
					}

					CANVASCONTEXT.fillStyle = color;
					CANVASCONTEXT.fillText( TEXT[ i ], x, y );
					x = x + 6;

					if( x > width ) {
						x = 6;
						y = y + 8;

						if( y > height ) {
							break;
						}
					}
				}

			} );

			reader.readAsDataURL( LOGO );

		} );
	} );

}

/**
 * convert RGB color to hex
 * @param  {Number} r
 * @param  {Number} g
 * @param  {Number} b
 * @return {String}
 * @author shad
 */
function rgbToHex( r, g, b ) {
    if ( r > 255 || g > 255 || b > 255 ) {
		throw "invalid color component";
	}

    return ( ( r << 16 ) | ( g << 8 ) | b ).toString( 16 );
}
