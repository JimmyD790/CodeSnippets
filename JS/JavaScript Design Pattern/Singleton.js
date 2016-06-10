/**
 * 5.1 单体的基本结构
 * 单体是一个被实例化一次并且可以通过一个众说周知的的访问点访问的类
 * 单体是一个用来划分命名空间并将一批相关方法和属性组织在一起的对象，如果它可以被实例化，
 * 那么它只能被实例化一次
 * 
 * 一个简单的对象变量
 * 违背了oop原则: 类可以被拓展，但不应该被修改
 * 
 * 如果某些变量需要保护，可以将其定义在闭包之中
 * 
 * 
 */
var Singleton = {
    attribute1: true,
    attribute2: 10,
    
    method1: function() {
        
    },
    method2: function(arg){
        
    }
};

Singleton.attribute1 = false;
var total = Singleton.attribute2 + 5;
var result = Singleton.method1();

/*----------------------------------------------------------------------*/

/**
 * 可以把单体看成一个命名空间 -- 这个变量应该在各个地方都能被访问;它的内部成员都被包装
 * 在对象中，并只能通过这个单体对象变量进行访问;
 * 可以说它们（内部成员）被单体对象圈在了一个命名空间中
 */
function findProduct(id) {
    //...
}
//...
/* 在JS中什么都可以被改写，程序员一不留神就会擦除一个变量、函数甚至整个类,这中错误查找
 * 起来非常费时
 */
// 在脚本中，后续的程序员可能这样做...
var resetProduct = $('reset-product-button');
var findProduct = $('find-product-button'); // findProduct被重写了

/*----------------------------------------------------------------------*/

/**
 * 使用命名空间
 */
var MyNamespace = {
    findProduct: function(id) {
        //...
    },
    // 定义方法
}
var resetProduct = $('reset-product-button');
var findProduct = $('find-product-button'); // findProduct不会被重写

/*----------------------------------------------------------------------*/

/**
 * 
 */
GiantCorp.Common = {
    // 可以被所有对象和模块访问到的单例对象
};
GiantCorp.ErrorCodes = {
    // 用于存储数据的对象字面量
}
GiangCorp.PageHandler = {
    // 一个定义方法和属性的单例
}

/*----------------------------------------------------------------------*/
// 包装特定网页专用代码的单体的骨架
Namespace.PageName = {
    //Page constants.
    CONSTANT_1: true,
    CONSTANT_2: 10,
    
    //Page methods.
    method1: function (){
    },
    method2: function(){
    },
    
    // Initialization method1
    init: function() {
        
    }
};
/**
 * 这里假定GiantCorp已经作为一个空的对象字面量被创建好了，否则会引发错误
 * 可以使用一下语句定义个默认值
 * var GiantCorp = window.GiantCorp || {};
 */
GiangCorp.RegPage = {
    // Constants.
    FORM_ID: 'reg-form',
    OUTPUT_ID: 'reg-results',
    
    // Form handling methods
    handleSubmit: function(e) {
        e.preventDefault(); // Stop the normal form submission
        
        var data = {};
        var inputs = GiantCorp.RegPage.formEl.getElementsByTagName('input');
        
        // 收集表单数据
        for(var i = 0, len = inputs.length; i < len; i ++){
            data[input[i].name] = input[i].value;
        }
        
        // 发送表单数据
        GiantCorp.RegPage.sendRegistration(data);
    },
    sendRegistration: function(data) {
        //... 异步调用
    },
    displayResult: function(response) {
        // 将数据直接输出到html
        GiantCorp.RegPage.outputEl.innerHTML = response;
    },
    
    // 初始化方法
    init: function() {
        //获取表单和输出元素
        GiantCorp.RegPage.formEl = $(GiantCorp.RegPage.FORM_ID);
        GiantCorp.RegPage.outputEl = $(GiantCorp.RegPage.OUTPUT_ID);
        
        // 劫持表单提交
        addEvent(GiantCorp.RegPage.formEl, 'submit', GiantCorp.RegPage.handleSubmit);
    }
};

addLoadEvent(GiantCorp.RegPage.init);