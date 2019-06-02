let a = 'hello world';
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
function foo() {
	var a = 1;

	function bar() {
		var b = 2;

		function baz() {
			var c = 3;

			console.log( a, b, c );	// 1 2 3
		}

		baz();
		console.log( a, b );		// 1 2
	}

	bar();
	console.log('final', a,b,c );				// 1
}

foo();
