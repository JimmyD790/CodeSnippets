function Animal(){
	this.species = "动物";
}

function Cat(name, color){
	this.name = name;
	this.color = color;
}

// 如何使"猫"继承"动物"呢？

/**
 1 构造函数绑定
 */
function Cat(name, color){ // 改写Cat构造函数
	//使用call或apply方法，将父对象的构造函数绑定在子对象上
	Animal.apply(this, arguments);
	this.name = name;
	this.color = color;
}
var cat1 = new Cat("大毛", "黄色");
alert(cat1.species); // 动物

/**
 2 prototype模式
 */

Cat.prototype = new Animal(); //Cat的prototype对象指向一个Animal的实例
/**
 在运行"Cat.prototype = new Animal();"这一行之后， >>
 >> cat1.constructor也指向Animal！
 alert(Cat.prototype.constructor == Animal); // true
 */
Cat.prototype.constructor = Cat;
//alert(Cat.prototype.constructor == Animal); // false
var cat1 = new Cat("大毛", "黄色");
alert(cat1.species); // 动物


/**
 即如果替换了prototype对象，
 */
MyObject.prototype = {};
/**
 那么，下一步必然是为新的prototype对象加上constructor属性，>>
 >> 并将这个属性指回原来的构造函数。
 */
MyObject.prototype.constructor = MyObject;

/**
 3 直接继承prototype
 */
function Animal(){}; // 改些Animal构造函数
Animal.prototype.species = "动物";

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
/**
 缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，>>
 >> 那么任何对Cat.prototype的修改，都会反映到Animal.prototype。
 */

 Cat.prototype.constructor = Cat; // 这一句实际上把 >>
 // >> Animal.prototype对象的constructor属性也改掉了！

/**
 # 4 利用空对象作为中介
 */
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
// 这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
alert(Animal.prototype.constructor); // Animal

// 这个extend函数，就是YUI库如何实现继承的方法。
function extend(Child, Parent) {
	var F = function(){};

	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;


	Child.uber = Parent.prototype; // 意思是为子对象设一个uber属性，>>
	// >> 这个属性直接指向父对象的prototype属性。
	/**
	 （uber是一个德语词，意思是"向上"、"上一层"。）
	 这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，
	 只是为了实现继承的完备性，纯属备用性质。
	 */
}

extend(Cat, Animal);
var cat1 = new Cat("大毛", "黄色");
alert(cat1.species); // 动物

/**
 # 5 拷贝继承
 */


function Animal() {};
Animal.prototype.species = "动物";

/**
 纯粹采用"拷贝"方法实现继承
 把父对象的所有属性和方法，拷贝进子对象
 */
function extend2(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;

	for(var i in p){
		c[i] = p[i];
	}

	c.uber = p;
}
extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物