<?php
	require 'config.php';
	if ($_POST['type'] == 'all') {
		$query = mysql_query("SELECT small,big,color FROM skin LIMIT 0,6")or die(mysql_error());
		$json = '';
		while (!! $row = mysql_fetch_array($query,MYSQL_ASSOC)) {
			$json .= json_encode($row).',';
		}
		echo '['.substr($json, 0,strlen($json)-1).']';
	}else if ($_POST['type'] == 'set') {
		mysql_query("UPDATE skin SET flag = 0 WHERE flag = 1 ")or die(mysql_errno());
		mysql_query("UPDATE skin SET flag = 1 WHERE big = '{$_POST['big_src']}' ")or die(mysql_errno());
		echo mysql_affected_rows();
	}else if ($_POST['type'] == 'main') {
		$query = mysql_query("SELECT big,color FROM skin WHERE flag = 1 ");
		echo json_encode(mysql_fetch_array($query,MYSQL_ASSOC));
	}
	mysql_close();
?>