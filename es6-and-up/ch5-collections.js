TypedArray - able to have restricted data bit types (8 bit int, 16 bit int, etc)
You can have maps (a dictionary)

Use maps over objects when keys are unknown until run time, and when all keys are the same type and all values are the same type.
The iterability-in-order is a feature that has long been wanted by developers, in part because it ensures the same performance in all browsers. So to me that's a big one.
Use objects when there is logic that operates on individual elements.
Source(https://stackoverflow.com/questions/18541940/map-vs-object-in-javascript);

m.set( x, "foo" );
m.set( y, "bar" );
m.size;
m.delete( y );
//or
m.clear();


//You can clone the map like:

var m2 = new Map( m );


//Using get:
var x = { id: 1 },
	y = { id: 2 };

var m = new Map( [
	[ x, "foo" ],
	[ y, "bar" ]
] );

m.get( x );						// "foo"
m.get( y );						// "bar"

//entries() returns key + values; values() returns only values; keys() returns keys, use has() to determine if a map has a given key


// ----------------------------------------------------------
//Weakmaps, maps that are garbage collected but not iterable; srarely Used
var m = new WeakMap();

var x = { id: 1 },
	y = { id: 2 },
	z = { id: 3 },
	w = { id: 4 };

m.set( x, y );

x = null;						// { id: 1 } is GC-eligible
y = null;						// { id: 2 } is GC-eligible
								// only because { id: 1 } is

// ----------------------------------------------------------
//Set is a collection of unique values
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );
s.add( x );

s.size;							// 2

s.delete( y );
s.size;							// 1

s.clear();
s.size;	// 0

// ----------------------------------------------------------
//Weaksets, sets that are garbage collected but not iterable; skipped because  rarely Used
//Warning: WeakSet values must be objects, not primitive values as is allowed with sets.
var s = new WeakSet();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );

x = null;						// `x` is GC-eligible
y = null;						// `y` is GC-eligible
