/**
 # 1 生成实例对象的原始模式
 */
var Cat = {
	name : '',
	color : ''
}

var cat1 = {};
cat1.name = "大毛"; 
cat1.color = " 黄色";

var cat2 = {};
cat2.name = "二毛";
cat2.color = "黑色";
// 实例cat1、cat2和原型Cat之间，没有任何办法可以看出有什么联系

/**
 # 2 原始模式的改进
 */
function Cat(name, color) {
	return {
		name : name,
		color : color
	}
}

var cat1 = Cat("大毛", "黄色");
var cat2 = Cat("二毛", "黑色");
// cat1和cat2没有内在的联系，不能反映出它们是同一个原型对象的实例

/**
 # 3  构造函数模式
 */
/** 
 所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。
 对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。
 */
function Cat(name, color){
	this.name = name;
	this.color = color;
}

var cat1 = new Cat("大毛", "黄色");
var cat2 = new Cat("二毛", "黑色");
alert(cat1.name);
alert(cat1.color);

// 这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。
alert(cat1.constructor == Cat); // true
alert(cat1.constructor == Cat); // true

// Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系。
alert(cat1 instanceof Cat); // true
alert(cat2 instanceof Cat); // true

/**
 # 4 构造模式的问题
 */
function Cat(name, color){
	this.name = name;
	this.color = color;
	this.type = "猫科动物";
	this.eat = function(){
		alert("吃老鼠");
	}
}

var cat1 = new Cat("大毛", "黄色");
var cat2 = new Cat("二毛", "黑色");
/**
 对于每一个实例对象，type属性和eat()方法都是一模一样的内容，>>
 >> 每一次生成一个实例，都必须为重复的内容，多占用一些内存。
 这样既不环保，也缺乏效率。
 */
alert(cat1.type); // 猫科动物
alert(cat1.eat()); // 吃老鼠
alert(cat1.eat == cat2.eat); // false

/**
 # 5 Prototype模式
 */
function Cat(name, color){
	this.name = name;
	this.color = color;
}
Cat.prototype.type = "猫科动物";
Cat.prototype.eat = function() {
	alert("吃老鼠");
};

var cat1 = new Cat("大毛", "黄色");
var cat2 = new Cat("二毛", "黑色");
alert(cat1.type); // 猫科动物
alert(cat1.eat()); // 吃老鼠
alert(cat1.eat == cat2.eat); // true

/**
 # 6 Prototype原型的验证方法
 */
// isPrototypeOf()
// 这个方法用来判断，某个proptotype对象和某个实例之间的关系。
alert(Cat.prototype.isPrototypeOf(cat1)); //true
alert(Cat.prototype.isPrototypeOf(cat2)); //true

// hasOwnProperty()
// in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
alert("name" in cat1); // true
alert("type" in cat1); // true

//in运算符
//in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
alert("name" in cat1); // true
alert("type" in cat1); // true
//in运算符还可以用来遍历某个对象的所有属性。
for( var prop in cat1) {
	alert("cat1[" + prop "]=" + cat1[prop]);
}
