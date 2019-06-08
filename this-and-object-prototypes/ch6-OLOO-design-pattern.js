//NOTE:skip chapter; OLOO is a deisgn pattern made by Kyle and is never used
//Class Theory (Already fammiliar with it)

/*
With classes, the way you design the scenario is: define a general parent (base) class like Task, defining shared behavior for all the "alike" tasks.
Then, you define child classes XYZ and ABC, both of which inherit from Task, and each of which adds specialized behavior to handle their respective tasks.
*/

//Delegation Theory (Known as OLOO)

 /* You will first define an object (not a class, nor a function as most JS'rs would lead you to believe) called Task,
and it will have concrete behavior on it that includes utility methods that various tasks can use (read: delegate to!). Then, for each task ("XYZ", "ABC"),
you define an object to hold that task-specific data/behavior.
You link your task-specific object(s) to the Task utility object, allowing them to delegate to it when they need to. */
var Task = {
	setID: function(ID) { this.id = ID; },
	outputID: function() { console.log( this.id ); }
};

// make `XYZ` delegate to `Task`
var XYZ = Object.create( Task );

XYZ.prepareTask = function(ID,Label) {
	this.setID( ID );
	this.label = Label;
};

XYZ.outputTaskDetails = function() {
	this.outputID();
	console.log( this.label );
};

// ABC = Object.create( Task );
// ABC ... = ...
