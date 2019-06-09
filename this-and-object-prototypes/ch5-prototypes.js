//Say you have:
myObject.foo = "bar";

/* If a normal data accessor (see Chapter 3) property named foo is found anywhere higher on the [[Prototype]] chain,
and it's not marked as read-only (writable:false) then a new property called foo is added directly to myObject, resulting in a shadowed property.

If a foo is found higher on the [[Prototype]] chain, but it's marked as read-only (writable:false),
then both the setting of that existing property as well as the creation of the shadowed property on myObject are disallowed.
If the code is running in strict mode, an error will be thrown. Otherwise, the setting of the property value will silently be ignored.
Either way, no shadowing occurs.

If a foo is found higher on the [[Prototype]] chain and it's a setter (see Chapter 3), then the setter will always be called. No foo will be added to (aka, shadowed on) myObject, nor will the foo setter be redefined.*/

/* f you want to shadow foo in cases #2 and #3, you cannot use = assignment,
 but must instead use Object.defineProperty(..) (see Chapter 3) to add foo to myObject. */

// ----------------------------------------------------------
//Creating an object and incrementing.
//Avoid this and start doing anotherObject.prototype.a = 2
 var anotherObject = {
 	a: 2
 };

 var myObject = Object.create( anotherObject );

 anotherObject.a; // 2
 myObject.a; // 2

 anotherObject.hasOwnProperty( "a" ); // true
 myObject.hasOwnProperty( "a" ); // false

 myObject.a++; // oops, implicit shadowing!

 anotherObject.a; // 2
 myObject.a; // 3

 myObject.hasOwnProperty( "a" ); // true

// ----------------------------------------------------------

//Prototypal Inheritence: From : https://www.youtube.com/watch?v=qMO-LTOrJaE
//Use console.dir() to get prototype properties. Defined under __proto__
function Bear(type){
	this.type = type;
}

Bear.prototype.growl = function(){
	console.log('type of bear:', this.type);
}
function Grizzly(){
	Bear.call(this, 'griz'); //Without the line of code, this.type would be undefined; cannot use bind!! Bind creates a new funciton isntead of invoking like call
  //Basically saying 'Inherit Bear variables with my own values'
  console.log(this);
}
Grizzly.prototype = Object.create(Bear.prototype); //Inherits Bear prototypes/methods'; create new object based on Bear prototype

let grizzly = new Grizzly();
grizzly.growl();


//Another video that explains  Object.create : https://www.youtube.com/watch?v=qqyZn8X9M3I

//Here's why Kyle recommends to use Object.create() always rather than only uing new Class();
function Bear(type){
    this.type = type;
    Bear.count++;
}
Bear.count = 0;

new Bear('black');
Bear.count; // 1


function Grizzly(){
  Bear.call(this, 'griz') // simulates super()
}

Grizzly.prototype = Object.create(Bear.prototype); //Delete this and watch what happens to grizzly count
grizzly = new Grizzly();
console.log(grizzly.count)
// ----------------------------------------------------------

//Dont' use  Child.prototype = `new ParentClass()`

/*Bar.prototype = new Foo() does in fact create a new object which is duly linked to Foo.prototype as we'd want.
 But, it uses the Foo(..) "constructor call" to do it. If that function has any side-effects
  (such as logging, changing state, registering against other objects, adding data properties to this, etc.),
   those side-effects happen at the time of this linking (and likely against the wrong object!), */

   /* So, we're left with using Object.create(..) to make a new object that's properly linked, but without having the side-effects of calling Foo(..). The slight downside is that we have to create a new object,
   throwing the old one away, instead of modifying the existing default object we're provided.*/


   // pre-ES6
   // throws away default existing `Bar.prototype`
   Bar.prototype = Object.create( Foo.prototype );

   // ES6+
   // modifies existing `Bar.prototype`
   Object.setPrototypeOf( Bar.prototype, Foo.prototype );
   //Significantly slower, avoid and use Object.create();
// ----------------------------------------------------------
//basicaly a functioning instanceof; we don't use instanceof because it gives TypeErrors when comparing
Grizzly.isPrototypeOf(Bear) // false
var Panda = {
    // some properties
}
var b = Object.create(Panda);
console.log(Panda.isPrototypeOf(b)); // true

//or
let grizzly = new Grizzly();
console.log(Object.getPrototypeOf( grizzly ) === Grizzly.prototype)

//or
console.log(grizzly.__proto__ === Grizzly.prototype)

// ----------------------------------------------------------
//Writing an API like this:
var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};

var myObject = Object.create( anotherObject );

myObject.doCool = function() {
	this.cool(); // internal delegation!
};

myObject.doCool(); // "cool!"
//Is better than:
var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};

var myObject = Object.create( anotherObject );

myObject.cool(); // "cool!"

//The reason is because, you are not using the method from myObject
