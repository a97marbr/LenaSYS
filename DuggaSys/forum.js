/********************************************************************************

   Globals

*********************************************************************************/

var sessionkind=0;
var querystring = parseGet();

//----------------------------------------
// Commands:
//----------------------------------------

function initThread()
{
	threadAccess();

	getComments();
	getThread();
}

function threadAccess()
{
	console.log(querystring);
}

function getThread()
{
	AJAXService("GETTHREAD",{threadId:querystring["threadId"]},"GETTHREAD");
}

function getComments()
{
  AJAXService("GETCOMMENTS",{threadId:querystring["threadId"]},"GETCOMMENTS");
}

function createThread()
{
	var courseId = 1;
	var topic = "Din mormor";
	var description = "Din mormor är fin";
	var userID = "1";
	AJAXService("CREATETHREAD",{courseId:courseId,userID:userID,topic:topic,description:description},"CREATETHREAD");
}

function makeComment()
{
	var threadId = 1;
	var userID = 1;
	var text = "hehe";
	AJAXService("MAKECOMMENT",{threadId:threadId,userID:userID,text:text},"MAKECOMMENT");
}


function testerror(jqXHR, textStatus, errorThrown)
{
	console.log("textStatus:" + textStatus);
  console.log('jqXHR.responseText: ' + jqXHR.responseText);
	console.log('errorThrown: ' + errorThrown.stack);
}

//----------------------------------------
// Renderer
//----------------------------------------

function returnedThread(array)
{

	console.log(array);
	$(".threadTopic").html(array["thread"]["topic"]);
	$("#threadDescr").html(array["thread"]["description"]);
	var str = "<span id='threadDate'>";
			str += 	array["thread"]["datecreated"].substring(0, 16);
			str += "</span> by <span id='threadCreator'>a97marbr</span>";
	$("#threadDetails").html(str);
}

function returnedComments(array)
{
	// Adds the comment header with the amount of comments.
	var commentLength = array["comments"].length;
	var threadCommentsHeaderStr = "<div id=\"threadCommentsHeader\"> Comments ("  +  commentLength  + ") </div>"
	
	$("#threadComments").append(threadCommentsHeaderStr);

	var threadCommentStr="";
	threadCommentStr = "<div class=\"allComments\">";
	
	
	// Iterates through all the comments
	$.each(array["comments"], function(index, value){

		threadCommentStr +=
		"<div class=\"threadComment\">" +
			"<div class=\"commentDetails\"><span id=\"commentUser\">Skrivet av: " + value["uid"]  +   "</span></div>" +
			"<div class=\"commentContent\"> <p>" +  value["text"]  + "</p></div>" +
			"<div class=\"commentFooter\">" +
				"<input class=\"submit-button\" type=\"button\" value=\"Reply\" onclick=\"replyUI();\">" +
				"<input class=\"submit-button\" type=\"button\" value=\"Edit\" onclick=\"editUI();\">" +
				"<input class=\"submit-button\" type=\"button\" value=\"Delete\" onclick=\"deleteComment();\">" +
			"</div>" +
			
			"<div class=\"commentDate\">" + (value["datecreated"]).substring(0,10) + "</div></div>";
		
		// Appends the comment
		$("#threadComments").append(threadCommentStr);


	});
	threadCommentStr += "</div>";

}

function showThread(thread)
{
	console.log(thread);
}

function showComment(comment)
{
	console.log("asd");
	console.log(comment);
}

function error(xhr, status, error)
{
	console.log("ERROOR");
	console.log(error);
	console.log(status);
	console.log(xhr);
}
