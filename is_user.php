<?php
	require ('config.php');
	$query = mysql_query("SELECT user FROM register WHERE user='{$_POST['user_name']}'");
	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo 1; // 1已有注册名
	}
	mysql_close();
?>