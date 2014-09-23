<?php

//---------------------------------------------------------------------------------------------------------------
// editorService - Saves and Reads content for Code Editor
//---------------------------------------------------------------------------------------------------------------

// Missing Functionality
//		New Code Example + New Dugga
//		Graying link accordingly

date_default_timezone_set("Europe/Stockholm");

// Include basic application services!
include_once "basic.php";
include_once "../Shared/sessions.php";


// Connect to database and start session
pdoConnect();
session_start();

$opt=getOP('opt');
$cid=getOP('cid');
$coursename=getOP('coursename');
$visibility=getOP('visib');
$activevers=getOP('activevers');
$activeedvers=getOP('activeedvers');

if(isset($_SESSION['uid'])){
		$userid=$_SESSION['uid'];
}else{
		$userid="UNK";		
} 

$hr="";
if(isSuperUser($userid)){
		$ha=true;
}else{
		$ha=false;
}

$debug="NONE!";	

//------------------------------------------------------------------------------------------------
// Services
//------------------------------------------------------------------------------------------------

if($ha){

		// The code for modification using sessions
		if(strcmp($opt,"DEL")===0){
		}else if(strcmp($opt,"NEW")===0){
				$query = $pdo->prepare("INSERT INTO course (coursecode,coursename,visibility,creator) VALUES(:coursecode,'New Course',0,:usrid)");
				$query->bindParam(':usrid', $userid);
				$query->bindParam(':coursecode', makeRandomString(8));				
				if(!$query->execute()) {
					$error=$query->errorInfo();
					$debug="Error updating entries".$error[2];
				}
		}else if(strcmp($opt,"UPDATE")===0){
				$query = $pdo->prepare("UPDATE course SET coursename=:coursename, visibility=:visibility, activeversion=:activevers, activeedversion=:activeedvers WHERE cid=:cid;");
				$query->bindParam(':cid', $cid);
				$query->bindParam(':coursename', $coursename);
				$query->bindParam(':visibility', $visibility);
				$query->bindParam(':activevers', $activevers);
				$query->bindParam(':activeedvers', $activeedvers);
		
				if(!$query->execute()) {
					$error=$query->errorInfo();
					$debug="Error updating entries".$error[2];
				}
		}


}

//------------------------------------------------------------------------------------------------
// Retrieve Information			
//------------------------------------------------------------------------------------------------

$entries=array();
if($ha){
		$query=$pdo->query("SELECT coursename,coursecode,cid,visibility,activeversion,activeedversion FROM course WHERE visibility<3 ORDER BY coursename");
}else{
		$query=$pdo->query("SELECT coursename,coursecode,cid,visibility,activeversion,activeedversion FROM course WHERE visibility>0 and visibility<3 ORDER BY coursename");
}
$result=$query->execute();
if (!$result){
		$debug="SQL Query Error: ".$pdo->errorInfo();
}else{
		foreach($query->fetchAll() as $row) {
			array_push(
				$entries,
				array(
					'cid' => $row['cid'],
					'coursename' => $row['coursename'],
					'coursecode' => $row['coursecode'],
					'visibility' => $row['visibility'],
					'activeversion' => $row['activeversion'],
					'activeedversion' => $row['activeedversion']
				)
			);
		}
} 

$versions=array();
$query=$pdo->query("SELECT course.cid as cid,coursename,vers FROM course LEFT OUTER JOIN listentries ON listentries.cid=course.cid GROUP BY vers;");
$result=$query->execute();
if (!$result){
		$debug="SQL Query Error: ".$pdo->errorInfo();
}else{
		foreach($query->fetchAll() as $row) {
			array_push(
				$versions,
				array(
					'cid' => $row['cid'],
					'coursename' => $row['coursename'],
					'vers' => $row['vers']
				)
			);
		}
} 
			
$array = array(
	'entries' => $entries,
	'versions' => $versions,
	"debug" => $debug,
	'writeaccess' => $ha,
	'readaccess' => $hr,
);

echo json_encode($array);

?>