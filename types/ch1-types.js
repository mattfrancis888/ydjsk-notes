//typeof can be useufll in situations wher eyou have a global variable that needs to be maintained troughout your code base, like:
if (DEBUG) {
	console.log( "Debugging is starting" );
}

// this is a safe existence check
if (typeof DEBUG !== "undefined") {
	console.log( "Debugging is starting" );
}
