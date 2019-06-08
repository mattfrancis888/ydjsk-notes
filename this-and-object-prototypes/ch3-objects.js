var idx;

if (wantA) {
	idx = "a";
}

// later

console.log( myObject[idx] ); // 2
// ----------------------------------------------------------
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
};

myObject["foobar"]; // hello
// ----------------------------------------------------------
var myArray = [ "foo", 42, "bar" ];

myArray.baz = "baz";
myArray.length;	// 3
myArray.baz;	// "baz"
// ----------------------------------------------------------
var myArray = [ "foo", 42, "bar" ];

myArray["3"] = "baz";

myArray.length;	// 4

myArray[3];

// ----------------------------------------------------------
//To shallow copy an object
myObject = {
  a:
}
var newObj = Object.assign( {}, myObject );

// ----------------------------------------------------------
//Object Property Descriptors (mutability of objects)
//Includes value, writable, enumerable, and configurable.

//writable property as false
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3;

myObject.a; // 2

var myObject = {
	a: 2
};

myObject.a = 3;
myObject.a;					// 3

// ----------------------------------------------------------
//configurable property as false (can modify value, but cnanot change properties!)

var myObject = {
	a: 2
};

myObject.a = 3;
myObject.a;					// 3


Object.defineProperty( myObject, "a", {
	value: 4,
	writable: true,
	configurable: false,	// not configurable!
	enumerable: true
} );

myObject.a;					// 4
myObject.a = 5;
myObject.a;					// 5

Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError

//Also prevents from using delete myObject.a; (used to remove object properties

// ----------------------------------------------------------
//enumerable as false

/*this characteristic controls if a property will show up in certain object-property enumerations,
such as the for..in loop.
Set to false to keep it from showing up in such enumerations, even though it's still completely accessible.
Set to true (default) to keep it present.*/

var obj = {};
Object.defineProperties(data, {
    set1: {enumerable: true},
    set2: {enumerable: false},
});
Object.keys(obj); // ["set1"]
Object.getOwnPropertyNames(obj); // ["set1", "set2"]

// ----------------------------------------------------------
//By combining writable:false and configurable:false,
//you can essentially create a constant (cannot be changed, redefined or deleted) as an object property, like:)
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} );

myObject.FAVORITE_NUMBER = 50
console.log(myObject.FAVORITE_NUMBER)
// ----------------------------------------------------------
//Preventing new properties from being added
var myObject = {
	a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined

// Using Seal
/* Object.seal(..) creates a "sealed" object, which means it takes an existing object and essentially calls Object.preventExtensions(..) on it,
but also marks all its existing properties as configurable:false.
So, not only can you not add any more properties,
but you also cannot reconfigure or delete any existing properties (though you can still modify their values). */

//Using Freeze

/*Object.freeze(..) creates a frozen object, which means it takes an existing object and essentially calls Object.seal(..) on it,
but it also marks all "data accessor" properties as writable:false, so that their values cannot be changed.*/

// ----------------------------------------------------------
//"Accessor Descriptor" (Getters and setters) (or get and put)

//Getter
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4

//Getter and Setter
var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

myObject.a; // 4


// ----------------------------------------------------------
// for in -gets property names
//for of - gets property values
// forEach - can only be used with arrays! also dosen't break/end until it iterates everything
// ----------------------------------------------------------
//There is a section that covers Iteration of properties  in an object step by step. I don't think it's useful. 
