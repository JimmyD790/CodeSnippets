/**
 # 1 什么是“非构造函数”的继承
 */


var Chinese = {
	nation: '中国'
};

var Doctor = {
	career: '医生'
}

/**
 Chinese和Doctor都是普通对象，如何让“医生”去继承“中国人”？
 */

/**
 # 2 object()方法
 */
function object(o) {
	function F() {}
	F.prototype = o; // 把子对象的prototype属性，指向父对象
	return new F(); // 返回
}

var Doctor = object(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); //中国

/**
 # 3 浅拷贝
 */
function extendCopy(p) {
	var c = {};

	for (var i in p) {
		c[i] = p[i];
	}

	c.uber = p;

	return c;
}

var Doctor = extendCopy(Chinese);
Doctor.carrer = '医生';
alert(Doctor.nation); // 中国

// Situation
Chinese.birthPlaces = ['北京','上海','香港'];

var Doctor = extendCopy(Chinese);
Doctor.birthPlaces.push('厦门');

alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
/* 
 子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能
 */
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门

/**
 ＃ 4 深拷贝
 */

function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
		if (typeof p[i] == 'object') {
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i]
		}
	}
	return c;
}

var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港