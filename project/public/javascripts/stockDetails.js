var chart=""
var companyFeed=""
function graph(cmp) {

 chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	zoomEnabled: true,
	title:{
		text: cmp 
	},
	axisX: {
        stripLines: [{
            value: "",
            color:"#d8d8d8",
            showOnTop: true
          }],
			/*labelFormatter: function (e) {
				return CanvasJS.formatDate( e.value, "MMM Y");
    },*/labelAngle: 0},
	axisY :{
        gridThickness: 0,
		includeZero:false
	},
	data: currdata 
});
chart.render();



}

function onMouseover(e){
    chart.axisX[0].stripLines[0].remove();
    //alert(e.dataPoint.x)
  chart.axisX[0].addTo("stripLines", {value: e.dataPoint.x, color:"#d8d8d8",showOnTop: true});   
}
/*
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];*/
var currdata=[];

    function fetch(){
                    let cmp = JSON.parse(localStorage.getItem("cmpDetails"));
                    
                    let index = Number(localStorage.getItem("company"));
                    currdata=[];
                    //alert(dateStart.value+"..."+dateEnd.value)
                    let hisData = JSON.parse( localStorage.getItem("hisData"));
                    //alert(cmp+".."+hisData.length)
                   // console.log(hisData);
                    
					var y = 0;
					var data = [];
					var dataSeries = { type: "splineArea" };
                    var dataPoints = [];
                    let startdate=dateStart.value;
                    let lastdate=dateEnd.value;
                    if(startdate==""){
                        startdate=new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                    }
                    else
                        startdate=new Date(startdate);
                    if(lastdate=="")
                        lastdate=new Date();
                    else
                        lastdate=new Date(lastdate);   
                    g=0;
                    currCompany=(cmp[index]);
                    
                    hisData=hisData[currCompany.company_symbol];
                    //console.log(hisData);
                    
					for (var i = 0; i < hisData.length ; i ++) {
                        let date= new Date(hisData[i].date);
                        date.setDate(date.getDate() + 1);
                        if(date>= startdate && date<=lastdate  && hisData[i].company==currCompany.company_symbol){
                            g++;
                            a="onMouseover"
                            dataPoints.push({
                                x: date ,
                                y: hisData[i].close,
                                //mouseover: onMouseover               
                            });
                        }
					}
					
					dataSeries.dataPoints = dataPoints;
                    currdata.push(dataSeries);
                   // console.log(currdata)
                    graph(currCompany.company_name);
                    companyFeed=currCompany.company_symbol
                    
                    
                    feed(companyFeed);      
                    livedata(currCompany);

                    setInterval(function(){ console.log("fetch");
                        livedata(currCompany); }, 1000*60);
                    
                    
    }

    function load(){
        if(localStorage.getItem("status")==0)
            location.href="/";
        else{
        let cmp = JSON.parse(localStorage.getItem("cmpDetails"));
        
        let comp=""
        for(i=0;i<cmp.length;i++){
            comp+='<li class="nav-item" data-toggle="tooltip" data-placement="right">'+
                  '<a class="nav-link" onclick="changeCmp('+i+')">'+
                  '<span class="nav-link-text">'+cmp[i].company_name+'</span></a></li>';
        }
        document.getElementById("companies").innerHTML=comp;
        fetch();
    }
        
    }


    function livedata(livecmp){

        //console.log(livecmp.company_symbol);
        let cmpindex=JSON.parse(localStorage.getItem("cmpindex"));
        let index=cmpindex[livecmp.company_symbol]
        //console.log(index);
        
        dataString={company_symbol : livecmp.company_symbol}
        //console.log(dataString);
        let cmp = JSON.parse(localStorage.getItem("cmpDetails"));
        $.ajax({
		
            url: 'http://localhost:8080/live-data-company',
            type: 'post',
            data: dataString,
            contentType: "application/x-www-form-urlencoded",
            datatype: "json",
            
            success: function(result)
            {
                console.log(result);
                let table="<tr><td>"+ livecmp.company_symbol +"</td><td>"+ cmp[index].svm_prediction +"</td><td>"+result[0].open +"</td>"+
                              "<td>"+result[0].high +"</td><td>"+result[0].close +"</td>"+
                              "<td>"+result[0].low +"</td></tr>";
                    document.getElementById("cmpDetails").innerHTML=table;
                
                
                        
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                alert("error");
                
            },
            
        });

        
    }
// to change data according to given company
    function changeCmp(index){
        localStorage.setItem("company",index);
        fetch();
    }

    function feed(company){
        console.log("asdsda"+company);
        
        let currfeeds=""
        $.ajax({
		
            url: 'https://api.iextrading.com/1.0/stock/'+ company.toLowerCase() +'/news',
            type: 'get',
            contentType: "application/x-www-form-urlencoded",
            datatype: "json",
            
            success: function(result)
            {
                console.log(result);
                        document.getElementById("header").innerHTML="Feed";
                        currfeeds+='<div id="front" class="front">'
                       for(i=0;i<4;i++){
                           let date=new Date(result[i].datetime)+"";
                           currfeeds+=' <a class="list-group-item list-group-item-action" href="#">'+
                            '<div class="media"><img class="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="">'+
                            '<div class="media-body">'+'<strong>'+result[i].headline+'</strong>'+
                            '<div class="text-muted smaller">Posted at '+(date).split("GMT")[0]+'</div>'+
                            '</div> </div></a>'
                       }     

                       currfeeds+='</div>'+'<div id="back" class="back">' 
                       +'<img style="height:300px" src="images/plot_'+(company)+'.png" alt="sample18"/>'
                       +'</div>'
                       document.getElementById("feeds").innerHTML=currfeeds;
                       document.getElementById("footer").innerHTML="Latest Headlines...";                  
                        
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                alert("error");
                
            },
            
        });
            
    }

    

    function  toggle(){
        header=document.getElementById("header").innerHTML;
        //alert(header+"..."+"Indicators")
        sty="transition: -webkit-transform 1s; -webkit-backface-visibility: hidden;"
        if(header=="Indicators"){
            document.getElementById("front").setAttribute("style","position: absolute; z-index: 1;")
            document.getElementById("back").setAttribute("style","-webkit-transform: rotateY(-180deg);")
            document.getElementById("switch").innerHTML="View Indicators";
            document.getElementById("footer").innerHTML="Latest Headlines...";
            document.getElementById("header").innerHTML="Feed";
            //feed(companyFeed);
            
        }
        else{
            document.getElementById("front").setAttribute("style","-webkit-transform: rotateY(180deg);")
            document.getElementById("back").setAttribute("style","-webkit-transform: rotateY(0deg);")
            document.getElementById("header").innerHTML="Indicators";
            document.getElementById("footer").innerHTML="Latest Indicators...";
            document.getElementById("switch").innerHTML="View Feeds";
            //document.getElementById("feeds").innerHTML="";  
        } 
    }




    