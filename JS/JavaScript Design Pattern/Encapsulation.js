/* The basic mode */
var Book = function (isbn, title, author) {
    if (isbn == undefined) throw new Error('...');
    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype = {
    checkIsbn: function (isbn) {
        if (isbn == undefined || typeof isbn != 'string') {
            return false;
        }

        isbn = isbn.replace(/-/, ''); //Remove dashees
        if (isbn.length != 10 && isbn.length != 13) {
            return false;
        }
        var sum = 0;
        if (isbn.length === 10) { // 10 digit ISBN
            if (!isbn.match(/^\d{9}/)) { // Ensure characters 1 through 9 are digits
                return false;
            }

            for (var i = 0; i < 9; i++) {
                sum += isbn.charAt(i) * (10 - i);
            }

            var checksum = sum % 11;
            if (checksum === 10) {
                checksum = 'X';
            }
            if (isbn.charAt(9) != checksum) {
                return false;
            }
        }
        else { // 13 digit ISBN}
            if(!isbn.match(/^\d{12}/)) { // Ensure characters 1 through 12 are digits
                return false;
            }
            for(var i = 0; i < 12; i++){
                sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
                
            }
            var checksum = sum % 10;
            if(isbn.charAt(12) != checksum){
                return false;
            }
        }
        
        return true; //All tests passed

    },
    display: function () {
        //...
    }
}

/**
 * 
 */
var Book = function(isbn, title, author){ //implements Publication
    this.setIsbn(isbn);
    this.setTtile(title);
    this.setAuthor(author);
}

Book.prototype = {
    checkIsbn: function (isbn) {
        //...
    },
    
    getIsbn: function(){
        return this._isbn;
    },
    setIsbn: function(isbn) {
        if(!this.checkIsbn(isbn)) throw new Error('Book: Invalid ISBN');
        this._isbn = isbn;
    },
    
    getTitle: function(){
        return this.getTitle;
    },
    setTitle: function(title){
        this._title = title || 'No Title specified';
    },
    
    getAuthor: function(){
        return this._author;
    },
    setAuthor: function(author) {
        this._author = author || 'No author specified';
    },
    
    display: function(){
        // ....
    }
};

/**
 * 用闭包实现私有成员
 * 
 * 1. this.getIsbn(), this.setIsbn()这些方法为特权方法，
 * 特权方法可以访问私有属性和方法,而公有方法不能。
 * Book.prototype.isbn()则为公有方法
 * 
 * 2. 每个实例都拥有一份特权方法的副本；而公有方法为所有实例共享；公有方法不能访问私有属性和方法
 * 公有方法可以通过特权方法访问到死有变量
 */
var Book = function(newIsbn, newTitle, newAuthor) {
    // 私有属性
    var isbn, title, author;
    
    // 私有方法
    function checkIsbn(isbn) {
        //...
    }
    
    // 特权方法 （公有方法，能够访问到私有属性)
    this.getIsbn = function() {
        return isbn;
    };
    this.setIsbn = function(newIsbn){
        if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
        isbn = newIsbn;
    };
    
    this.getTitle = function() {
        return title;
    };
    this.setTitle = function(newTitle) {
        title = newTitle || 'No title specified';
    };
    
    this.getAuthor = function() {
        return author;
    }
    this.setAuthor = function(newAuthor) {
        author = newAuthor || 'No author specified';
    }
    
    // 构造函数
    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
};

// 公有方法（不能访问到私有属性，只能通过存取方法）
Book.prototype = {
    display: function() {
        //...
    }
}
/**
 * 私有成员和特权成员被声明在构造器中(分别使用var和this关键字)
 * 在这里，外层函数 var Book = (function(){...})()创建了一个闭包;
 * 在实例化Book时，所调用的是返回的内层函数（即返回的构造器函数）
 ＊
 * numOfBooks和checkIsbn()这些私有的静态成员可以从构造器内部访问, 即所有的
 * 私有函数和特权函数都可以访问到它们(例如this.setIsbn)
 */
var Book = (function(){
    
    // 私有静态变量
    var numOfBooks = 0;
    
    // 私有静态方法
    function checkIsbn(isbn) {
        //...
    }
    
    // 返回构造方法
    return function(newIsbn, newTitle, newAuthor) {
        
        // 私有属性
        var isbn, title, author;
        
        // 特权方法
        this.getIsbn = function() {
            return isbn;
        };
        this.setIsbn = function(newIsbn){
            if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
            isbn = newIsbn;
        };
        
        this.getTitle = function() {
            return title;
        };
        this.setTitle = function(newTitle) {
            title = newTitle || 'No title specified';
        };
        
        this.getAuthor = function() {
            return author;
        };
        this.setAuthor = function(newAuthor) {
            author = newAuthor || 'No author specified';
        };
        
        // 构造代码
        numOfBooks++; 
        if(numOfBooks > 50) {
            throw new Error('Book: Only 50 instances of Book can be created.');
        }
        this.setIsbn(newIsbn);
        this.setTitle(newTitle);
        this.setAuthor(newAuthor);
    }
})();

// 公有静态方法
Book.convertToTitleCase = function(inputString) {
    //...
};

// 公有非特权方法
Book.prototype = {
    display: function() {
        //...
    }
};