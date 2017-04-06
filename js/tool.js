// 浏览器检测
(function () {
	window.system={};
	var version=navigator.userAgent.toLowerCase();
	var browse;
	(browse = version.match(/firefox\/([\d\.]+)/)) ? system.firefox=browse[1] : 0;
	(browse = version.match(/chrome\/([\d\.]+)/)) ? system.chrome=browse[1] : 0;
	(browse = version.match(/version\/([\d\.]+).*safari/)) ? system.safari=browse[1] : 0;
	(browse = version.match(/net([\d\.]+)c\;.*rv\:([\d\.]+)/)) ? system.ie=+browse[2] : 0;
	(browse = version.match(/msie\s([\d\.]+)/)) ? system.msie=browse[1] : 0;
	if (/webkit/.test(version)) {
		system.webkit = version.match(/webkit\/([\d.]+)/)[1];
	}
})();
// 得到id
function getId(id) {
	return document.getElementById(id);	
}
// 得到class
function getClass(className,parentNode) {
	var node=null;
	var temp=[];
	if (parentNode != undefined) {
		node=parentNode;
	}else {
		node=document;
	}
	var allName=node.getElementsByTagName('*');
	for (var i = 0; i < allName.length; i++) {
		if ( ( new RegExp('(\\s|^)'+className+'(\\s|$)')).test(allName[i].className) ){
			temp.push(allName[i]);
		}
	}
	return temp;
}
//添加class
function addClass(className) {
	for(var i=0; i<this.element.length; i++){
		if(!this.element[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.element[i].className += ' '+ className;
		}
	}
}
//删除class
function removeClass(className) {
	for(var i=0; i<this.element.length; i++){
		if(this.element[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.element[i].className=
				this.element[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
}
// 得到标签名
function getTagName(name,parentNode) {
	var node=null;
	var temp=[];
	if (parentNode != undefined) {
		node=parentNode;
	}else {
		node=document;
	}
	var allName=node.getElementsByTagName(name);
	for (var i = 0; i < allName.length; i++) {
		temp.push(allName[i]);
	}
	return temp;
}
// 得到浏览器活动窗口大小
function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		if (!obj.events) obj.events = {};//创建一个存放事件的哈希表(散列表)
		if (!obj.events[type]) {//第一次执行时执行	
			obj.events[type] = [];//创建一个存放事件处理函数的数组
			if (obj['on' + type]) obj.events[type][0] = fn;//把第一次的事件处理函数先储存到第一个位置上
		} else {
			if (addEvent.equal(obj.events[type], fn)) return false;//同一个注册函数进行屏蔽，不添加到计数器中
		}
		obj.events[type][addEvent.ID++] = fn;//从第二次开始我们用事件计数器来存储
		obj['on' + type] = addEvent.exec;//执行事件处理函数
	}
}
//为每个事件分配一个计数器
addEvent.ID = 1;
//执行事件处理函数
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};
//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}
//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};
//删除事件
function removeEvent(obj,type,fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		console.log(obj);
		console.log(type);
		console.log(fn);
		obj.removeEventListener(type,fn,false);
	}else {
		for (var i in obj.events[type]) {
			if (obj.events[type][i] == fn) {
				delete obj.events[type][i];
			}
		}
	}
}
//DOM加载
function addDomLoaded(fn) {
	var isReady=false;
	var timer=null;
	function doReady() {
		if (timer) {
			clearInterval(timer);
		}
		if (isReady) {
			return;
		}
		isReady=true;
		fn();
	}
	if (system.firefox < 3 || system.webkit < 525) {
		timer=setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		},1);
	}else if (document.addEventListener) { // w3c DOMContentLoaded
		addEvent(document,'DOMContentLoaded',function () {
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if (system.msie < 9) {
		var timer=null;
		timer=setInterval(function () {
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){}
		},1);
	}
}
//ajax异步传输 无刷新加载数据
function ajax(obj) {
	var xhr=(function () {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();	
		}else if (typeof ActiveXObject != 'undefined') {
			var version=[
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp'
			];
			for (var i = 0; i < version.length; i++) {
				try{
					return new ActiveXObject(version[i]);
				}catch(e){}
			}
		}else {
			throw new Error('浏览器不支持XHR对象');
		}
	})();
	obj.url=obj.url+'?rand='+Math.random();
	obj.data=(function (data) {
		var arr=[];
		for (var i in data) {
			arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data);
	if (obj.method == 'get') {
		obj.url+=obj.url.indexOf('?') == -1 ? '?'+obj.data : '&'+obj.data;
	}
	if (obj.async === true) {
		xhr.onreadystatechange=function () {
			if (xhr.readyState == 4) {
				callBack();
			}
		}
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method == 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callBack();
	}
	function callBack() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);
		}else {
			console.log(xhr.status+' '+xhr.statusText);
		}
	}
}
//表单序列化
function serialize(form) {
	var parts={};
	for (var i = 0; i < form.elements.length; i++) {
		var filed=form.elements[i];
		switch(filed.type){
			case 'file':
			case 'reset':
			case 'button':
			case 'submit':
			case 'undefined':
				break;
			case 'radio':
			case 'checkbox':
				if (!filed.selected) {
					break;
				}
				break;
			case 'select-one':
			case 'select-multiple':
					for (var j=0; j < filed.options.length; j++){
						var option=filed.options[j];
						if (option.selected) {
							var optionValue='';
							if (option.hasAttribute) {
								optionValue=(option.hasAttribute('value') ? option.value : option.text);
							}else {
								optionValue=(option.attributes('value').specified ? option.value : option.text);
							}
							parts[filed.name]=optionValue;
						}
					}
				break;
			default:
				parts[filed.name]=filed.value;
		}
	}
	return parts;
}
// 去除空格
function trim(str) {
	if (arguments.length == 2) {
		return str.replace(/\s/g,'');//去除全部空格
	}else {
		return str.replace(/(^\s*)|(\s*$)/g,'');//前除前后空格
	}
}
//得到css样式
function getStyle(elements,attr) {
	var value;
	if (typeof window.getComputedStyle != 'undefined') {
		value=window.getComputedStyle(elements,null)[attr];
	}else if (typeof elements.currentStyle != 'undefined') {
		value=elements.currentStyle[attr];
	}
	return value;
}
//判断数组是否有值
function isArray(arr,value) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == value) {
			return true;
		}
	}
	return false;
}
//得到滚动条位置
function getScroll() {
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
//写入cookie secure为true时https协议下使用
function setCookie(obj) {
	var cookieName=encodeURIComponent(obj.name) +'='+ encodeURIComponent(obj.value);
	if (typeof obj.expires == 'number') {
		var d = new Date();
		d.setDate(d.getDate()+obj.expires);
		if (d instanceof Date) {
			cookieName += ';expires=' + new Date(d);
		}
	}
	if (obj.path) {
		cookieName += ';path=' + obj.path;
	}
	if (obj.domain) {
		cookieName += ';domain=' + obj.domain;
	}
	if (obj.secure) {
		cookieName += ';secure=' + obj.secure;
	}
	document.cookie = cookieName;
}
//得到cookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) +'=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		cookieEnd = document.cookie.indexOf(';',cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}
//删除cookie
function removeCookie(name) {
	document.cookie = name + '=;expires=' + new Date(0); 
}
//获取元素离顶点位置 可见区域
function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
//获取某一个节点的上一个节点的索引
function prevIndex(current, parent) {
	var length = parent.children.length;
	if (current == 0){
		return length - 1;
	} 
	return parseInt(current) - 1;
}

//获取某一个节点的下一个节点的索引
function nextIndex(current, parent) {
	var length = parent.children.length;
	if (current == length - 1){
		return 0;
	} 
	return parseInt(current) + 1;
}