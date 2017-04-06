function $(argument) {
	return new Base(argument);
}
function Base(argument) {
	this.elements=[];
	// 模仿css选择器
	if (typeof argument == 'string') {
		if (argument.indexOf(' ') != -1) {//后代选择器
			var elements=argument.split(' ');
			var childElement=[];
			var tempNode=[];
			for (var i = 0; i < elements.length; i++) {
				if (tempNode.length == 0) {
					tempNode.push(document);
				}
				switch(elements[i].charAt(0)){
					case '#':
						childElement=[];
						childElement.push(getId(elements[i].substring(1)));
						tempNode=childElement;
						break;
					case '.':
						childElement=[];
						for (var j = 0; j < tempNode.length; j++) {
							var allClass=getClass(elements[i].substring(1),tempNode[j]);
							for (var k = 0; k < allClass.length; k++) {
								childElement.push(allClass[k]);
							}
						}
						tempNode=childElement;
						break;
					default:
						childElement=[];
						for (var j = 0; j < tempNode.length; j++) {
							var allNode=getTagName(elements[i],tempNode[j]);
							for (var k = 0; k < allNode.length; k++) {
								childElement.push(allNode[k]);
							}
						}
						tempNode=childElement;
				}	
			}
			this.elements=childElement;
		}else {//id class 标签选择器
			switch (argument.charAt(0)) {
				case '#':
					this.elements.push(getId(argument.substring(1)));
					break;
				case '.':
					this.elements=getClass(argument.substring(1));
					break;
				default:
					this.elements=getTagName(argument);
			}
		}
	}else if (typeof argument == 'object') {
		if (argument != 'undefined') {
			this.elements[0]=argument;
		}
	}else if (typeof argument == 'function') {
		addDomLoaded(argument);
	}
}
// 获取值
Base.prototype.value=function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 0) {
			return this.elements[i].value;
		}else {
			this.elements[i].value=str;
		}
	}
	return this;
}
// 获取子元素长度
Base.prototype.length=function () {
	return this.elements.length;		
}
// 隐藏
Base.prototype.hide=function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='none';
	}
	return this;
}
// 显示
Base.prototype.show=function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='block';
	}
	return this;
}
//点击事件
Base.prototype.click=function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick=fn;
	}
	return this;
}
// 设置物体居中
Base.prototype.center=function (width,height) {
	var left=(getInner().width-width) / 2 + getScroll().left;
	var top=(getInner().height-height) /2 + getScroll().top;
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
}
// 遮罩锁
Base.prototype.lock=function () {
	for (var i = 0; i < this.elements.length; i++) {
	 	this.elements[i].style.width=getInner().width+'px';
	 	this.elements[i].style.height=document.body.scrollHeight+getInner().height+'px';
	} 
	return this;
}
// 获取form表单元素
Base.prototype.form=function (name) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i]=this.elements[i][name];
	}
	return this;
}
// 得到第一个集合
Base.prototype.first=function () {
	return this.elements[0];
}
// 得到最后一个集合
Base.prototype.last=function () {
	return this.elements[this.elements.length - 1];
}
// 添加事件
Base.prototype.bind=function (event,fn) {
	for (var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i],event,fn);
	}
	return this;
}
// 设置css
Base.prototype.css=function (attr,value) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}
//获取 添加 html
Base.prototype.html=function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			this.elements[i].innerHTML=str;
		}else{
			return this.elements[i].innerHTML;
		}
	}
	return this;
}
Base.prototype.getElement=function (num) {
	return this.elements[num];
}
// 获取某个节点 并且Base对象
Base.prototype.getThis=function (num) {
	var thisElement=this.elements[num];
	this.elements=[];
	this.elements[0]=thisElement;
	return this;
}
//得到元素文本内容
Base.prototype.text=function () {
	for (var i = 0; i < this.elements.length; i++) {
		var elements=this.elements[i];
		return (typeof elements.textContent == 'string') ? elements.textContent : elements.innerText;
	}
	return this;
}
//鼠标移入移出
Base.prototype.hover=function (over,out) {
	for (var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}
//拖拽
Base.prototype.drag=function () {
	var argu=arguments;
	for (var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i],'mousedown',function (event) {
			var _this=this;
			var e = event||window.event;
			var x = e.clientX - _this.offsetLeft;
			var y = e.clientY - _this.offsetTop;
			var flag=false;
			for (var i = 0; i < argu.length; i++) {
				if (e.target == argu[i]) {
					flag = true;
					break;
				}
			}
			if (flag) {
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);
			}else {
				removeEvent(document,'mouseover',move);
				removeEvent(document,'mouseup',up);
			}
			function move(event) {
				var e = event || window.event;
				var left = e.clientX - x;
				var top = e.clientY - y;
				if (left < 0) {
					left = 0;
				}else if (left <= getScroll().left) {
					left = getScroll().left;
				}else if (left > getInner().width + getScroll().left - _this.offsetWidth) {
					left = getInner().width + getScroll().left - _this.offsetWidth;
				}
				if (top < 0) {
					top = 0;
				}else if (top <= getScroll().top){
					top = getScroll().top
				}else if (top > getInner().height + getScroll().top - _this.offsetHeight) {
					top = getInner().height + getScroll().top - _this.offsetHeight;
				}
				_this.style.left = left+'px';
				_this.style.top = top+'px';
				if (typeof _this.setCapture != 'undefined') { //IE 防止拖出窗口
					_this.setCapture();
				}
			}
			function up() {
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
				if (typeof _this.releaseCapture != 'undefined') { //IE 防止拖出窗口
					_this.releaseCapture();
				}
			}
		});
	}
	return this;
}
//浏览器窗口改变
Base.prototype.resize=function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		var getElement=this.elements[i];
		addEvent(window,'resize',function () {
			fn();
			if (getElement.offsetLeft > getInner().width + getScroll().left - getElement.offsetWidth) {
				getElement.style.left = getInner().width + getScroll().left - getElement.offsetWidth;
				if (getElement.offsetLeft <= 0 + getScroll().left) {
					getElement.style.left = 0 + getScroll().left+'px';
				}
			}
			if (getElement.offsetTop > getInner().height + getScroll().top - getElement.offsetHeight) {
				getElement.style.top = getInner().height + getScroll().top - getElement.offsetHeight;
				if (getElement.offsetTop <= 0 + getScroll().top) { //防止位置被顶到顶点 保证可见区域
					getElement.style.top = 0 + getScroll().top+'px';
				}
			}
		})
	}
	return this;
}
//动画
Base.prototype.animated=function (obj) {
	for (var i = 0; i < this.elements.length; i++) {
		var getElement=this.elements[i];
		var time = obj['time'] != undefined ? obj['time'] : 30;
		var attr = obj['attr'] != undefined ? obj['attr'] : 'left';
		var step = obj['step'] != undefined ? obj['step'] : 7;
		var target = obj['target'];
		var start = obj['start'] != undefined ? obj['start'] : attr == 'opacity' ? parseFloat(getStyle(getElement,attr))*100 : 
			parseInt(getStyle(getElement,attr));
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';
		var speed = obj['speed'] != undefined ? obj['speed'] : 6;
		var mul = obj['mul'];
		if (start > target) {
			step = -step;
		}
		if (attr == 'opacity') {
			getElement.style.opacity=parseInt(start)/100;
			getElement.style.filter='alpha(opacity='+parseInt(start)+')';
		}else {
			getElement.style[attr] = start+'px';
		}
		if (mul == undefined) {
			mul = {};
			mul[attr] = target;
		}
 		clearInterval(getElement.timer);
		getElement.timer = setInterval(function () {
			var flag = true;
			for (var i in mul) {
				attr = i != undefined ? i : 'left';
				target = mul[i];
				if (type == 'buffer') {
					step = attr == 'opacity' ?  (target - parseFloat(getStyle(getElement,attr)) * 100) / speed : (target - parseInt(getStyle(getElement, attr))) / speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}
				if (attr == 'opacity') {
					if (step == 0) {
						setOpacity();
					}if (step > 0 && Math.abs(parseFloat(getStyle(getElement,attr)) * 100 - target) <= step) {
						setOpacity();
					}else if (step < 0 && (parseFloat(getStyle(getElement,attr)) * 100 - target) <= Math.abs(step)) {
						setOpacity();
					}else {
						var temp = parseFloat(getStyle(getElement,attr)) * 100;
						getElement.style.opacity=parseInt(temp + step) / 100;
						getElement.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
					}
					if (parseInt(target) != parseInt(parseFloat(getStyle(getElement,attr)) * 100)) {
						flag = false;
					}
				}else {
					if (step == 0){
						setTarget();
					}else if (step > 0 && Math.abs(parseInt(getStyle(getElement,attr)) - target) <= step) {
						setTarget();
					}else if (step < 0 && (parseInt(getStyle(getElement,attr)) - target ) <= Math.abs(step)) {
						setTarget();
					}else {
						getElement.style[attr]=parseInt(getStyle(getElement,attr))+step+'px';
					}
					if (parseInt(target) != parseInt(getStyle(getElement,attr))) {
						flag = false;
					}
				}
			}
			if (flag) {
				clearInterval(getElement.timer);
				if (obj.fn != undefined) {
					obj.fn();
				}
			}
		},time);
		function setTarget() {
			getElement.style[attr] = target +'px';
		}
		function setOpacity() {
			getElement.style.opacity = parseInt(target) / 100;
			getElement.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
		}
	}
	return this;
}
//点击切换事件
Base.prototype.toggle=function () {
	for (var i = 0; i < this.elements.length; i++) {
		(function (getElement,argu) {
			var count = 0;
			addEvent(getElement,'click',function () {
				argu[count++ % argu.length].call(this);
			});
		})(this.elements[i],arguments);
	}
	return this;
}
//得到下一个节点
Base.prototype.next=function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i] = this.elements[i].nextSibling;
		if (this.elements[i] == null) {
			throw new Error('找不到下一个同级节点');
		}
		if (this.elements[i].nodeType == 3) {
			this.next();
		}
	}
	return this;
}
//得到元素属性 
Base.prototype.attr=function (attr,value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return this.elements[i].getAttribute(attr);
		} else if (arguments.length == 2) {
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
}
//设置透明度
Base.prototype.opacity=function (num) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity'+num+')';
	}
	return this;
}
//得到索引
Base.prototype.index=function () {
	var children = this.elements[0].parentNode.children;
	for (var i = 0; i < children.length; i++) {
		if (this.elements[0] == children[i]) {
			return i;
		}
	}
}
Base.prototype.fixedCenter=function (width,height) {
	var xWidth = getInner().width;
	var yHeight = getInner().height;
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top = (yHeight - height)/2 - 50 +'px';
		this.elements[i].style.left = (xWidth - width)/2 +'px';
	}
	return this;
}