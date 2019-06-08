//Implicit Binding

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2


//BUT THIS CAN HAPPEN: Implicity lost; 'this'  is lost

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
// ----------------------------------------------------------
//Explicit Binding
//if you want to force a function call to use a particular object for the 'this' binding,
// without putting a property function reference on the object
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
// ----------------------------------------------------------
//Explicit hard Binding

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2

// ----------------------------------------------------------

//Explicit Hard Binding with 'apply'! 'apply' is usefull because you can put an array as an argument
//'apply' is useless now becasue of ,..., the spread operator. Eg;

var args = [3,3];
foo.apply(obj, args);
// is the same as
foo.call(obj, ...args);

/* And becasue of: function theFunction(name, profession) {
    console.log("My name is " + name + " and I am a " + profession +".");
}

theFunction.apply(undefined, ["Susan", "school teacher"]);
theFunction.call(undefined, "Claude", "mathematician");`

*/
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5

//Another example of hard binding
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments ); //can only pass arguments, no arguments[0],[1]
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5

// ----------------------------------------------------------
//Using bind
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5

//SO post to clarify the dfferences: https://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind
// ----------------------------------------------------------
//Using contexts to avoind 'bind'
function foo(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome

function foo(something) {
	this.a = something;
}
// ----------------------------------------------------------
//'new' keyword
var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3


//Summary of THIS - self explanotry


/*
1. Is the function called with new (new binding)? If so, this is the newly constructed object.
eg ; var bar = new foo()

2. Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.
eg; var bar = foo.call( obj2 )

3. Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.
eg; var bar = obj1.foo()

4. Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise pick the global object.
eg ;var bar = foo()

*/

// ----------------------------------------------------------
//Binding exceptions
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null,2 );
bar(3);

//or
var bar = foo.bind( null);
bar( 2,3 ); // a:2, b:3


// ----------------------------------------------------------
//Arrow functions and bind
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 ).call( obj2 ); // 2, not 3!

//Common use case. Used in setTimeOuts :

function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
