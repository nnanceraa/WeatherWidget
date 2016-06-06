$(function(){
				$("#widget").offset({top:0, left:0});
				
				// JQuery-UI function to set the div as draggable
				$( "#widget" ).draggable({ opacity: 0.70 });
				
				$('#refresh').css("background-image", "url(refresh.png)");
				
				//calling all the methods
				setUpWidget();
				toggle();
				ajaxLoad();
				
				
				function toggle(){
				$("#toggle").click(function(event){
				if($("#content").css("display") == "none"){
					arrowUp();
				}
				else{
					arrowDown();		
				}
				});
				}
				
				function arrowUp(){
				$("#toggle").css("background-image", "url(arrowUp.png)");
				$("#content").toggle();
				}
				
				
				function arrowDown(){
				$("#toggle").css("background-image", "url(arrowDown.png)");
				$("#content").toggle();
				}
	
				//calls the ajaxLoad after the button is clicked
				$("#refresh").click(
					function(){
					$("#content").empty();
						ajaxLoad();
						$('#refresh').css("background-image", "url(loading_red.gif)");
					}
				);

				//must include here for user to setup widget in just one div
				function setUpWidget(){
				$("#widget").append('<div id="toolbar"><button id="refresh"></button><button id="toggle"></button></div><div id = "content"></div>');
				}
				
				//jQuery ajax function to retrieve json data
				function ajaxLoad(){
				$.ajax({
					dataType: "json",
					url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0",
					success: function(result) {
					handleSuccess(result);
					}
				});
				}
				

				//  called when ajax completed successully
				function handleSuccess(result){
					console.log(result);
					$("#content").append(result.name);
					$("#content").append("</br><b>Current Weather:</b> " + (result.weather[0].description + "</br>"));
					$("#content").append("<b>Temperature:</b> " + parseInt((result.main.temp) - 273.15) + "°C </br>");	
					$("#content").append("<b>Min Temp.:</b> " + parseInt((result.main.temp_min) - 273.15) + "°C </br>");
					$("#content").append("<b>Max Temp.:</b> " + parseInt((result.main.temp_max) - 273.15) + "°C </br>");
					$("#content").append("<b>Humidity:</b> " + (result.main.humidity) + "% </br>");
					$("#content").append("<img id=\"iconn\" src=\"\">");
					$("#iconn").attr("src", "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
					$('#refresh').css("background-image", "url(refresh.png)");
				}
			});
