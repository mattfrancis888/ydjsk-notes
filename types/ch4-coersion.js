//recall
var b = a + "";			// implicit coercion

var c = String( a );	// explicit coercion
// ----------------------------------------------------------
//When obj is an array like [1,2,3] then .toString() gives: "1,2,3"
//JSON.stringify([1,2,3]):  "[1,2,3]"
// ----------------------------------------------------------
//Using toJSON
/* It's a very common misconception that toJSON() should return a JSON stringification representation.
That's probably incorrect, unless you're wanting to actually stringify the string itself (usually not!).
toJSON() should return the actual regular value (of whatever type) that's appropriate, and JSON.stringify(..) itself will handle the stringification. */
var a = {
	val: [1,2,3],

	// probably correct!
	toJSON: function(){
		return this.val.slice( 1 );
	}
};

var b = {
	val: [1,2,3],

	// probably incorrect!
	toJSON: function(){
		return "[" +
			this.val.slice( 1 ).join() +
		"]";
	}
};

JSON.stringify( a ); // "[2,3]"

JSON.stringify( b ); // ""[2,3]""
// ----------------------------------------------------------
//Second parameter of JSON.stringify, called a 'replacer
//providing a filtering mechanism for which properties should and should not be included

//If replacer is an array, it should be an array of strings, each of which will specify a
//property name that is allowed to be included in the serialization of the object. If a property exists that isn't in this list, it will be skipped.'
var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"

//If replacer is a function
JSON.stringify( a, function(k,v){ //k is key, v is value
	if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"
// ----------------------------------------------------------
//A third optional argument can also be passed to JSON.stringify(..)

var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, null, 3 );
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"

JSON.stringify( a, null, "-----" );
// "{
// -----"b": 42,
// -----"c": "42",
// -----"d": [
// ----------1,
// ----------2,
// ----------3
// -----]
// }"


//NOT DONE THIS CHAPTER!!
