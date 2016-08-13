var AddPageDialog = (function(){
    var __options = {
        url: 'view_addPage',
        width: 400,
        height: 600,
        //show: false, //亲测无效
        buttons: [{
            text: '关闭',onclick: function(item, dialog){
                dialog.close();
            }
        }]
    };
    var instance;
    var constructor = function(){
        if(instance){
            return instance;
        }
        var that = this;
        this.show = function(){
            //that.prototype = $.ligerDialog(__options);
            console.log('this should show once');
            that = $.ligerDialog(__options);
        };
        return instance = this;
    };
    //
    return constructor;
})(); 

/*
 * 抽象失败的版本
 */
var Dialog = (function(){
    var instance;
    var constructor = function(__options){
        if(instance){
            return instance;
        }
        var that = this;
        this.show = function(){
            //that.prototype = $.ligerDialog(__options);
            console.log('this should show once');
            that = $.ligerDialog(__options);
        };
        return instance = this;
    };
    //
    return constructor;
})();
var AddPageDialog = function(){};
AddPageDialog.prototype = Dialog({
    url: 'view_addPage',
    width: 400,
    height: 600,
    //show: false, //亲测无效
    buttons: [{
        text: '关闭',onclick: function(item, dialog){
            dialog.close();
        }
    }] 
});


var UpdatePageDialog = function(){};
UpdatePageDialog.prototype = Dialog({
    url: 'view_updatePage',
    width: 400,
    height: 600,
    buttons: [{
        text: '关闭',onclick: function(item, dialog){
            dialog.close();
        }
    }]
});
UpdatePageDialog.prototype.show = function(id){
    //this.prototype
    console.log(id);
    //this.show({url: 'view_updatePage?pageId=' + id});
};