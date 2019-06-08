//Not sure how applicable Mixins and inherited Parasitic Inhertance are, now that there is 'extend'
/*Since JavaScript will not automatically copy behavior from Vehicle to Car,
we can instead create a utility that manually copies. Such a utility is often called extend(..) by many libraries/frameworks,
but we will call it mixin(..) here for illustrative purposes.*/

// For reference: you can declare a class like

function hi(){
	this.a = 'hi';
}
d = new hi();
console.log(d.a)
