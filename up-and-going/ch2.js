var a = 'hello world';
console.log('typeof:',typeof a);				// "string"
// ----------------------------------------------------------
var obj = {
	a: 'hello world',
  'hello world!' : 'bye'
};

obj.a;		// "hello world"
obj["a"];	// "hello world"
obj["hello world!"] // bye

console.log(obj["hello world!"]);
// ----------------------------------------------------------
var obj = {
	a: "hello world",
	b: 42
};
var b = "a";
obj[b];			// "hello world"
// ----------------------------------------------------------
function foo() {
	return 42;
}
foo.bar = "hello world";
// ----------------------------------------------------------
var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;		// true
b == c;		// true
a == b;		// false
//arrays are by default coerced to strings by simply joining all the values with commas (,) in between
// ----------------------------------------------------------
switch (a) {
	case 2:
	case 10:
		// some cool stuff
		break;
	case 42:
		// other stuff
		break;
	default:
		// fallback
}
// ----------------------------------------------------------
//Immediatley invoked funcitons
(function IIFE(){ console.log('IIFE'); })();

var x = (function IIFE(){
	return 42;
})();

x;	// 42
// ----------------------------------------------------------
//Closures:
function makeAdder(x) {

	function add(y) {
		return y + x;
	};

	return add;
}

var plusOne = makeAdder( 1 );
plusOne( 3 );		// 4  <-- 1 + 3
// ----------------------------------------------------------
//Modules
function User(){
	var username, password;

	function doLogin(user,pw) {
		username = user;
		password = pw;

		// do the rest of the login work
	}

	var publicAPI = {
		login: doLogin
	};

	return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( 'fred', '12Battery34!' );
