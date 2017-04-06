$(function () {
	//导航个人中心
	$('#header .member').hover(function () {
		$('#header .member .member_ul').animated({
			attr:'height',
			target:120
		}).show();
	},function () {
		$('#header .member .member_ul').animated({
			attr:'height',
			target:1,
			fn:function () {
				$('#header .member .member_ul').hide();
			}
		});
	});
	//点击显示登陆框
	$('#header .login').click(function () {
		$('#lock').lock().show();
		$('#login').center(400,180).show();
		$(window).bind('scroll',function () {
			$('#login').animated({
				mul:{
					top:getScroll().top + (getInner().height - 180)/2
				}
			});
		});
	}).resize(function () {
		$('#lock').css('width',getInner().width+'px');
	});
	//登陆去除空格
	$('#login_form input').bind('keyup',function () {
		this.value = this.value.replace(/\s/g,'');
	});
	//关闭登陆框
	$('#login .close').click(function () {
		$('#login').hide();
		$('#lock').hide();
	});
	//检查登陆账户
	function check_login_user() {
		if (/^[a-zA-Z0-9\_\-]{4,20}$/g.test($('#login_form').form('user_name').value())) {
			return true;
		}
	}
	//检查登陆密码
	function check_login_pass() {
		if ($('#login_form').form('pass_name').value().length >= 6) {
			return true;
		}
	}
	//登陆按钮
	$('#login_form').form('login_button').click(function () {
		var flag = true;
		if (!check_login_user()) {
			flag = false;
			$('#login_form .check_user_pass').show();
		}
		if (!check_login_pass()) {
			flag = false;
			$('#login_form .check_user_pass').show();
		}
		if (flag) {
			$('#login_form .loading').show();
			$(this).css('backgroundPosition','right');
			var _this = this;
			_this.disabled = true;
			ajax({
				method:'post',
				url:'login.php',
				data:serialize(getId('login_form')),
				success:function (argument) {
					$('#login_form .loading').hide();
					if (argument == 1) {//登陆成功
						$('#login_form .check_user_pass').hide();
						$('#login_form .loading_succ').show();
						$('#header .login_none').hide();
						$('#header .login_mess').html(getCookie('login_user') + ', Hello');
						setCookie({
							name:'login_user',
							value: $('#login_form').form('user_name').value(),
							expires: 9999
						});
						//读取cookie
						set_get_cookie();
					}else {
						$('#login_form .check_user_pass').show();
					}
					setTimeout(function () {
						_this.disabled = false;
						$(_this).css('backgroundPosition','left');
						$('#login_form .loading_succ').hide();
						$('#login').hide();
						$('#lock').hide();
					},1000);
				},
				async:true
			});
		}
	});
	set_get_cookie();
	function set_get_cookie() {
		if (document.cookie.indexOf('login_user') != -1) {
			$('#header .login_none').hide();
			$('#header .login_mess').html(getCookie('login_user') + ', Hello');
		}
		$('#login_form .member_ul .clear_login').click(function () {
			$('#header .login_none').show();
			$('#header .login_mess').html('');
		});
	}
	// 拖拽
	$('#login').drag($('#login h2').first());
	//点击显示注册框
	$('#header .register').click(function () {
		$('#lock').lock().show();
		$('#register').center(600,620).show();
		$(window).bind('scroll',function () {
			$('#register').animated({
				mul:{
					top:getScroll().top + (getInner().height - 620)/2
				}
			});
		});
	});
	$('#register .close').click(function () {
		$('#lock').hide();
		$('#register').hide();
	});
	//注册框input去除全部空格
	$('#register_form input').bind('keyup',function () {
		this.value=this.value.replace(/\s/g,'');
	});
	//注册框 边框样式
	$('#register_form input').bind('focus',function () {
		$(this).css('-webkit-box-shadow','0 0 3px #00B6F0');
		$(this).css('-moz-box-shadow','0 0 3px #00B6F0');
		$(this).css('-ms-shadow','0 0 3px #00B6F0');
		$(this).css('box-shadow','0 0 3px #00B6F0');
		$(this).css('border','1px solid #00B6F0');
	}).bind('blur',function () {
		if (this.value.length == 0) {
			$(this).css('-webkit-box-shadow','0 0 3px #FF4A4A');
			$(this).css('-moz-box-shadow','0 0 3px #FF4A4A');
			$(this).css('-ms-shadow','0 0 3px #FF4A4A');
			$(this).css('box-shadow','0 0 3px #FF4A4A');
			$(this).css('border','1px solid #FF4A4A');
		}else {
			$(this).css('border','1px solid silver');
			$(this).css('box-shadow','none');
		}
	});
	//注册框 用户名 验证
	$('#register_form').form('user_name').bind('focus',function () {
		info_user();
	}).bind('blur',function () {
		info_keyup_biur(this);
		if (this.value.length < 4) {
			info_error();
		}
	}).bind('keyup',function () {
		info_keyup_biur(this);
		if (this.value.length < 4) {
			info_user();
		}
	});
	function info_user() {
		$('#register_form .info_user').show();
		$('#register_form .info_error').hide();
		$('#register_form .info_succ').hide();
	}
	function info_keyup_biur(_this) {
		if (_this.value.length >= 4) {
			if (!check_user()) {
				info_error();
			}else {
				$('#register_form .info_user').hide();
				$('#register_form .info_error').hide();
				$('#register_form .info_succ').show();
			}
		}
	}
	function info_error() {
		$('#register_form .info_user').hide();
		$('#register_form .info_error').show();
		$('#register_form .info_succ').hide();
	}
	//检查用户名
	function check_user() {
		var flag = true;
		if (!/[a-zA-Z0-9\_\-]{4,6}/g.test($('#register_form').form('user_name').value())) {
			flag = false;
			$('#register_form .info_error').show();
		}else {
			$('#register_form .is_user').show();
			ajax({
				method:'post',
				url:'is_user.php',
				data:serialize(getId('register_form')),
				success:function (argument) {
					$('#register_form .is_user').hide();
					if (argument == 1) {
						flag = false;
						$('#register_form .user_error').show();
					}else {
						flag = true;
					}
				},
				async:false
			});
		}
		return flag;
	}
	//注册框 密码 验证
	$('#register_form').form('pass_name').bind('keyup',function () {
		check_pass();
	}).bind('focus',function () {
		$('#register_form .info_pass').show();
		$('#register_form .pass_error').hide();
		$('#register_form .pass_succ').hide();
	}).bind('blur',function () {
		if(check_pass()){
			$('#register_form .info_pass').hide();
			$('#register_form .pass_error').hide();
			$('#register_form .pass_succ').show();
		}else {
			$('#register_form .info_pass').hide();
			$('#register_form .pass_error').show();
			$('#register_form .pass_succ').hide();
		}
	});
	//检查密码
	function check_pass() {
		var value=$('#register_form').form('pass_name').value();
		var pass_length=0;
		if (value.length >= 6 && value.length <= 20) {
			$('#register_form .q1').html('●').css('color','green');
		}else {
			$('#register_form .q1').html('○').css('color','black');
		}
		if (value.length > 0 && !/[\s\u4E00-\u9FA5]/.test(value)) {
			$('#register_form .q2').html('●').css('color','green');
		}else {
			$('#register_form .q2').html('○').css('color','black');
		}
		if (/[\d]/.test(value)) {
			pass_length++;
		}
		if (/[a-z]/.test(value)) {
			pass_length++;
		}
		if (/[A-Z]/.test(value)) {
			pass_length++;
		}
		if (/[^\w\u4E00-\u9FA5]/.test(value)) {
			pass_length++;
		}
		if (pass_length >= 3) {
			$('#register_form .q3').html('●').css('color','green');

		}else {
			$('#register_form .q3').html('○').css('color','black');
		}
		//注册框 密码强度 验证
		if (value.length >= 12 && pass_length >= 4) {
			$('#register_form .s').css('color','green');
			$('#register_form .s4').html('高').css('color','green');
		}else if (value.length >= 8 && pass_length >= 3) {
			$('#register_form .s1').css('color','#f60');
			$('#register_form .s2').css('color','#f60');
			$('#register_form .s3').css('color','black');
			$('#register_form .s4').html('中').css('color','#f60');
		}else if (value.length > 0 && pass_length >=1) {
			$('#register_form .s1').css('color','red');
			$('#register_form .s2').css('color','black');
			$('#register_form .s3').css('color','black');
			$('#register_form .s4').html('低').css('color','red');
		}else {
			$('#register_form .s').css('color','black');
			$('#register_form .s4').html('');
		}
		if ((value.length >= 6 && value.length <= 20) && !/\u4E00-\u9FA5/g.test(value) && pass_length >= 2) {
			return true;
		}else {
			return false;
		}	
	}
	// 密码确认
	$('#register_form').form('affirm_name').bind('keyup',function () {
		var pass=$('#register_form').form('pass_name').value();
		if (check_affirm()) {
			affirm_succ();
		}else if (this.value.length >= pass.length && this.value !== pass) {
			affirm_error();
		}else {
			info_affirm();
		}
	}).bind('focus',function () {
		info_affirm();
	}).bind('blur',function () {
		if (this.value !== $('#register_form').form('pass_name').value()) {
			affirm_error();
		}else {
			affirm_succ();
		}
	});
	function info_affirm() {
		$('#register_form .info_affirm').show();
		$('#register_form .affirm_error').hide();
		$('#register_form .affirm_succ').hide();
	}
	function affirm_error() {
		$('#register_form .info_affirm').hide();
		$('#register_form .affirm_error').show();
		$('#register_form .affirm_succ').hide();
	}
	function affirm_succ() {
		$('#register_form .info_affirm').hide();
		$('#register_form .affirm_error').hide();
		$('#register_form .affirm_succ').show();
	}
	// 检查确认密码
	function check_affirm() {
		var affirm_pass=$('#register_form').form('affirm_name').value();
		var pass=$('#register_form').form('pass_name').value();
		if (affirm_pass.length == pass.length && affirm_pass === pass) {
			return true;
		}
	}
	//检查提问
	function check_question() {
		if ($('#register_form').form('question_name').value() != 0) {
			return true;
		}
	}
	//回答
	$('#register_form').form('question_name').bind('change',function () {
			$('#register_form .question_error').hide();
	});
	$('#register_form').form('answer_name').bind('focus',function () {
		if ($('#register_form').form('question_name').value() == 0) {
			$('#register_form .question_error').show();
		}
		info_answer();
	}).bind('keyup',function () {
		if (this.value.length >= 2 && /\w/.test(this.value)) {
			answer_succ();
		}else {
			info_answer();
		}
	}).bind('blur',function () {
		if (check_answer()) {
			answer_succ();
		}else {
			$('#register_form .info_answer').hide();
			$('#register_form .answer_error').show();
			$('#register_form .answer_succ').hide();
		}
	});
	function answer_succ() {
		$('#register_form .info_answer').hide();
		$('#register_form .answer_error').hide();
		$('#register_form .answer_succ').show();
	}
	function info_answer() {
		$('#register_form .info_answer').show();
		$('#register_form .answer_error').hide();
		$('#register_form .answer_succ').hide();
	}
	//检查回答 
	function check_answer() {
		var answer_name=$('#register_form').form('answer_name').value();
		if (answer_name.length >= 2 && /\w/.test(answer_name)) {
			return true;
		}
	}
	// 邮箱
	$('#register_form').form('email_name').bind('keyup',function (event) {
		if (check_email()) {
			$('#register_form .info_email').hide();
			$('#register_form .email_error').hide();
			$('#register_form .email_succ').show();
		}else {
			info_email();
		}
		//邮箱格式补全界面
		if (this.value.length > 0 && this.value.indexOf('@') == -1) {
			$('#register_form .email_mess').show();
			$('#register_form .email_mess li span').html(this.value);
		}else {
			$('#register_form .email_mess').hide();
		}
		var e=event||window.event;
		$('#register_form .email_mess li').css('background','white');
		$('#register_form .email_mess li').css('color','black');
		if (e.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#register_form .email_mess li').length() - 1) {
				this.index = 0;
			}else {
				this.index++;
			}
			email_mess(this.index);
		}
		if (e.keyCode == 38) {
			if (this.index == undefined || this.index <= 0 ) {
				this.index = $('#register_form .email_mess li').length() - 1;
			}else {
				this.index--;
			}
			email_mess(this.index);
		}
		if (e.keyCode == 13) {
			$(this).value($('#register_form .email_mess li').getThis(this.index).text());
			this.index=undefined;
			$('#register_form .email_mess').hide();
		}
	}).bind('focus',function () {
		info_email();
	}).bind('blur',function () {
		$('#register_form .email_mess').hide();
		if (!check_email()) {
			$('#register_form .info_email').hide();
			$('#register_form .email_error').show();
			$('#register_form .email_succ').hide();
		}
	});
	//邮箱补全鼠标点击
	$('#register_form .email_mess li').hover(function () {
		$(this).css('background','#4C9ED9');
		$(this).css('color','white');
	},function () {
		$(this).css('background','white');
		$(this).css('color','black');
	});
	$('#register_form .email_mess li').bind('mousedown',function () {
		$('#register_form').form('email_name').value($(this).text());
	});
	function email_mess(_this) {
		$('#register_form .email_mess li').getThis(_this).css('background','#4C9ED9');
		$('#register_form .email_mess li').getThis(_this).css('color','white');
	}
	function info_email() {
		$('#register_form .info_email').show();
		$('#register_form .email_error').hide();
		$('#register_form .email_succ').hide();
	}
	//检查邮箱
	function check_email() {
		var email=$('#register_form').form('email_name').value();
		if (/^[\w\_\-\.]+@[a-zA-Z\_\-]+(\.[a-zA-Z]{2,6}){1,2}$/.test(email)) {
			return true;
		}
	}
	//年月日
	var year=$('#register_form').form('year_name');
	var month=$('#register_form').form('month_name');
	var day=$('#register_form').form('day_name');
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	for (var i = new Date().getFullYear(); i >= 1950; i--) {
		year.first().add(new Option(i,i),undefined);
	}
	for (var i = 1; i <= 12; i++) {
		month.first().add(new Option(i,i),undefined);
	}
	year.bind('change',birthday);
	month.bind('change',birthday);
	day.bind('change',function () {
		if (check_birt()) {
			$('#register_form .birt_error').hide();
		}else {
			$('#register_form .birt_error').show();
		}
	});
	// 检查年月日
	function check_birt() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) {
			return true;
		}
	}
	function birthday() {
		var year=$('#register_form').form('year_name').value();
		if ( year != 0 && month.value() != 0) {
			var month_day=0;
			day.first().options.length=1;
			if (isArray(day31,month.value())) {
				month_day=31;
			}else if (isArray(day30,month.value())) {
				month_day=30;
			}else if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				month_day=29;
			}else {
				month_day=28;
			}
			for (var i = 1; i <= month_day; i++) {
				day.first().add(new Option(i,i),undefined);
			}
		}else {
			day.first().options.length=1;
		}
	}
	//建议字数记录
	$('#register_form').form('ps_name').bind('keyup',function () {
		ps_count();
		this.value=this.value.replace(/(^\s*)/,'');
	}).bind('paste',function () {
		setTimeout(function () {
			ps_count();
		},50);
		this.value=this.value.replace(/\s/g,'');
	});
	$('#register_form .clear_count .clear').bind('click',function () {
		var clear_value=$('#register_form').form('ps_name').value().substring(0,200);
		$('#register_form').form('ps_name').value(clear_value);
		$('#register_form .ps_count').show();
		$('#register_form .clear_count').hide();
		$('#register_form .ps_count strong').html(0);
	});
	function ps_count() {
		var count = 200 - $('#register_form').form('ps_name').value().length;
		$('#register_form .ps_count strong').html(count);
		if (count < 0) {
			$('#register_form .ps_count').hide();
			$('#register_form .clear_count').show();
			$('#register_form .clear_count strong').html(Math.abs(count));
		}else if ( count > 0){
			$('#register_form .ps_count').show();
			$('#register_form .clear_count').hide();
		}
	}
	//刷新记录输入字数
	$(window).bind('load', ps_count);
	//提交
	$('#register_form').form('button_name').click(function () {
		var flag=true;
		//用户名
		if (!check_user()) {
			flag=false;
			$('#register_form .info_error').show();
		}
		// 密码
		if (!check_pass()) {
			flag=false;
			$('#register_form .pass_error').show();
		}
		// 确认密码
		if (!check_affirm()) {
			flag=false;
			$('#register_form .affirm_error').show();
		}
		// 提问
		if (!check_question()) {
			flag=false;
			$('#register_form .question_error').show();
		}
		// 回答
		if (!check_answer()) {
			flag=false;
			$('#register_form .answer_error').show();
		}
		// 邮箱
		if (!check_email()) {
			flag=false;
			$('#register_form .email_error').show();
		}
		// 年月日
		if (!check_birt()) {
			flag=false;
			$('#register_form .birt_error').show();
		}
		if (flag) {
			var _this=this;
			this.disabled = true;
			$('#register_form .info_reg').show();
			$('#register_form .button_type').css('backgroundPosition','right');
			ajax({
				method:'post',
				url:'register.php',
				data:serialize(getId('register_form')),
				success:function (argument) {
					if (argument == 1) {
						$('#register_form .info_reg').hide();
						$('#register_form .reg_succ').show();
						setTimeout(function () {
							_this.disabled = false;
							$('#register_form .reg_succ').hide();
							$('#register_form .button_type').css('backgroundPosition','left');
							$('#register').hide();
						},1500);
					}
				},
				async:true
			});
		}
	});
	// 导航
	$('#nav .about li').hover(function () {
		var  get_offsetLeft = $(this).first().offsetLeft;
		$('#nav .nav_bg').animated({
			attr:'left',
			target: 20 + get_offsetLeft,
			fn:function () {
				$('#nav .white').animated({
					attr: 'left',
					target: - get_offsetLeft
				});
			}
		});
	},function () {
		$('#nav .nav_bg').animated({
			attr:'left',
			target: 20,
			fn:function () {
				$('#nav .white').animated({
					attr: 'left',
					target: 0
				});
			}
		});
	});
	//侧边教育博文
	$('#sidebar h2').toggle(function () {
		$(this).next().animated({
			attr:'height',
			target:0
		});
	},function () {
		$(this).next().animated({
			attr:'height',
			target:150
		});
	});
	//发表博文
	$('#header .article').click(function () {
		$('#lock').lock().show();
		$('#article_pub').fixedCenter(580,337).show();
	});
	$('#article_pub .close').click(function () {
		$('#article_pub').hide();
		$('#lock').hide();
		$('#acticle_form .check').hide();
	});
	//检查发表文章是否为空
	function check_title_content() {
		if ($('#acticle_form').form('title_name').value().length != 0 && $('#acticle_form').form('content_name').value().length != 0) {
			return true;
		}
	}
	// 文章写入数据库
	$('#acticle_form').form('button_name').click(function () {
		var flag = true;
		if (!check_title_content()){
			flag = false;
			$('#acticle_form .check').show();
		}
		if (flag) {
			var _this = this;
			_this.disabled = true;
			$(_this).css('backgroundPosition','right');
			$('#article_pub .info').show();
			ajax({
				method:'post',
				url:'add_article.php',
				data:serialize(getId('acticle_form')),
				success:function (argument) {
					if (argument == 1){
						$('#article_pub .info').hide();
						$('#article_pub .info_succ').show();
						setTimeout(function () {
							$('#lock').hide();
							_this.disabled = false;
							$('#article_pub').hide();
							$('#acticle_form').first().reset();
							$('#article_pub .info_succ').hide();
							$(_this).css('backgroundPosition','left');
							window.location.href="index.html";
						},500);
					}
				},
				async:true
			});
		}
	});
	//获取文章
	$('#article').html('<div class="loading"></div>')
	ajax({
		method:'post',
		url:'get_acticle.php',
		data:{},
		success:function (argument) {
			var json = JSON.parse(argument);
			var getContent = '';
			for (var i = 0; i < json.length; i++) {
				getContent += '<div class="content"><h2>'+json[i].title+'<em>'+json[i].date+'</em></h2><p>'+json[i].content+'</p></div>';	
			}
			$('#article').html(getContent);
			for (var i = 0; i < json.length; i++) {
				$('#article .content').getThis(i).animated({
					attr:'opacity',
					target:100
				});
			}
		},
		async:true
	});
	//换肤界面显示
	$('#header .skin').click(function () {
		$('#lock').lock().show();
		$('#skin').center(630,300).show();
		$(window).bind('scroll',function () {
			$('#skin').animated({
				mul:{
					top:getScroll().top + (getInner().height - 300)/2
				}
			});
		});
	});
	$('#skin .close').click(function () {
		$('#lock').hide();
		$('#skin').hide();
	});
	//换肤设置
	ajax({
		method:'post',
		url:'skin.php',
		data:{
			type:'all'
		},
		success:function (argument) {
			var json = JSON.parse(argument);
			var getHtml = '';
			for (var i = 0; i < json.length; i++) {
				getHtml += '<ul><li><figure><img src="images/'+json[i].small+'" big_src="'+json[i].big+'" color="'+json[i].color+'"  /></figure></li></ul>';
			}
			$('#skin .skin_bg').html(getHtml);
			$('#skin img').click(function () {
				$('body').css('background', $(this).attr('color')+' '+'url(images/'+$(this).attr('big_src')+') repeat-x');
				var _this = this;
				ajax({
					method:'post',
					url:'skin.php',
					data:{
						type:'set',
						big_src: $(_this).attr('big_src')
					},
					success:function (argument) {
						if (argument == 1) {

						}
					},
					async:true
				});
			});
		},
		async:true
	});
	//默认皮肤
	ajax({
		method:'post',
		url:'skin.php',
		data:{
			type:'main'
		},
		success:function (argument) {
			var json = JSON.parse(argument);
			$('body').css('background',json.color+' '+'url(images/'+json.big+') repeat-x');
		},
		async:true
	});
	//轮播
	$('#banner img').opacity(0);
	$('#banner img').getThis(0).opacity(100);
	$('#banner li').getThis(0).css('background','black');
	$('#banner strong').html($('#banner img').getThis(0).attr('alt'));
	var index = 1;
	var setBaner = setInterval(getBanner,3000);
	$('#banner li').hover(function () {
		clearInterval(setBaner);
		if ($(this).css('backgroundColor') != 'rgb(0, 0, 0)') {
			banner(this,index == 0 ? $('#banner img').length() - 1 : index - 1);
		}
	},function () {
		index = $(this).index()+1;
		setBaner = setInterval(getBanner,3000);
	});
	function banner(obj,prev) {
		$('#banner li').css('background','#6F6F6F');
		$(obj).css('background','black');
		$('#banner strong').html($('#banner img').getThis($(obj).index()).attr('alt'));
		$('#banner img').getThis(prev).animated({
			attr:'opacity',
			target:0
		}).css('z-index','1');
		$('#banner img').getThis($(obj).index()).animated({
			attr:'opacity',
			target:100
		}).css('z-index','2');
	}
	function getBanner() {
		if (index >= $('#banner img').length()) {
			index = 0;
		}
		banner($('#banner li').getThis(index).first(),index == 0 ? $('#banner img').length()-1 : index-1);
		index++;
	}
	//图片延迟加载
	function imgWait() {
		setTimeout(function () {
			for (var i = 0; i < $('#photo img').length(); i++) {
				if (getInner().height + getScroll().top >= offsetTop($('#photo').first())) {
					$('#photo img').getThis(i).attr('src',$('#photo img').getThis(i).attr('small_src'));
				}
			}	
		},100);
	}
	$(window).bind('resize',imgWait);
	$(window).bind('load',imgWait);
	$(window).bind('scroll',imgWait);
	//显示大图
	$('#photo img').click(function () {
		$('#lock').lock().show();
		$('#big_photo').fixedCenter(620,500).show();
		$('#big_photo .big_img img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px').css('left','290px').opacity(100);
		var tempImg = new Image();
		$(tempImg).bind('load',function () {
			$('#big_photo .big_img img').attr('src',tempImg.src).animated({
				attr:'opacity',
				target:100
			}).css('width','600px').css('height','450px').css('top','8px').css('left','8px').opacity(0);
		});
		tempImg.src = $(this).attr('big_src');
		var children = this.parentNode.parentNode;
		prev_next_img(children);
	});
	//关闭
	$('#big_photo .close').click(function () {
		$('#lock').hide();
		$('#big_photo').hide();
		$('#big_photo .big_img img').attr('src','images/loading.gif').css('top','190px').css('left','290px');
	});
	//上下图按钮
	$('#big_photo .big_img .left').hover(function () {
		if (system.msie || system.ie) {
			$('#big_photo .big_img .up').animated({
				attr:'opacity',
				target:100
			});
		}
	},function () {
		if (system.msie || system.ie) {
			$('#big_photo .big_img .up').animated({
				attr:'opacity',
				target:0
			});
		}
	});
	$('#big_photo .big_img .right').hover(function () {
		if (system.msie || system.ie) {
			$('#photo .big_img .down').animated({
				attr:'opacity',
				target:100
			});
		}
	},function () {
		if (system.msie || system.ie) {
			$('#big_photo .big_img .down').animated({
				attr:'opacity',
				target:0
			});
		}
	});
	//点击显示上下图
	$('#big_photo .big_img .left').click(function () {
		imgLoad(this);
		var children = $('#photo img').getElement(prevIndex($('#big_photo .big_img img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});
	$('#big_photo .big_img .right').click(function () {
		imgLoad(this);
		var children = $('#photo img').getElement(nextIndex($('#big_photo .big_img img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});
	//大图上下加载等待
	function imgLoad(_this) {
		$('#big_photo .big_img img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px').css('left','290px').opacity(100);
		var current =  new Image();
		$(current).bind('load',function () {
			$('#big_photo .big_img img').attr('src',current.src).animated({
				attr:'opacity',
				target:100
			}).css('width','600px').css('height','450px').css('top','8px').css('left','8px').opacity(0);
		});
		current.src = $(_this).attr('src');
	}
	//加载上下图路径
	function prev_next_img(children) {
		var prev = prevIndex($(children).index(),children.parentNode);
		var next = nextIndex($(children).index(),children.parentNode);
		var prevImg = new Image();
		var nextImg = new Image();
		prevImg.src = $('#photo img').getThis(prev).attr('big_src');
		nextImg.src = $('#photo img').getThis(next).attr('big_src');
		$('#big_photo .big_img .left').attr('src',prevImg.src);
		$('#big_photo .big_img .right').attr('src',nextImg.src);
		$('#big_photo .big_img img').attr('index',$(children).index());
		$('#big_photo .big_img .count').html((parseInt($(children).index())+1)+'/'+$('#photo img').length());
	}
	//小图按钮 位置显示
	function small_posi(dire,one,two,three) {
		$('#big_photo '+dire).toggle(function () {
			$('#big_photo .small_img .small').animated({
				attr:'left',
				target:one
			});
		},function () {
			$('#big_photo .small_img .small').animated({
				attr:'left',
				target:two
			});
		},function () {
			$('#big_photo .small_img .small').animated({
				attr:'left',
				target:three
			});
		});
	}
	small_posi('.small_left',-105,-320,-850);//left
	small_posi('.small_right',-530,-1063,0);//right
	//点击100小图显示大图
	$('#big_photo .small_img .small img').click(function () {
		var tempImg = new Image();
		var children = this.parentNode;
		$(tempImg).bind('load',function () {
			$('#big_photo .big_img img').attr('src',tempImg.src).animated({
				attr:'opacity',
				target:100
			}).css('width','600px').css('height','450px').css('top','8px').css('left','8px').opacity(0);
		});
		tempImg.src = $('#photo img').getThis($(children).index()).attr('big_src');
		$('#big_photo .big_img .count').html((parseInt($(children).index())+1)+'/'+$('#photo img').length());
		prev_next_img(children);
	});
});
