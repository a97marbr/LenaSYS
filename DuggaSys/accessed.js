var sessionkind=0;
var querystring=parseGet();
var versions;
var dataInfo;

AJAXService("GET",{cid:querystring['cid'],coursevers:querystring['coursevers']},"ACCESS");

//----------------------------------------
// Commands:
//----------------------------------------

function addUsers()
{
		var newUsersArr = new Array();
		newusers=$("#import").val();
		var myArr=newusers.split("\n");
		for (var i=0; i<myArr.length; i++){
				newUsersArr.push(myArr[i].split("\t"));
		}
		var newUserJSON = JSON.stringify(newUsersArr);	
		AJAXService("ADDUSR",{cid:querystring['cid'],newusers:newUserJSON,coursevers:querystring['coursevers']},"ACCESS");
		$("#createUsers").css("display","none");
}

function showCreateUsersPopup()
{
	$("#createUsers").css("display","block");
}

function hideCreateUsersPopup()
{
	$("#createUsers").css("display","none");
}

function changeAccess(cid,uid,val)
{
	AJAXService("ACCESS",{cid:cid,uid:uid,val:val,coursevers:querystring['coursevers']},"ACCESS");
}

function selectUser(uid,username,ssn,firstname,lastname,access,className)
{
	// Set Name		
	$("#firstname").val(firstname);
	$("#lastname").val(lastname);
		
	// Set User name
	$("#usrnme").val(username);
		
	//Set SSN
	$("#ussn").val(ssn);
	if (className != "null" || className != "UNK") {$("#class").val(className);}
	$("#uid").val(uid);	
	$("#editUsers").css("display","block");
}

function updateUser()
{
	var ussn=$("#ussn").val();
	var usrnme=$("#usrnme").val();
	var firstname=$("#firstname").val();
	var lastname=$("#lastname").val();
	var uid=$("#uid").val();
	var className=$("#class").val();
	
	AJAXService("UPDATE",{ssn:ussn,uid:uid,firstname:firstname,lastname:lastname,username:usrnme,className:className,cid:querystring['cid'],coursevers:querystring['coursevers']},"ACCESS");
	
	$("#editUsers").css("display","none");
}

function closeEdituser()
{
	$("#editUsers").css("display","none");
}

function resetPw(uid,username)
{
	rnd=randomstring();

	window.location="mailto:"+username+"@student.his.se?Subject=LENASys%20Password%20Reset&body=Your%20new%20password%20for%20LENASys%20is:%20"+rnd+"%0A%0A/LENASys Administrators";
	
	AJAXService("CHPWD",{cid:querystring['cid'],uid:uid,pw:rnd,coursevers:querystring['coursevers']},"ACCESS");
}

/**
 * Selects column to be sorted from table.
 * @param prop Column to sort
 * @returns {Function} Sorting function with the correct property to fetch.
 */
function propComparator(prop) {
	var propt = prop.split(' ').join('').toLocaleLowerCase();
    return function(a, b) {
		if(!a[propt] || !b[propt]) {
            return 0;
        }
        else{
            var aName = a[propt].toLowerCase();
            var bName = b[propt].toLowerCase();
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		}
    }
}
var bool = true;
/**
 * Sort based on what cell was pressed. Toggles between sort and reverse sort.
 * @param column
 */
function sortData(column){
    if(bool) {
        dataInfo['entries'].sort(propComparator(column));
    }
    else{
        dataInfo['entries'].sort(propComparator(column)).reverse();
	}
    returnedAccess(dataInfo);
    bool = !bool;
}
//----------------------------------------
// Renderer
//----------------------------------------
function returnedAccess(data)
{
    dataInfo = data;
	// Fill section list with information
	str="";
	if (data['entries'].length > 0) {

		str+="<table class='list'>";
        str+="<tr><th class='first' onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; width:140px; cursor: pointer;'>Username</th>" +
			"<th onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; width:150px; cursor: pointer;'>SSN</th>" +
			"<th onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; cursor: pointer;'>First Name</th>" +
			"<th onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; cursor: pointer;'>Last Name</th>" +
			"<th onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; width:150px; cursor: pointer;'>Class</th>" +
			"<th onclick='sortData($( this ).text())' style='text-align:left; padding-left:8px; width:100px; cursor: pointer;'>Added</th>" +
			"<th style='text-align:left; padding-left:8px; width:90px;'>Access</th>" +
			"<th style='text-align:left; padding-left:8px; width:90px;'>Settings</th>" +
			"<th class='last' style='text-align:left; padding-left:8px; width:120px;'>Password</th></tr>";
		for(i=0;i<data['entries'].length;i++){
			var item=data['entries'][i];

			// If this 
			if(parseFloat(item['newly'])<10){
					str+="<tr style='background:#efd;'>";						
			}else{
					str+="<tr>";			
			}

			str+="<td>"+item['username']+"</td>";
			str+="<td>"+item['ssn']+"</td>";
			str+="<td>"+item['firstname']+"</td>";
			str+="<td>"+item['lastname']+"</td>";
			str+="<td>"+item['class']+"</td>";
			str+="<td>"+item['modified'].substr(0,10)+"</td>";
			
			str+="<td valign='center'><select onChange='changeAccess(\""+querystring['cid']+"\",\""+item['uid']+"\",this.value);' onclick='return false;' id='"+item['uid']+"'>";
			
			if(item['access']=="R"){
				str+="<option selected='selected' value='R'>Student</option>";
			}else{
				str+="<option value='R'>Student</option>";
			}
			if(item['access']=="W"){
				str+="<option selected='selected' value='W'>Teacher</option>";
			}else{
				str+="<option value='W'>Teacher</option>";
			}
			if(item['access']=="N"){ 
				str+="<option selected='selected' value='N'>None</option>"
			}else{ 
				str+="<option value='N'>None</option>";
			}
			str+="</select>";
			
			
			str+="<td><img id='dorf' style='float:none; margin-right:4px;' src='../Shared/icons/Cogwheel.svg' ";
			str+=" onclick='selectUser(\""+item['uid']+"\",\""+item['username']+"\",\""+item['ssn']+"\",\""+item['firstname']+"\",\""+item['lastname']+"\",\""+item['access']+"\",\""+item['class']+"\");'></td>";
			str+="<td><input class='submit-button' type='button' value='Reset PW' onclick='if(confirm(\"Reset Password for "+item['username']+" ?\")) resetPw(\""+item['uid']+"\",\""+item['username']+"\"); return false;' style='float:none;'></td>";
			str+="</tr>";
		}
		str+="</table>";
	}
	var slist=document.getElementById("accessedcontent");
	slist.innerHTML=str;
	
	if(data['debug']!="NONE!") alert(data['debug']);
}