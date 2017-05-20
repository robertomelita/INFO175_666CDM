function main(){
	//Variables estáticas, predefinidas para mostrar la visualizacion.
	//(Deben ser cambiadas por los datos a obtener de la base de datos).
	var topicNames = ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6", "Topic 7", "Topic 8"];
	var headerNames = ["Tópico", "Quizpet", "Parsons", "Animated Ex", "Annotated Ex"];
	var tiempo    = [6,5,4,3,4,5,6,2,5,4,3,4,5,3,4,5,3,2,4,5,4,3,4,5,3,3,5,3,4,3,4,4];
	var colors = ["#00ff00", "#ffff00", "#ff0000"];
	var dificultad= [1,3,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,3,1,2,3,1,3,2,2,1,2,3,3];
	
	//Margenes y sangrias a ocupar.
	var margins = {top : 100, left : 50, bottom : 0, right : 50};
	var padding = {top : 30, left : 50, bottom : 30, right : 50};
	
	var timeScale = d3.scaleLinear().domain([2,6]).range([4,15]);
	
	//Variables estáticas para modificacion rapida de apartados de la visualización.
	//(se ocupa en svg y en topicos respectivamente).
	var width = 1000;
	var minItemHeight = 10;
	
	//Contenedor donde tendremos todos los elementos de la visualizacion.
	var svg = d3.select("body").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", 600 + margins.top + margins.bottom);
	
	//Despliegue de headers.
	var headers = svg.selectAll(".headers").data(headerNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "headers")
		.attr("x", function(d,i){return (i*120) + padding.left})
		.attr("y", padding.top);
	
	//Despliegue de los tópicos.
	var topics = svg.selectAll(".topics").data(topicNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "topics")
		.attr("x", padding.left )
		.attr("y", function(d,i){return ( (i+2)*(padding.top+minItemHeight));});
	
	//Despliegue de los círculos.
	var circles = svg.selectAll("circles").data(tiempo).enter().append("circle");
	circles.attr("cx", function(d,i){return ((i%4+1)*120 + padding.left*1.5);})
		.attr("cy", function(d,i){return ( 40 )*Math.floor(i/4)+padding.top*2.6;})
		.attr("r", function(d,i){return timeScale(d)})
		.attr("fill", function(d,i){return colors[dificultad[i]-1];});

	
}