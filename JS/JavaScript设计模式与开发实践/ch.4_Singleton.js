/**
 4.1 单例模式的基本实现
 */
var Singleton = function(name){
    this.name = name;
    this.instance = null;
};

Singleton.prototype.getName = function(){
    alert(this.name);
};

Singleton.getInstance = function(name){
    if(!this.instance){
    	this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
alert (a === b); // true

/**
 4.2 透明的单例模式

 使用自执行的匿名函数和闭包，用instance结合闭包来保存实例
 */
var CreateDiv = (function(){
	var instance;
	var CreateDiv = function(html){
		if(instance){
			return instance;
		}
		this.html = html;
		this.init();
		return instance = this;
	};

	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};

	return CreateDiv;
})();

var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');

alert(a === b);

/**
 4.3 用代理模式实现单例模式
 */
var CreateDiv = function(html){
	this.html = html;
	this.init();
}

CreateDiv.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
}
// 代理构造器函数，将CreateDiv的单例构造单独出来
var ProxySingletonCreateDiv = (function(){
	var instance;
	return function(html){
		if(!instance){
			instance = new CreateDiv(html);
		}
		return instance;
	}
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');

alert(a === b);
/**
 4.4 JavaScript中的单例模式
 4.1-4.3的例子都是机遇以类为中心思想的
 */

 // 利用全局变量当成单例模式；容易造成命名空间污染
var a = {};

/**
 4.4.1 使用命名空间较少全局变量的使用
 */
var namespace1 = {
	a: function(){
		alert(1);
	},
	b: function(){
		alert(2);
	}
}
// 动态创建命名空间
var MyApp = {};
MyApp.namespace = function(name){
	var parts = name.split('.');
	var current = MyApp;
	for (var i in parts){
		if(!current[parts[i]]){
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
};

MyApp.namespace('event');
MyApp.namespace('dom.style');
console.dir(MyApp);

//上述代码等价于
var MyApp = {
	event: {},
	dom: {
		style: {}
	}
};

/**
 4.4.2 使用闭包封装私有变量
 */
var user = (function(){
	var __name = 'sven',
		__age = 29;

	return {
		getUserInfo: function(){
			return __name + '-' + __age;
		}
	}
})();

/**
 4.5 惰性单例
 */
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
})();