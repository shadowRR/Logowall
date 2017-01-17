/**
 * @file Wallpaper with code
 * @author shad
 * @version 0.1
 * @license MIT
 */

$( document ).ready( () => {

	// get the base canvas
	const canvas = document.getElementById( 'canvas' );
	// and the canvas who will hold the image used for the text colors
	const canvasImg = document.getElementById( 'canvas-img' );

	fitCanvasToContainer( canvas );
	fitCanvasToContainer( canvasImg );

	// get some minified code to draw on the canvas
	$.get( 'https://code.jquery.com/jquery-3.1.1.min.js', function( data ) {

		const ctx = canvas.getContext( '2d' );
		ctx.font = '7px Arial';

		const width = canvas.width;
		const height = canvas.height;

		// handle the special canvas with img for color
		const ctxImg = canvasImg.getContext( '2d' );
		var image = document.getElementById( 'img' );
		ctxImg.drawImage( image,
        	canvas.width / 2 - image.width / 2,
        	canvas.height / 2 - image.height / 2 );

		let x = 6;
		let y = 8;
		for( let i = 0; i < data.length; i++ ) {

			// get the color at the text position
			const img_data = ctxImg.getImageData( x, y, 6, 8 ).data;
			let color = "#" + ( "000000" + rgbToHex( img_data[ 0 ], img_data[ 1 ], img_data[ 2 ] ) ).slice( -6 );

			if( color === '#ffffff' || color === '#000000' ) {
				color = '#a5a5a5';
			}

			ctx.fillStyle = color;
			ctx.fillText( data[ i ], x, y );
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
