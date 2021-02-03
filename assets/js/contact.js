$(document).ready(function(){
    $("input[name='reset']").click(function(){
      $(".error").hide();
      $(":text").css({"border":"1px solid #888"});
      $(".message").css({"border":"1px solid #888"});
    });
    });

function validation() {
	var name = document.getElementById('name').value;
	var mail = document.getElementById('mail').value;
	var number = document.getElementById('number').value;
	var message = document.getElementById('text').value;
	var gender = document.getElementsByName('gender');
	var content = new Array();
	var rename = /^[A-Z]{1}[a-z]{3,15}$/;
	var remail = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/; 
	var renumber = /^[0][6][0,1,2,3,4,5,6,8,9][\d]{6,7}$/;
	var remessage =/^[\d \w]{4,100}$/;
	
if(rename.test(name)){
		content.push(name);
		document.getElementById('name').style.border="2px solid #00ff00";
	}
	else{
		document.getElementById('name').style.border="2px solid #ff0000";
    }
if(remail.test(mail)){
		content.push(mail);
		document.getElementById('mail').style.border="2px solid #00ff00";
	}
	else{
		document.getElementById('mail').style.border="2px solid #ff0000";	
    }
if(renumber.test(number)){
		content.push(number);
		document.getElementById('number').style.border="2px solid #00ff00";
	}
	else{
		document.getElementById('number').style.border="2px solid #ff0000";
    }
if(remessage.test(message)){
		content.push(message);
		document.getElementById('text').style.border="2px solid #00ff00";
	}
	else{
		document.getElementById('text').style.border="2px solid #ff0000";
    }
var genderselect = "";
  for(var i = 0; i < gender.length; i++){
    if(gender[i].checked){
      genderselect = gender[i].checked;
    }
  }
  if(genderselect == 0){
   document.getElementById("radioerror").style.visibility = "visible";
   document.getElementById("radioerror").style.color = "red";
  }
  else{
    document.getElementById("radioerror").innerHTML = "Gender Selected";
    document.getElementById("radioerror").style.color = "green";
	content.push(genderselect);
  }
    if(content.length == 5)
	{
		alert("Your data has been sended")
    }
}
