/**
 * Link: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 */
/**
 * Basic
 */

/**
 Anonymous Closures 匿名闭包
 */
(function () {
	// ... all vars and functions are in this scope only
	// still maintains access to all globlas
}());

/**
 Global Import
 */
(function ($, YAHOO) {
	// now have access to globals jQuery (as $) and YAHOO in this code
}(jQuery, YAHOO));

/**
 Module Import
 */

// declarea a global module named MODULE
var MODULE = (function () {
	var my = {};
	var privateVariable = 1; // this is a private property

	function privateMethod() {
		// ...
	}

	my.moduleProperty = 1; // a public properties
	my.moduleMethod = function () { // a public method
		//...
	};

	return my;
}());

/**
 Advanced Patterns
 */

/**
 Arguments 模块放大
 可以多文件封装模块(将不同功能封装到不同文件上)
 */
var MODULE = (function (my) {
	my.anotherMethod = function () {
		// addded method...
	};

	return my;
}(MODULE));

/**
 Loose Arguments 
 */
var MODULE = (function (my) {
	// add capablities

	return my;
}(MODULE || {})); // the import will create if it does not already exist

/**
 Tight Arguments
 */
var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;

	my.moduleMethod = function () {
		//method override, has access to old through old_moduleMethod
	};

	return my;
}(MODULE));

/**
 Cloning and Inheritance
 */
var MODULE_TWO = (function (old) {
	var my = {},
	var key;

	for (key in old) {
		if(old.hasOwnProperty(key)) {
			my[key] = old[key];
		}
	}

	var super_moduleMethod = old.moduleMethod;
	my.moduleMethod = function () {
		// override method on the clone, access to super through super_moduleMethod
	};

	return my;
}(MODULE));

/**
 Cross-File Private State

 One severe limitation of splitting a module across multiple files is >>
 >> that each file maintains its own private state, 
 and does not get access to the private state of the other files
 将模块分散在不同文件的限制是每个文件会保持自己的私有状态（？），而不能读取其它>>
 >> 文件的状态

 */
var MODULE = (function (my) {
	var _private = my._private = my._private || {};
	var _seal = my._seal = my._seal || function () {
		delete my._private;
		delete my._seal;
		delete my._unseal;
	};
	var _unseal = my._unseal = my._unseal || function () {
		my._private = _private;
		my._seal = _seal;
		my._unseal = _unseal;
	};
	// permanent access to _private, _seal, and _unseal

	return my;
}(MODULE || {}));

/**
 Sub-modues
 */
MODULE.sub = (function () {
	var my = {};
	//...
	return my;
}());

/**
 Conclusions
 */
var UTIL = (function (parent, $) {
	var my = parent.ajax = parent.ajax || {};

	my.get = function (url , params, callback) {
		// ok, 
		return $.getJSON(url, params, callback);
	};

	// etc...

	return parent;
}(UTIL || {}, jQuery)) ;