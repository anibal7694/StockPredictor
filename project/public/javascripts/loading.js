
function load(){
//setTimeout(function(){ 
    //console.log("Hello"); 

    $.ajax({
		
		url: 'http://localhost:8080/historical-all',
		type: 'get',
		contentType: "application/x-www-form-urlencoded",
		datatype: "json",
		
		success: function(result)
		{
            console.log(result);
            
            localStorage.setItem("hisData", ( result.hisData));
            //console.log(JSON.parse(hisData.value));    
            localStorage.setItem("cmpDetails", result.companyDetails);
            //alert("here")
            window.location="mainPage";
					
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error");
			
		},
		
	});

    
    
//}, 1000*60);
}
