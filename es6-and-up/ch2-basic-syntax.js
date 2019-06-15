//Covers basics: let (where var is functio scoped, let is block scoped), const, scopes, spreads operator (..), destructuring, symbols,etc
//Try the if (something) block of code

// ----------------------------------------------------------
//spread
function foo(x, y, z){
  console.log(x, y, z);
}

foo(...[1,2,3]); //splits it up

//Another example
var  a = [2,3,4];
var b = [1, ...a, 5];
console.log(b)

//... can  also be seen as 'gathering a set of values together into an array' instead of 'spreading a value out'
function foo(x, y ...z){ //becomes an array
  console,log(x, y, z);
}
foo(1, 2, 3, 4, 5); //1 is x; 2 is y; 3,4,5 are z

function foo(...args){ //becomes an array
  console.log(args); // NOTE: if you do ...args; it will slice it up again to 1,2,3,4,5
}

foo(1,2,3,4,5) //gathers everything
// ----------------------------------------------------------
//Old way of default parameters:
function foo(x,y) {
	x = x || 11;
	y = y || 31;

	console.log( x + y );
}

foo();				// 42

//Can be dangerous, if you do:
foo (0, 42);
//Why? Because the - is falsy, and so x || 11 results in 11.

//Another way is to (Problem is when you actually have an undefined var):
function foo(x, y){
   x = ( x!== undefined) ? x : 11;
   y = (y !== undefined) ? y : 31;
   console.log( x + y);
}

foo(0, 42); //42
foo(undefined, 6); //Where the problem is 17

//Use ES6 default param instead
function foo (a = 3){
   //....
} //a defaullt value is 3

//Default values can also be a function call like a = bar(3)
function bar(val) {
	console.log( "bar called!" );
	return y + val;
}

function foo(x = y + 3, z = bar( x )) {
	console.log( x, z );
}
var y = 5;
foo();								// "bar called"
									// 8 13
//CAREFULL WHEN DOING:
var w = 1, z = 2;

function foo( x = w + 1, y = x + 1, z = z + 1 ) {
	console.log( x, y, z );
}

foo();
// ----------------------------------------------------------
//Destructuring

function foo() {
	return [1,2,3];
}

//var tmp = foo(),
	//a = tmp[0], b = tmp[1], c = tmp[2];

function bar() {
	return {
		x: 4,
		y: 5,
		z: 6
	};
}
//var tmp = bar(),
	//x = tmp.x, y = tmp.y, z = tmp.z;

var [ a, b, c ] = foo();
var { x: x, y: y, z: z } = bar();

console.log( a, b, c );				// 1 2 3
console.log( x, y, z );				// 4 5 6

//And you can change names by:
var { x: bam, y: baz, z: bap } = bar(); //x becomes bam

console.log( bam, baz, bap );		// 4 5 6
console.log( x, y, z );				// ReferenceError


//Destructuing can also have defaukt params:
var [ a = 3, b = 6, c = 9, d = 12 ] = [1,2];
console.log(c);

//Nested destructuring:
var a1 = [ 1, [2, 3, 4], 5 ];
var o1 = { x: { y: { z: 6 } } };

var [ a, [ b, c, d ], e ] = a1;
var { x: { y: { z: w } } } = o1;

console.log( a, b, c, d, e );		// 1 2 3 4 5

//Important!: You can destrucutre using parameters like:
function foo( { x, y } ) {
	console.log( x, y );
}

foo( { y: 1, x: 2 } );
//More info here: https://www.youtube.com/watch?v=-vR3a11Wzt0
//Kyle talks more about it;  don't think its going to be Used
// ----------------------------------------------------------
//Object Literal Extensions

var x = 2, y = 3,
	o = {
		x: x,
		y: y
	};

  //becomes

  var x = 2, y = 3,
	o = {
		x,
		y
	};

// ----------------------------------------------------------
//Concise methods

  var o = {
	x: function(){
		// ..
	},
	y: function(){
		// ..
	}
}

//becomes

var o = {
	x() {
		// ..
	},
	y() {
		// ..
	}
}
// ----------------------------------------------------------
// ES5 Getter/Setter (Kyle said transpilers dont support it well, so avoid using it)

//declare an object
rectangle = {
   x: 10,
   y: 20,
   get area() { return this.x * this.y }  //won't occupy storage
}

//usage
console.log('the area is', rectangle.area)

//vs

rectangle = {
   x: 10,
   y: 20,
   area: function(){
    return this.x * this.y
   }  //won't occupy storage
}

//usage
console.log('the area is', rectangle.area())
// ----------------------------------------------------------
//Property Names

//Normally you have somehting like:
var prefix = "user_";

var o = {
	baz: function(..){ .. }
};

o[ prefix + "foo" ] = function(..){ .. };
o[ prefix + "bar" ] = function(..){ .. };

// ----------------------------------------------------------
//Super() keyword
var o1 = {
	foo() {
		console.log( "o1:foo" );
	}
};

var o2 = {
	foo() {
		super.foo();
		console.log( "o2:foo" );
	}
};

Object.setPrototypeOf( o2, o1 );

o2.foo();

// ----------------------------------------------------------
//Template literals
var name = "Kyle";

var greeting = "Hello " + name + "!";

console.log( greeting );			// "Hello Kyle!"

//vs

var name = "Kyle";

var greeting = `Hello ${name}!`; //One really nice benefit of interpolated string literals is they are allowed to split across multiple lines!!

console.log( greeting );			// "Hello Kyle!"


//You could even do function calls:

function upper(s) {
	return s.toUpperCase();
}

var who = "reader";

var text =
`A very ${upper( "warm" )} welcome
to all of you ${upper( `${who}s` )}!`;

console.log( text );
// A very WARM welcome
// to all of you READERS!


//And finally

//Tag string literals (Probably won't be used alot)
function foo(strings, ...values) {
	console.log( strings );
	console.log( values );
}

var desc = "awesome";

foo`Everything is ${desc}!`; //String is string, values is the variable
// [ "Everything is ", "!"]
// [ "awesome" ]

// ----------------------------------------------------------


//But know that in arrays, for in gives:
var a = ["a","b","c","d","e"];

for (var idx in a) {
	console.log( idx );
}

// 0 1 2 3 4

for (var val of a) {
	console.log( val );
}
// "a" , "b", etc

//for of and for in; check out more in https://alligator.io/js/for-of-for-in-loops/



//Iterating an object in for in:
for (let key in oldCar) {
  console.log(`${key} --> ${oldCar[key]}`);
}

//Iterating object in for of:
for(let [key,value] of a){
  console.log(key, value);
}

//For each: only used for arrays to get value of array
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"

//Pre es6 of using for loops
var a = ["a","b","c","d","e"],
	k = Object.keys( a );

for (var val, i = 0; i < k.length; i++) {
	val = a[ k[i] ];
	console.log( val );
}
// "a" "b" "c" "d" "e"
// ----------------------------------------------------------
//Note: I ignored the REGEX features like sticky and flags; Unicode,
// ----------------------------------------------------------
//Symbols (Skipped, symbols are rarely used; most common use if you for soem reaso n want to have a simmilar obj property name with an existing one, you would use a symbol)
var sym = Symbol( "some optional description" );
sym.toString();		// "Symbol(some optional description)"
