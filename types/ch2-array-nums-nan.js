//Be careful about creating "sparse" arrays (leaving or creating empty/missing slots):
var a = [ ];

a[0] = 1;
// no `a[1]` slot set here
a[2] = [ 3 ];

a[1];		// undefined

a.length;	// 3

//Arrays also have a weird object + property behavior like:
var a = [ ];

a[0] = 1;
a["foobar"] = 2;

a.length;		// 1
a["foobar"];	// 2
a.foobar;		// 2
// ----------------------------------------------------------
//Strings aree immutable
//You cannot change a character within a string with something like var myString = "abbdef"; myString[2] = 'c'


//Arra prototype methods to alter strings:
var a = 'foo';
var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
	return v.toUpperCase() + ".";
} ).join( "" );

c;				// "f-o-o"
d;				// "F.O.O."


//Revering a string: (Only arrays can use reverse())
var c = a
	// split `a` into an array of characters
	.split( "" )
	// reverse the array of characters
	.reverse()
	// join the array of characters back to a string
	.join( "" );

//Note:his approach doesn't work for strings with complex (unicode) characters in them (astral symbols, multibyte characters, etc.).
//You need more sophisticated library utilities that are unicode-aware for such operations to be handled accurately.


// ----------------------------------------------------------
//Numbers
var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"


//And

//Based on  digits after .
var a = 42.59;
a.toFixed( 0 ); // "43"
a.toFixed( 1 );  // 42.6

a.toPrecision( 2 ); // "43"

//You dont have to use a variable. Eg;
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"

//And
0.1 + 0.2 === 0.3; // false
/*Simply put, the representations for 0.1 and 0.2 in binary floating-point are not exact,
so when they are added, the result is not exactly 0.3. It's really close: 0.30000000000000004, but if your comparison fails, "close" is irrelevant.*/

/*As of ES6, Number.EPSILON is predefined with this tolerance value, so you'd want to use it, but you can safely polyfill the definition for pre-ES6: */

//And
Number.isInteger( 42 );		// true
Number.isInteger( 42.000 );	// true
Number.isInteger( 42.3 );	// false

// ----------------------------------------------------------
//NaN - not a number

var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- phew!

// ----------------------------------------------------------
//Skipped some material deemed to be too unique
// ----------------------------------------------------------
//References and variables
//Simple values/Scalar Primitives (string, boolean, int, etc) can be owned by variables
//Array is a `compound value`; no variable owns it.
var a = 2;
var b = a; // `b` is always a copy of the value in `a`
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // `d` is a reference to the shared `[1,2,3]` value
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]

var a = [1,2,3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]

// later
b = [4,5,6];
a; // [1,2,3]
b; // [4,5,6]

// ----------------------------------------------------------
//Another cofusion that can occur regarding array refferences
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [1,2,3,4]  not  [4,5,6,7]

//To fix it;
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x.length = 0; // empty existing array in-place
	x.push( 4, 5, 6, 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [4,5,6,7]  not  [1,2,3,4]

// ----------------------------------------------------------
//Expanding on scalar primitives
function foo(wrapper) {
	wrapper.a = 42;
}

var obj = {
	a: 2
};

foo( obj );

obj.a; // 42

//Final note:
function foo(x) {
	x = x + 1;
	x; // 3
}

var a = 2;
var b = new Number( a ); // or equivalently `Object(a)`

foo( b );
console.log( b ); // 2, not 3

//You can add properties on top of the Number object (just not change its inner primitive value), so you could exchange information indirectly via those additional properties.
//Using the example with obj is better rather than this
