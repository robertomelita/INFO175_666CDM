var data=null;
//Variables estáticas, predefinidas para mostrar la visualizacion.

//Colores y titulos a ocupar en la visualizacion.
var headerNames = ["Tópico", "Quizpet", "Parsons", "Animated Ex", "Annotated Ex"];
var colors = ["#2196f3", "#388cde", "#4f83c9", "#677ab4", "#7e719f", "#96678a", "#ad5e75", "#c55560", "#dc4c4b", "#f44336"];

//arreglo conteniendo informacion acerca de cual topico esta expandido y cual no - 1: expandido, 0: cerrado
var expanded = new Array();

//Margenes y sangrias a ocupar
var margins = {top : 100, left : 50, bottom : 0, right : 50};
var padding = {top : 30, left : 50, bottom : 30, right : 50};

//Escala lineal que transformara entradas entre 2 y 6 (tiempo proveniente de la base de datos) a numeros entre 4 y 30 (tamaño de los circulos)
var timeScale = d3.scaleLinear().domain([0,155]).range([4,30]);

//Tamaños de Cuadrados en la leyenda
var tCuadrados = 25;

//Variables globales para modificacion rapida de apartados de la visualización.
//(se ocupa en svg y en topicos respectivamente).
var width = 1000;
var height= 1800;
var minItemHeight = 35;
var expandedHeight = 600;

//Variable svg principal
var svg;

function main(res){
	data=data.concat(res);
	inicializacionTopics(data);
	//se llena el arreglo expanded con 0. Todos los topicos comienzan colapsados
	for(i = 0; i<topicNames.length; i++){
		expanded.push(0);
	}
	
		
	//Contenedor donde tendremos todos los elementos de la visualizacion.
	svg = d3.select("body").append("svg")
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
		.attr("y", function(d,i){
			var extra = 0;
			for (j=0;j<topicNames.length; j++){
				extra+= expanded[j]*expandedHeight;
			}
			return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i;
			})
		.attr("font-size", "14");
		
	//var lines = svg.selectAll(".lines").data(topicNames).enter().append("line").attr("x1", padding.left).attr("y1", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));})
	//.attr("x2", width*5/8).attr("y2", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));}).attr("style","stroke:rgb(96,125,139);stroke-width:1");
	
	//Lineas separadoras de topicos
	var linesUp = svg.selectAll(".linesUp").data(topicNames).enter().append("polyline")
	.attr("class","linesUp")
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
	
	//tooltip que sera mostrado al hacer mouseover sobre un circulo
	var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "black")
    .style("background","rgba(255,255,255, .8)")
    .text("");

	
	//Despliegue de los círculos.
	var circles = svg.selectAll(".topicCircles").data(tiempo).enter().append("circle").attr("class","topicCircles");
	circles.attr("cx", function(d,i){return ((i%4+1)*120 + 12*(i%4) +padding.left*1.5);})
		.attr("cy", function(d,i){return ( 40 )*Math.floor(i/4)+padding.top*2.6 + Math.floor(i/4)*minItemHeight;})
		.attr("r", function(d,i){return timeScale(d)})
		.attr("fill", function(d,i){return colors[9-dificultad[i]];})
		.on("mouseover", function(d,i){return tooltip.style("visibility", "visible").text("Tiempo = "+d+" segs. Success rate = "+ dificultad[i]*10+"%");})
		.on("mousemove", function(){return tooltip.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
	//despliegue de isotipo de expansionde topicos
	var expandIcon = svg.selectAll(".expandIcon").data(topicNames).enter().append("image").attr("class","expandIcon");
	expandIcon.attr("xlink:href", "assets/expandIcon.png")
		.attr("height","30")
		.attr("width","30")
		.attr("x","10")
		.attr("y",function(d,i){return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i - 19 ;})
		.on("mouseover", function(d){
			d3.select(this).transition()
			.attr("height","35")
			.attr("width","35")
			.ease(d3.easeCubic)
			.duration(300);
		})
		.on("mouseout", function(){
			d3.select(this).transition()
			.attr("height","30")
			.attr("width","30")
			.ease(d3.easeCubic)
			.duration(300);
		})
		.on("click", function(d,i){
			if (expanded[i] == 0){
				d3.select(this).attr("xlink:href", "assets/voyhoy-logo-puntos-negativos.png");
				expanded[i] = 1;
				invalidate();
			}else{
				d3.select(this).attr("xlink:href", "assets/expandIcon.png");
				expanded[i] = 0;
				invalidate();
			}
		});
	
	//Despliegue de la leyenda
	var Cuadrados = svg.selectAll(".coloresLeyenda").data(colors).enter().append("rect")
					.attr("class","coloresLeyenda")
					.attr("x", 750)
					.attr("y", function(d,i){return (120)+i*tCuadrados;})
					.attr("width", function(d,i){return tCuadrados})
					.attr("height", function(d,i){return tCuadrados})
					.attr("style",function(d,i){ return "fill:"+(colors[9-i])+(";stroke-width:1;stroke:rgb(0,0,0)");});
	var Leyenda = svg.selectAll(".textoLeyenda").data(colors).enter().append("text")
					.text(function(d,i){return i*10+"% - "+(i*10+10)+"%";})
					.attr("x", 778)
					.attr("y", function(d,i){return (140)+i*tCuadrados;});
	
	var lName = ["Quizpet and Parson = Success Rate ", " Examples = Level of Completion"];
	
    svg.selectAll(".leyendaNombre")
     						.data(lName)
     						.enter()
     						.append("text")
     						.text(function(d){return d;})
     						.attr("x", 740)
     						.attr("y", function(d,i){return 60+(i*15)+ padding.top})
     						.attr("font-size", "15")
     						.attr("font-family", "seriff");
    
    svg.append("text")
    						.text("Leyenda")
    						.attr("x", 740)
    						.attr("y", padding.top)
    						.attr("font-size", "24")
    						.attr("text-decoration", "underline");
    
    svg.append("circle")
    						.attr("cx", 760)
    						.attr("cy", padding.top+430)
    						.attr("r", timeScale(2))
    						.attr("fill", "#009688");
    svg.append("circle")
	.attr("cx", 760)
	.attr("cy", padding.top+500)
	.attr("r", timeScale(150))
	.attr("fill", "#009688");
    
	svg.append("text")
	.text("Tamaño:")
	.attr("x", 740)
	.attr("y", padding.top+400)
	.attr("text-decoration", "underline");
	
	svg.append("text")
	.text("Tiempo Mínimo")
	.attr("x", 820)
	.attr("y", padding.top+435);
	
	svg.append("text")
	.text("Tiempo Máximo")
	.attr("x", 820)
	.attr("y", padding.top+502);
	
	
					
}

//Funcion dedicada a redibujar la visualizacion dado los topicos expandidos.
function invalidate() {
	
	//Redibuja contenedor principal (aumenta la altura)
	svg.transition().attr("height", function(){
		var extra = 0;
		for (i = 0; i < expanded.length; i++){
			extra += expanded[i]*expandedHeight;
		}
		return height+extra;
	});
	
	//Redibuja los topicos (cambia posicion en y)
	svg.selectAll(".topics").transition()
	.attr("y", function(d,i){
		var extra = 0;
		for (j=i-1;j>=0; j--){
			extra+= expanded[j]*expandedHeight;
		}
		//console.log(extra);
		return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i + extra;
		});
	
	//Redibuja los circulos (cambia posicion en y)
	svg.selectAll(".topicCircles").transition()
		.attr("cy", function(d,i){
			var extra = 0;
			for (j=Math.floor(i/4) - 1;j>=0; j--){
				extra+= expanded[j]*expandedHeight;
			}
			//console.log(extra);
			return ( 40 )*Math.floor(i/4)+padding.top*2.6 + Math.floor(i/4)*minItemHeight + extra;
			});
	
	//Redibuja los isotipos (cambia posicion en y)
	svg.selectAll(".expandIcon").transition()
		.attr("y", function(d,i){
			var extra = 0;
			for (j=i-1;j>=0; j--){
				extra+= expanded[j]*expandedHeight;
			}
			//console.log(extra);
			return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i - 19 + extra;
		});
	
	//Redibuja las lineas separadoras (cambia posicion en y)
	svg.selectAll(".linesUp").transition()
		.attr("points", function(d,i){
			var extra = 0;
			for (j=i;j>=0; j--){
				extra+= expanded[j]*expandedHeight;
			}
			console.log("extra = "+extra);
			return (padding.left-5) + "," + ((i+2)*(padding.top+minItemHeight)-20+10*i + extra)
			+ " " + (padding.left-5) + "," + ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+ extra) 
			+ " " + (width*21/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+ extra) 
			+ " " + (width*42/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+ extra) 
			+ " " + (width*63/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+ extra) 
			+ " " + (width*84/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*105/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+ extra) 
			+ " " + (width*105/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+ extra)
		});
	var extra = 0;
	var activityCircleSpacing = 75;
	for(var l = 0; l<expanded.length; l++){
		extra += expanded[l]*expandedHeight; 
		
		if (expanded[l] == 1){
			var extraX = 0;
			var extraY = 0;
			var lastID = "41";
			var top = new Array(dataXTopic[l].length);
			var cir = svg.selectAll(".c"+l).data(dataXTopic[l]).enter().append("circle")
						.attr("class", "c"+l)
						.attr("cx", function(d,i){
							console.log(i)
						
							if (lastID != dataXTopic[l][i].appid){
								console.log("cambio id"	)
								lastID = dataXTopic[l][i].appid;
								extraX +=132	;
								
							}
							//console.log(120+padding.left*1.5 + extraX);
							return 120+padding.left*1.5 + extraX;	
						});
			lastID = "41";
						cir.attr("cy", function(d,i){
							console.log(i);							
							if (lastID == dataXTopic[l][i].appid && i != 0){
								extraY +=80;
							}else{
								lastID = dataXTopic[l][i].appid;
								extraY = 0;
							}
							//console.log(( 40 )*Math.floor(0/4)+padding.top*2.6 + Math.floor(0/4)*minItemHeight + activityCircleSpacing + extraY );
							return padding.top*2.6 + activityCircleSpacing + extraY+(80-.3*l)*l+ extra-600;
						
						})
						.attr("r", function(d,i){return timeScale(dataXTopic[l][i].tiempo_prom);})
						.attr("fill", function(d,i){return colors[9-parseInt(dataXTopic[l][i].success_rate*10)]}) 
						.on("mouseover", function(d,i){
							console.log(d);
							return tooltip.style("visibility", "visible").text(function(){
								if (d.appid == 41 || d.appid == 38){
									return "Tiempo: "+parseInt(d.tiempo_prom)+" segs. Success rate: "+ parseInt(d.success_rate*100)	+"%. Intentos: "+d.intentos;
								}else{
									return "Tiempo: "+parseInt(d.tiempo_prom)+" segs. Completacion: "+ parseInt(d.success_rate*100)	+"%"
								}
							});
						})
						.on("mousemove", function(){return tooltip.style("top",
								(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
						
		}
		else{
			svg.selectAll(".c"+l).remove();
			
		}
		var tooltip = d3.select("body")
	    .append("div")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("color", "black")
	    .style("background","rgba(255,255,255, .8)")
	    .text("");
		svg.selectAll(".c"+l).transition().attr("cy", function(d,i){
			console.log(i);							
			if (lastID == dataXTopic[l][i].appid && i != 0){
				extraY +=80;
			}else{
				lastID = dataXTopic[l][i].appid;
				extraY = 0;
			}
			return padding.top*2.6 + activityCircleSpacing + extraY+(80-.3*l)*l+ extra-600;
		
		})
		
		//	svg.selectAll(".h"+l).data(dataXTopic[l]).enter().append("text").attr("x",).attr("y",)
		
	}
}
function hele(res){
	data=res;
}
function loadData(){
	$.getJSON("http://localhost:8080/Visualization_req3/GetAE666",function(data){hele(data)});
	$.getJSON("http://localhost:8080/Visualization_req3/GetQP666",function(data){main(data)});
}
$(window).ready(function(){loadData();});



