//Whhen running parrarel code, results might be varied; a way to counter it can be something like:
var res = [];

function response(data) {
	if (data.url == "http://some.url.1") {
		res[0] = data;
	}
	else if (data.url == "http://some.url.2") {
		res[1] = data;
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

//This guarentees where the data is stored
// ----------------------------------------------------------
//The chapter discusses where running parralel threads can ovverride similar variables, or execute an undefined variable; it's basic knowledge in knowing how to tackle these problems (dw about it0
// ----------------------------------------------------------
//Note: to check if a variable is defined, you can do:
a = 3;
b = 4;

if (a && b){
	console.log('hi');
}
