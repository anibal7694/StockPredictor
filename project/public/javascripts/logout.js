function logout(){

    let email=localStorage.getItem("email");
	
	para={"email":email, "status":"0"};
	$.ajax({
		
		url: 'http://localhost:8080/user-status',
		type: 'post',
		data: para,
		contentType: "application/x-www-form-urlencoded",
		datatype: "json",
		
		success: function(result)
		{
            localStorage.setItem("status",0);
            location.href="/";
					
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error");
			
		},
		
	});

    
  }