<?php
	require('config.php');
	$_pass = $_POST['pass_name'];
	$query = mysql_query("SELECT user FROM register WHERE user='{$_POST['user_name']}' AND pass='{$_pass}' ");
	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo 1; //成功
	}else {
		echo 0;
	}
	mysql_close();
?>