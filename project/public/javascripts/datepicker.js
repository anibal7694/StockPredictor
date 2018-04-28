$(document).ready(function() {

	$(function(){
		$( "#datePick" ).datepicker();
		//Pass the user selected date format
		
		$( "#format" ).change(function() {
			
		$( "#datePick" ).datepicker( "option", "dateFormat", $(this).val() );
		
		}); 
		});
		
	$(function(){
		$( "#dateother" ).datepicker();
		//Pass the user selected date format
		
		$( "#format" ).change(function() {
			
		$( "#dateother" ).datepicker( "option", "dateFormat", $(this).val() );
		
		});
		});
		
		
	$(function(){
		$( "#datestart" ).datepicker();
		//Pass the user selected date format
		
		$( "#format" ).change(function() {
			
		$( "#datestart" ).datepicker( "option", "dateFormat", $(this).val() );
		
		});
		});
		
		
		
	$(function(){
		$( "#dateend" ).datepicker();
		//Pass the user selected date format
		
		$( "#format" ).change(function() {
			
		$( "#dateend" ).datepicker( "option", "dateFormat", $(this).val() );
		
		});
		});

	

});