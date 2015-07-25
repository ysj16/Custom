var Custom = {
    ie6:!-[1,]&&!window.XMLHttpRequest,
    addHandler:function(target,event,handler){//事件绑定
        if(window.addEventListener){
            this.addHandler = function(target,event,handler){
                target.addEventListener(event,handler,false);
            }
        }else if(window.attachEvent){
            this.addHandler = function(target,event,handler){
                target.attachEvent("on"+event,handler)
            }
        }
        this.addHandler(target,event,handler);
    },
    /*异步加载js*/
    loadJS:function(url){
        this.addHandler(window,"load",function(){
            var script = document.createElement("script");
            script.src=url;
            document.body.appendChild(script);
        })
    },
    /*延时加载图片*/
    loadImg : function(src1, src2, src3) {
        if (!arguments.length)
            arguments[0] = 'data-src';
        var $win = $(window);
        for (var i = 0, l = arguments.length; i < l; i++) {
            var src = arguments[i];
            if (typeof (src) == 'string') {
                $('img[' + src + ']')
                    .each(
                    function() {
                        var $me = $(this), top = $me.offset().top, wtop = $win
                            .scrollTop(), spacer = 40;
                        if (top + $me.height() + spacer >= wtop
                            && top <= wtop + $win.height()
                            + spacer) {
                            $me.attr('src', $me.attr(src))
                                .removeAttr(src);
                        }
                    });
            }
        }
    },
    /*获取地址栏url参数*/
    getUrlPara : function(name) {
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');
        if (reg.test(location.href))
            return decodeURI(RegExp.$2.replace(/\+/g, ' '));
        return '';
    },
    /*设置cookie*/
    setCookie : function(key, value, expiredays, path, domain, secure) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = key
            + '='
            + encodeURI(value)
            + ((expiredays ? ';expires='+ exdate.toGMTString():'')
                + (path ? '; path='
                    + path : '') + (domain ? '; domain='
                + domain : '') + (secure ? '; secure=' + secure: ''));
    },
    /*获取cookie*/
    getCookie : function(key) {
        var ck = document.cookie;
        if (ck.length) {
            c_start = ck.indexOf(key + '=')
            if (c_start != -1) {
                c_start = c_start + key.length + 1
                c_end = ck.indexOf(';', c_start)
                if (c_end == -1)
                    c_end = ck.length
                return decodeURI(ck.substring(c_start, c_end))
            }
        }
        return ''
    },

    /*生成间隔一定时间才执行的函数*/
    debounce:function(fn,delay){
        var timeout;
        return function(){
            if(!timeout) {
                timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    timeout = null;
                    fn();
                }, delay)
            }
        }
    }

}