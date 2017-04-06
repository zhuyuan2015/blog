<?php
	require('config.php');
	$query="INSERT INTO article (title,content,date) 
	VALUES('{$_POST['title_name']}','{$_POST['content_name']}',NOW())";
	mysql_query($query)or die(mysql_errno());
	echo mysql_affected_rows(); //写入成功返回1
	mysql_close();
?> 