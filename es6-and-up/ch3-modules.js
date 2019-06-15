//Skipped Iterators and generators; very rarely used
// ----------------------------------------------------------
//Modules:
//Old way:
function Hello(name) {
	function greeting() {
		console.log( "Hello " + name + "!" );
	}

	// public API
	return {
		greeting: greeting
	};
}

var me = Hello( "Kyle" );
me.greeting();

//With a singleton
var me = (function Hello(name){
	function greeting() {
		console.log( "Hello " + name + "!" );
	}

	// public API
	return {
		greeting: greeting
	};
})( "Kyle" );

me.greeting();

// ----------------------------------------------------------
//Export and Import (https://stackoverflow.com/questions/33611812/export-const-vs-export-default-in-es6)
//Note: all exports must be declared uptop!

//Named exports: (When importing, you have to import the name!)
export function foo() {
	// ..
}

export var awesome = 42;

var bar = [1,2,3];
export { bar };


// or
function foo() {
	// ..
}

var awesome = 42;
var bar = [1,2,3];

export { foo, awesome, bar };
// ex. importing multiple exports:
import { MyClass, MyOtherClass } from "./MyClass";
// ex. giving a named import a different name by using "as":
import { MyClass2 as MyClass2Alias } from "./MyClass2";
//// ----------------------------------------------------------

//You cane also rename imports like:
export { foo as bar };

//Also keep in mind:

var awesome = 42;
export { awesome };

// later
awesome = 100;

//Will always get 100 when imported
// ----------------------------------------------------------

//Using export default; when you import it, it could be any name (You can have one default export per file)
function foo(..) {
	// ..
}

export default foo;
import MyDefaultExport from "./MyFileWithADefaultExport";

//You can do this too:
export { foo as default};
import foo from "foo";
// or:
import { default as foo } from "foo";

// NOTE: you can import defaults wth named imports too (Kyle says to avoid it because it can cause conflicts somehow):


//You can rename imports too:
import { foo as theFooFunc } from "foo";

// ----------------------------------------------------------
//Classes
class Foo {
	constructor(a,b) {
		this.x = a;
		this.y = b;
	}

	gimmeXY() {
		return this.x * this.y;
	}
}

//is simmilar to:
function Foo(a,b) {
	this.x = a;
	this.y = b;
}

Foo.prototype.gimmeXY = function() {
	return this.x * this.y;
}


//Super keyword
class Bar extends Foo {
	constructor(a,b,c) {
		super( a, b );
		this.z = c;
	}

	gimmeXYZ() {
		return super.gimmeXY() * this.z;
	}
}

var b = new Bar( 5, 15, 25 );

b.x;						// 5
b.y;						// 15
b.z;						// 25
b.gimmeXYZ();



//Extending with classes:
function Foo() {
	this.a = 1;
}

function Bar() {
	this.b = 2;
	Foo.call( this );
}

// `Bar` "extends" `Foo`
Bar.prototype = Object.create( Foo.prototype );

//Is the same as

class Foo {
	constructor() { this.a = 1; }
}

class Bar extends Foo {
	constructor() {
		this.b = 2;			// not allowed before `super()`
		super();			// to fix swap these two statements
	}
}

//Why?: in a constructor of a subclass, you cannot access this until super(..) has been called.
//The reason is nuanced and complicated, but it boils down to the fact that the parent constructor is actually the one creating/initializing your instance's this.

//Another benefit of classes is extending natives
class MyCoolArray extends Array {
	first() { return this[0]; }
	last() { return this[this.length - 1]; }
}

var a = new MyCoolArray( 1, 2, 3 );

a.length;					// 3
a;							// [1,2,3]

a.first();					// 1
a.last();

//You can have static methods in classes!

//I didn't cover new.target and Symbol.species! DIdn't think it was applicable
