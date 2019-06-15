//Closures: a A closure is simply a function that retains a reference to one or more variables in a parent scope (or scopes).
function p1(){
  let a = 'a';
  function c1(){
    return a //dosen't have to return a; a reference to a like console.log(a) is a closure
  }
  return c1;
}

// ----------------------------------------------------------
//MODULES
function CoolModule() {
	var something = "cool"; // KEEP VARIABLES PRIVATE! should work like an API
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
// ----------------------------------------------------------
//Singleton Module
var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
