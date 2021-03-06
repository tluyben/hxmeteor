// Generated by Haxe 3.4.0
(function () { "use strict";
var Client = function() { };
Client.main = function() {
	Shared.init();
	startup_AccountsConfig.init();
	ui_Task.init();
	Template.body.onCreated(function() {
		Session.set("hideCompleted",false);
		Meteor.subscribe("tasks");
	});
	Template.body.helpers({ tasks : function() {
		Template.instance();
		if(Session.get("hideCompleted")) {
			return model_Tasks.collection.find({ checked : { '$ne' : true}},{ sort : { createdAt : -1}});
		}
		return model_Tasks.collection.find({ },{ sort : { createdAt : -1}});
	}, incompleteCount : function() {
		return model_Tasks.collection.find({ checked : { '$ne' : true}}).count();
	}});
	Template.body.events({ 'submit .new-task' : function(event) {
		event.preventDefault();
		var target = event.target;
		Meteor.call("tasks.insert",target.text.value);
		target.text.value = "";
	}, 'change .hide-completed input' : function(event1) {
		Session.set("hideCompleted",event1.target.checked);
		Session.get("hideCompleted");
	}});
};
var Shared = function() { };
Shared.init = function() {
	model_Tasks.init();
};
var model_Tasks = function() { };
model_Tasks.init = function() {
	model_Tasks.collection = new Mongo.Collection("Tasks");
};
var startup_AccountsConfig = function() { };
startup_AccountsConfig.init = function() {
	Accounts.ui.config({ passwordSignupFields : "USERNAME_ONLY"});
};
var ui_Task = function() { };
ui_Task.init = function() {
	Template["task"].helpers({ isOwner : function() {
		var _owner = this.owner;
		return _owner == Meteor.userId();
	}});
	Template["task"].events({ 'click .toggle-checked' : function(event) {
		var isChecked = event.target.checked;
		Meteor.call("tasks.setChecked",this._id,isChecked);
	}, 'click .delete' : function() {
		Meteor.call("tasks.remove",this._id);
	}, 'click .toggle-private' : function() {
		var _private = this.private;
		Meteor.call("tasks.setPrivate",this._id,!_private);
	}});
};
Client.main();
})();
