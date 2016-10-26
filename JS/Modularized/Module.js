/**
 * Reference
 */
/**
 #1 原始写法 
 缺点： 
 － “污染”了全局变量，
 － 无法保证不发生变量名冲突
 － 不能表示模块成员之间的直接关系
 */
function module1 () {
	// ...
}

function module2 () {
	// ...
}

/*
 #2 对象写法
 缺点：
 内部模块成员会被暴露，
 */

var module1 = new Object({
	_count : 0,
	m1 : function (){
		//...
	},
	m2 : function (){
		//...
	}
});

module1.m1();

module1._count = 5; //内部状态被暴露

/*
 #3 立即执行函数写法(Immediately-Invoked Function Expression)
 */
 var module1 = (function(){
 	var _count = 0;

 	var m1 = function(){
 		//...
 	};

 	var m2 = function(){
 		// ...
 	};

 	return {
 		m1 : m1,
 		m2 : m2
 	}
 });

 console.info(module1._count); //undefined, 无法读取内部变量

 /*
  #4 放大模式
  */

 var module1 = (function (mod){
 	mod.m3 = function () {
 		//...
 	};

 	return mod;
 })(module1);

 /*
  #5 宽放大模式 Loose augmentation
  */
 var module1 = (function(mod){
 	//...
 	return mod;
 })(window.module || {});

 /* 
  #6 输入全局变量
  */
 var module1 = (function ($, YAHOO) {
 	//....
 })(jQuery, YAHOO);

