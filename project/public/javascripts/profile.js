

  function profile(){
    if(localStorage.getItem("status")==0)
            location.href="/";
    else{
    var emailId =localStorage.getItem("email");

    dataString={email:emailId};
  $.ajax({
		
    url: 'http://localhost:8080/user-info',
    type: 'post',
    data: dataString,
    contentType: "application/x-www-form-urlencoded",
    datatype: "json",
    
    success: function(result)
    {
      console.log(result[0].favourite_companies);
      
        cmp=result[0].favourite_companies;
        document.getElementById("user").innerHTML=result[0].name
        console.log(cmp.length)
        let table="";
        for(i=0;i<cmp.length;i++){
          id=cmp[i][0].company_symbol+""
        table+="<tr><td style='cursor: pointer;' id="+i+" class="+id +" onclick='stock("+ i +")'>"+ cmp[i][0].company_symbol +"</td><td>"+ 
                cmp[i][0].twitter_sentimental_prediction+"</td><td>"
                +cmp[i][0].bayesian_prediction +"</td>"+
                "<td>"+cmp[i][0].svm_prediction +"</td><td>"+cmp[i][0].lstm_daily_prediction +"</td>"+
                "<td>"+cmp[i][0].lstm_live_prediction +"</td></tr>";
                    document.getElementById("cmpDetails").innerHTML=table;
        }
                
    },
    error: function(XMLHttpRequest, textStatus, errorThrown)
    {
        alert("error");
        
    },
    
});

}
  }

function stock(i){
  console.log(i);
  
  cmpindex=JSON.parse(localStorage.getItem("cmpindex"));
  cmp=document.getElementById(i).className;
  console.log("here",cmpindex[cmp]);
  
  localStorage.setItem("company",cmpindex[cmp]);
  location.href="stockdetails"    
}

