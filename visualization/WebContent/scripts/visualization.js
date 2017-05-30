



function main(){
	//Variables estáticas, predefinidas para mostrar la visualizacion.
	//(Deben ser cambiadas por los datos a obtener de la base de datos).
	var topicNames = ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6", "Topic 7", "Topic 8"];
	var headerNames = ["Tópico", "Quizpet", "Parsons", "Animated Ex", "Annotated Ex"];
	var tiempo    = [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];
	var colors = ["#2196f3", "#388cde", "#4f83c9", "#677ab4", "#7e719f", "#96678a", "#ad5e75", "#c55560", "#dc4c4b", "#f44336"];
	var dificultad= [0,1,6,3,8,2,9,9,0,4,1,2,3,6,7,3,2,9,7,0,1,2,5,6,4,7,8,8,1,0,5,3];
	
	//Margenes y sangrias a ocupar.
	var margins = {top : 100, left : 50, bottom : 0, right : 50};
	var padding = {top : 30, left : 50, bottom : 30, right : 50};
	
	var timeScale = d3.scaleLinear().domain([2,6]).range([4,30]);
	
	//Variables estáticas para modificacion rapida de apartados de la visualización.
	//(se ocupa en svg y en topicos respectivamente).
	var width = 1000;
	var height= 600;
	var minItemHeight = 35;
	
	//Contenedor donde tendremos todos los elementos de la visualizacion.
	var svg = d3.select("body").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom)
		.attr("style", "background-color: #e6eef1;");
	
	//Despliegue de headers.
	var headers = svg.selectAll(".headers").data(headerNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "headers")
		.attr("x", function(d,i){return (i*120) +(3*(i%5))+ padding.left})
		.attr("y", padding.top)
		.attr("font-size", "14");
	
	//Despliegue de los tópicos.
	var topics = svg.selectAll(".topics").data(topicNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "topics")
		.attr("x", padding.left )
		.attr("y", function(d,i){return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i ;})
		.attr("font-size", "14");
		
	//var lines = svg.selectAll(".lines").data(topicNames).enter().append("line").attr("x1", padding.left).attr("y1", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));})
	//.attr("x2", width*5/8).attr("y2", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));}).attr("style","stroke:rgb(96,125,139);stroke-width:1");
	
	var linesUp = svg.selectAll(".linesUp").data(topicNames).enter().append("polyline")
	.attr("points", function(d,i){return (padding.left-5) + "," + ((i+2)*(padding.top+minItemHeight)-20+10*i)
	+ " " + (padding.left-5) + "," + ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*105/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*105/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i)})
	.attr("style","fill:none;stroke:rgb(96,125,139);stroke-width:1");
	
	var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "black")
    .text("");
	
	//Despliegue de los círculos.
	var circles = svg.selectAll("circles").data(tiempo).enter().append("circle");
	circles.attr("cx", function(d,i){return ((i%4+1)*120 + 12*(i%4) +padding.left*1.5);})
		.attr("cy", function(d,i){return ( 40 )*Math.floor(i/4)+padding.top*2.6 + Math.floor(i/4)*minItemHeight;})
		.attr("r", function(d,i){return timeScale(d)})
		.attr("fill", function(d,i){return colors[dificultad[i] ];})
		.on("mouseover", function(d,i){return tooltip.style("visibility", "visible").text("Tiempo = "+d+" Dificultad = "+ dificultad[i]);})
		.on("mousemove", function(){return tooltip.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

	
	
}