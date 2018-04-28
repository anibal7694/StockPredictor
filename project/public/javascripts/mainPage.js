function fn(){
  if(localStorage.getItem("status")==0)
            location.href="/";
  else{
    (function($) { // Begin jQuery
        $(function() { // DOM ready
          // If a link has a dropdown, add sub menu toggle.
          $('nav ul li a:not(:only-child)').click(function(e) {
            $(this).siblings('.nav-dropdown').toggle();
            // Close one dropdown when selecting another
            $('.nav-dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
          });
          // Clicking away from dropdown will remove the dropdown class
          $('html').click(function() {
            $('.nav-dropdown').hide();
          });
          // Toggle open and close nav styles on click
          $('#nav-toggle').click(function() {
            $('nav ul').slideToggle();
          });
          // Hamburger to X toggle
          $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
          });
        }); // end DOM ready
      })(jQuery); // end jQuery
      favlist();
      setInterval(function(){ console.log("fetch");
       favlist(); }, 1000*60);
    }
   
}

var companies;
var emailId =localStorage.getItem("email");
function favlist(){
  
  console.log(emailId);
  dataString={email:emailId};
  $.ajax({
		
    url: 'http://localhost:8080/fav-info',
    type: 'post',
    data: dataString,
    contentType: "application/x-www-form-urlencoded",
    datatype: "json",
    
    success: function(result)
    {
        console.log(result);
        
        fetch(result[0].favourite_companies);
        
                
    },
    error: function(XMLHttpRequest, textStatus, errorThrown)
    {
        alert("error");
        
    },
    
});

}

function stock(index){
  localStorage.setItem("company",index);
  location.href="stockdetails"
}

function fetch(listOfFav){
  
  //console.log(listOfFav);
  var cmpindex={};
 ;
  $.ajax({
		
		url: 'http://localhost:8080/last-minute-stocks',
		type: 'get',
		data: '',
		contentType: "application/x-www-form-urlencoded",
		datatype: "json",
		
		success: function(result)
		{
      
      
      $('#fetch').html(result);
      let currData= (result);
      let content="";
      let marq="<div style='display: inline-flex;'>";
      companies= localStorage.getItem("cmpDetails");
      console.log(currData);
      
      companies = JSON.parse(companies)     
      console.log(companies);
      content+="<div class='row'>"
      
      
      for(i=0;i<companies.length;i++){
        
        let heart="fa fa-heart-o";
        let fav=0;

        if( listOfFav.includes(companies[i].company_symbol) ){
          heart="fa fa-heart";
          fav=1;  
        }
        
        let currsymb=companies[i].company_symbol+"";
        let currcompany=currData[currsymb][0];
        cmpindex[currsymb] = i;
        
        let diff=(currcompany.open-currcompany.close).toFixed(2);
        let col="#ff0000";
        let direction="down";
        if(diff>0){
          col="#03f303";
          direction="up";
        }
        else if(diff==0){
          col="#007bff";
          direction="right";  
        }
        marq+='<div style="display: inline-flex;">'+currsymb+' '+'$'+(currcompany.open).toFixed(2)+
        '<div style="display: inline-flex;color:'+ col +'">&nbsp<span>'+ 
        '<i style="display: inline-flex;color:'+ col +'" class="fa fa-caret-'+direction+'" ></i></span>'
        + diff +' (.2%)</div></div>&nbsp|&nbsp';
        
        
        content+='<div class="col-md-4"> <div class="snip" > <figure class="snip0020" >'+
        '<img class="snip0020" src="images/'+(companies[i].company_name).toLowerCase()+'.png" alt="sample18"/>'+
        '<figcaption>'+
        '<div onclick="stock('+i+')" style="cursor:pointer"><h2>$'+(currcompany.open).toFixed(2)+'<span style="color:'+ col +'">'+ 
        '<span><i class="fa fa-caret-'+direction+'" ></i></span>'+ diff +' (.2%)</span> </h2></div>'+
        '<div onclick="stock('+i+')" style="cursor:pointer"><p>Close'+ currcompany.close.toFixed(2) +
        ' <br> High '+(currcompany.high).toFixed(2)+
        ' <br> Low '+ (currcompany.low).toFixed(2) +'</p><div class="curl"></div></div>'+
        '</figcaption></figure><span class="fav" onclick="fav('+i+')"><i name="'+fav+'" id="'+i+'" class="'+heart+'"></i></span></div></div>'
      }
      content+="</div>"
      marq+="</div>"
      document.getElementById("comp").innerHTML=content;
      document.getElementById("marq").innerHTML=marq;
      $('#fetch').html("");
      //console.log(cmpindex);
  
  localStorage.setItem("cmpindex",JSON.stringify(cmpindex));
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error");
			/*returnVal = 'errorThrown';
			window.location="internetCheck.html";*/
		},
		
  });
  
  
  

}

function fav(i){
  let favourite=Number(document.getElementById(i).getAttribute("name"));
  if(favourite==0){
    change('/add-user-company',i)
    document.getElementById(i).setAttribute("class","fa fa-heart"); 
    document.getElementById(i).setAttribute("name","1");  
  }
  else{
    change('/delete-user-company',i)
    document.getElementById(i).setAttribute("class","fa fa-heart-o"); 
    document.getElementById(i).setAttribute("name","0");
  }
}

function change(ext,i){

    dataString={email:emailId,favourite_companies : companies[i].company_symbol}
    $.ajax({
      
      url: 'http://localhost:8080'+ext,
      type: 'post',
      data: dataString,
      contentType: "application/x-www-form-urlencoded",
      datatype: "json",
      
      success: function(result)
      {
          console.log(result);
          
          
          
                  
      },
      error: function(XMLHttpRequest, textStatus, errorThrown)
      {
          alert("error");
          
      },
      
  });
}



/*
setInterval(function(){ 
  console.log("Hello");
  fetch(); 
}, 1000*60);*/
