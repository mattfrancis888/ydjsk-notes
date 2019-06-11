//Links that are helpful for promises:
//https://www.youtube.com/watch?v=DHvZLI7Db8E&t=564s
//promis chaining (return the output  in `then(..)` if you want to chain )
//https://javascript.info/promise-chaining
////https://www.youtube.com/watch?v=V_Kr9OSfDeU


//Not sure what 'Duck typing' works.

//Promisses address the issues made by callback (Check issues made by callback in the last chapter). (I have no idea how, but it does)

// ----------------------------------------------------------
//Sometimes with promises, this could happen:
var p3 = new Promise( function(resolve,reject){
	resolve( "B" );
} );

var p1 = new Promise( function(resolve,reject){
	resolve( p3 );
} );

var p2 = new Promise( function(resolve,reject){
	resolve( "A" );
} );

p1.then( function(v){
	console.log( v );
} );

p2.then( function(v){
	console.log( v );
} );

// A B  <-- not  B A  as you might expect

//To avoid such nuanced nightmares, you should never rely on anything about the ordering/scheduling of callbacks across Promises.
//In fact, a good practice is not to code in such a way where the ordering of multiple callbacks matters at all. Avoid that if you can.

// ----------------------------------------------------------
//If at any point in the creation of a Promise, or in the observation of its resolution, a JS exception error occurs,
//such as a TypeError or ReferenceError, that exception will be caught, and it will force the Promise in question to become rejected.

var p = new Promise( function(resolve,reject){
	foo.bar();	// `foo` is not defined, so error!
	resolve( 42 );	// never gets here :(
} );

p.then(
	function fulfilled(){
		// never gets here :(
	},
	function rejected(err){
		// `err` will be a `TypeError` exception object
		// from the `foo.bar()` line.
	}
);


//Promise.resolve('returnValue') and return returnValue is the same
https://stackoverflow.com/questions/27715275/whats-the-difference-between-returning-value-or-promise-resolve-from-then

new Promise(function(res, rej) {
    res("aaa");
  })
  .then(function(result) {
    return "bbb";
  })
  .then(function(result) {
    console.log(result);
  });

  //vs

  new Promise(function(res, rej) {
    res("aaa");
  })
  .then(function(result) {
    return Promise.resolve("bbb");
  })
  .then(function(result) {
    console.log(result);
  });

  //Don't worry what Kyle said

  //I didn't cpver the rest because I already know it and it dosen't seem to be benefiicla to read trough it; maybe give it a read in the future to cover everything
