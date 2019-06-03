//IIFE with params
var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window );

console.log( a ); // 2
// ----------------------------------------------------------
//Garbage collection
function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after! eveyrthing in the block gets garbage collected
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}
