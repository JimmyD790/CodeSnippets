/**
 * 普通的一个“类”
 */
function Person(name){
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

var reader = new Person('John Smith');
reader.getName();

/**
 * Author继承Person
 * 1. 调用父类的构造器
 * 2. 设置父类原型链
 * 3. 将Author原型的构造器属性(constructor)重设为Author
 */
function Author(name, books) {
    Person.call(this, name); //在当前的作用域中调用父类构造器
    this.books = books; // 添加books属性
}

Author.prototype = new Person(); // 设置原型链
Author.prototype.constructor = Author; // 设置构造器属性
Author.prototype.getBooks = function() { // 添加方法
    return this.books;
}

/**
 * 创建实例并使用
 */
var author = [];
author[0] = new Author('Dustin Diaz', ['JavaScript Design Patterns']);
author[1] = new Author('Ross Harmes', ['JavaScript Design Patterns']);

author[1].getNames();
author[1].getBooks();
/*===================================================================*/
/**
 * 为简化继承创建的extend函数
 */
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}
/**
 * 利用新的extend函数定义Person和Author
 * 在类声明之后，向prototype添加方法之前，立即调用extend函数
 * 唯一的问题是，超类(Person)的名称被固化在Author类的声明中
 * -- Person.call(this, name);
 */
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

function Author(name, books) {
    Person.call(this, name);
    this.books = books;
}
extend(Author, Person);

Author.prototype.getBooks = function() {
    return this.books;
}
/*===================================================================*/
/**
 * 通过superclass属性来弱化Author和Person之间的耦合
 */
function extend(subClass, superClass) {
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.constructor = subClass;
    
    subClass.superclass = superClass.prototype; // 通过superclass属性来弱化Author和Person之间的耦合
    if(superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

function Author(name, books) {
    Author.superclass.constructor.call(this.name);
    this.books = books;
}
extend(Author, Person);

Author.prototype.getBooks = function() {
    return this.books;
}

/*===================================================================*/

/**
 * 原型式继承
 */
var Person = {
    name: 'default name',
    getName: function() {
        return this.name;
    }
};
var reader = clone(Person);
alert(reader.getName()); // 输出'Default name'
reader.name = 'John Smith';
alert(reader.getName()); // 输出'John Smith'

/**
 * 原型继承的读写不对等
 * 
 * 当读取对象的值时，会沿着原型链读取
 *
 * 可使用hasOwnProperty方法来区分对象的实际成员和它继承而来的成员
 * 
 */
var authorClone = clone(Author);
alert(authorClone.name); // 这里连接到的是 Person.name, 输出'default name'

authorClone.name = 'new name'; // authorClone添加新的属性值

alert(authorClone.name); // 输出'new name'

authorClone.books.push('new book'); // authorClone.books实际连接到Author.books，这里只是修改了
                                    // 原型对象的默认值，所有其他由该原型拓展出来的对象都连接到这个
                                    // 值
authorClone.books = []; // 创建一个新的数组, 并添加到authorClone
authorClone.books.push('new book');

/**
 * 当原型对象含有子对象时，如果想覆盖子对象的一个值，必须重新创建整个字对象
 */
var CompoundObject = {
    string1: 'default value',
    childObject: {
        bool: true,
        num: 10
    }
}              
var compoundObjectClone = clone(CompoundObject);

// 不推荐，这实际上修改了原型CompoundObject的属性
compoundObjectClone.childObject.num = 5;
// 新建一个对象，但不会破坏原型的数据
// 缺点是compoundObjectClone必须知道原型的细节，
// 使得CompoundObject和compoundObject产生耦合
compoundObjectClone.childObject = {
    bool: true,
    num: 5
};

/**
 * 通过工厂方法创建childObject
 */
var CompoundObject = {};
CompoundObject.string1 = 'default value';
CompoundObject.createChildObject = function(){
    return {
        bool: true,
        num: 10
    }
};
CompoundObject.childObject = CompoundObject.createChildObject();

var compoundObjectClone = clone(CoumpoundObject);
compoundObjectClone.childObject = CompoundObject.createChildObject();
compoundObjectClone.childObject.num = 5;

/*
 * clone函数
 * 
 */
function clone(object) {
    // 1. 创建一个新的空函数F
    function F() {}
    // 2. 将F的prototype属性设置作为参数object传入的原型对象
    F.prototype = object;
    // 3. 通过把new运算符作用于F创建出一个新对象，这个对象是一个以
    // 给定对象为原型对象的空对象
    return new F;
}

/*===================================================================*/

/**
 * EditInPlaceField object - Prototype
 */
var EditInPlaceField = {
    configure: function(id, parent, value) {
        this.id = id;
        this.value = value || 'default value';
        this.parentElement = parent;
        
        this.createElements(this.id);
        this.attachEvents();
    },
    createElements: function(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);
        
        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        
        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);
        
        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'Save';
        this.containerElement.appendChild(this.saveButton);
        
        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = 'Cancel';
        this.containerElement.appendChild(this.cancelButton);
        
        this.convertToText();
    },
    attachEvents: function() {
        var that = this;
        addEvent(this.staticElement, 'click', function() {
            that.convertToEditable();
        });
        addEvent(this.saveButton, 'click', function() {
            this.save();
        });
        addEvent(this.cancelButton, 'click', function() {
            that.cancel();
        });
    },
    
    convertToEditable: function() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';
        
        this.setValue(this.value);
    },
    save: function() {
        this.value = this.getValue();
        var that = this;
        var callback = {
            success: function() {
                that.convertToText();
            },
            failure: function() {
                alert('Error saving value.');
            }
        };
        ajaxRequest('GET', 'save.php?id=' + this.id + '&value=' + this.value, callback);
    },
    cancel: function() {
        this.convertToText();
    },
    
    convertToText: function() {
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';
        
        this.setValue(this.value);
    },
    
    setValue: function(value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    getValue: function() {
        return this.fieldElement.value;
    }
}
// 对EditInPlaceField的实例化
var titlePrototypal = clone(EditInPlaceField);
titlePrototypal.configure(' titleProtoypal ', $('doc'), 'Title Here');
var currentTitleText = titlePrototypal.getValue();

/**
 * 
 */
var EditInPlaceMixin = function() {};
EditInPlaceMixin.prototype = {
    createElements: function(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);
        
        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;
        
        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);
        
        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'Save';
        this.containerElement.appendChild(this.saveButton);
        
        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = 'Cancel';
        this.containerElement.appendChild(this.cancelButton);
    },
    attachEvents: function() {
        var that = this;
        addEvent(this.staticElement, 'click', function() {
            that.convertToEditable();
        });
        addEvent(this.saveButton, 'click', function() {
            this.save();
        });
        addEvent(this.cancelButton, 'click', function() {
            that.cancel();
        });
    },
    
    convertToEditable: function() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';
        
        this.setValue(this.value);
    },
    save: function() {
        this.value = this.getValue();
        var that = this;
        var callback = {
            success: function() {
                that.convertToText();
            },
            failure: function() {
                alert('Error saving value.');
            }
        };
        ajaxRequest('GET', 'save.php?id=' + this.id + '&value=' + this.value, callback);
    },
    cancel: function() {
        this.convertToText();
    },
    
    convertToText: function() {
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';
        
        this.setValue(this.value);
    },
    
    setValue: function(value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    getValue: function() {
        return this.fieldElement.value;
    }
}
// EditInPlaceField Class
function EditInPlaceField(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;
    
    this.createElements(this.id);
    this.attachEvents();
};
augment(EditInPlaceField, EditInPlaceMixin);

// 增加方法，

/*===================================================================*/

/**
 * @Summary
 * 继承会使代码变得更加复杂、更难被新手所理解
 * 它的主要好处表现在代码的重用方面，通过建立类或对象之间的继承关系，有些方法
 * 我们只需要定义一次即可；当需要修改或排查时，其定义只出现在一个位置，有利于
 * 节省时间和精力
 * 
 * 原型式继承(及clone函数) -- 适用于内存效率比较重要的场合
 * 类式继承 -- 更容易理解
 * 
 * 掺元类 -- 能让对象和类共享一些方法又不需要让它们结成父子关系
 */