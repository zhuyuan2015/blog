<?php
	// 注册信息写入数据库
	require 'config.php';
	$_birthday=$_POST['year_name'].'-'.$_POST['month_name'].'-'.$_POST['day_name'];
	$query="INSERT INTO register (user,pass,question,answer,email,birthday,ps,reg_time)
		VALUES ('{$_POST['user_name']}',
		'{$_POST['pass_name']}',
		'{$_POST['question_name']}',
		'{$_POST['answer_name']}',
		'{$_POST['email_name']}',
		'{$_birthday}',
		'{$_POST['ps_name']}',
		NOW())";
	mysql_query($query)or die(mysql_error());
	echo mysql_affected_rows();
	mysql_close();
?>