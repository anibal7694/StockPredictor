

function toggle(type){
	if(type=='0'){
		signupId.setAttribute("style","visibility:hidden;height:0px;");
		signinId.setAttribute("style","");
		
	}
	if(type=='1'){
		signinId.setAttribute("style","visibility:hidden;height:0px;");
		signupId.setAttribute("style","");
	}
}

function signin(){
	localStorage.setItem("email",inputEmail.value);
	
	
	var email=inputEmail.value;
	para={"email":email, "status":"1"};

	localStorage.setItem("status",1);
	$.ajax({
		
		url: 'http://localhost:8080/user-status',
		type: 'post',
		data: para,
		contentType: "application/x-www-form-urlencoded",
		datatype: "json",
		
		success: function(result)
		{
					document.getElementById("sign").submit();
					//window.location="signin";
					
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error");
			
		},
		
	});
	
}

function signup(){
	var pass=document.getElementById("password").value;
	
	var confirmPass=confirmPassword.value;
	
	if(pass !== confirmPass){
		document.getElementById("msg").innerHTML='<div class="alert alert-danger">Passwords do not match</div>';
		return;
	}

	document.getElementById("signupForm").submit();
	
	
}


function validatePassword(){
	var password = document.getElementById("password")
    var confirmpassword = document.getElementById("confirmPassword");

  if(password.value != confirmpassword.value) {
    confirmpassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmpassword.setCustomValidity('');
  }
}

