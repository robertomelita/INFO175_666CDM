function main(res){
	data=data.concat(res);	//une la data de las 2 consultas
	
	//llamado a funciones de inicializacion
	inicializacionTopics(data);
	tiempoTopics(data);
	rate_completacion(data);
	ordenarData(data);
	
	var cont1 = 0;
	var cont2 = 0;
	var idd = "41"
	//se llena el arreglo expanded con 0. Todos los topicos comienzan colapsados
	for(var i = 0; i<topicNames.length; i++){
		for (var a = 0; a<dataXTopic[i].length; a++){
			if (dataXTopic[i][a].appid != idd){
				if (cont1>cont2)
					cont2=cont1;
				cont1=1;
				idd = dataXTopic[i][a].appid;
			}else{
				cont1++;
			}
		}
		if (cont1>cont2)
			cont2=cont1;
		expandedSize.push(expandedHeight*cont2);
		expanded.push(0);
		topicNames[i] = capitalize(topicNames[i].replace(/_/g, " "));
		cont2 = 0;
		cont1 = 0;
		idd = "41"
	}
	//console.log(expandedSize);
	
		
	//Contenedor donde tendremos todos los elementos de la visualizacion.
	svg = d3.select("body").append("svg")
		.attr("width", "100%")
		.attr("height", height + margins.top + margins.bottom)
		.attr("style", "background-color: #F0FFFF;");
	
	//Despliegue de headers.
	var headers = svg.selectAll(".headers").data(headerNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "headers")
		.attr("x", function(d,i){return (i*160) +(3*(i%5))+ padding.left})
		.attr("y", padding.top)
		.attr("font-size", "18");
	
	//Despliegue de los tópicos.
	var topics = svg.selectAll(".topics").data(topicNames).enter().append("text")
		.text(function(d){return d;})
		.attr("class", "topics")
		.attr("x", padding.left-5 )
		.attr("y", function(d,i){
			var extra = 0;
			for (j=0;j<topicNames.length; j++){
				extra+= expanded[j]*expandedSize[j];
			}
			return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i;
			})
		.attr("font-size", "18");
		
	//var lines = svg.selectAll(".lines").data(topicNames).enter().append("line").attr("x1", padding.left).attr("y1", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));})
	//.attr("x2", width*5/8).attr("y2", function(d,i){return ( 20+(i+2)*(padding.top+minItemHeight));}).attr("style","stroke:rgb(96,125,139);stroke-width:1");
	
	//Lineas separadoras de topicos
	var linesUp = svg.selectAll(".linesUp").data(topicNames).enter().append("polyline")
	.attr("class","linesUp")
	.attr("points", function(d,i){return (padding.left-10) + "," + ((i+2)*(padding.top+minItemHeight)-20+10*i)
	+ " " + (padding.left-10) + "," + ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i) 
	+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*151/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i) 
	+ " " + (width*151/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i)})
	.attr("style","fill:none;stroke:rgb(96,125,139);stroke-width:1");
	
	//tooltip que sera mostrado al hacer mouseover sobre un circulo
	var tooltip = d3.select("body")
    .append("div")
    .attr("class","topic_tool")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "black")
    .style("background","rgba(255,255,255, .8)")
    .text("");

	
	//Despliegue de los círculos.
	var circles = svg.selectAll(".topicCircles").data(tiempo).enter().append("circle").attr("class","topicCircles");
	circles.attr("cx", function(d,i){return ((i%4+1)*160 + 12*(i%4) +padding.left*1.5);})
		.attr("cy", function(d,i){return ( 40 )*Math.floor(i/4)+padding.top*2.6 + Math.floor(i/4)*minItemHeight;})
		.attr("r", function(d,i){if (d!=0) return timeScale(d); else return 0;})
		.attr("fill", function(d,i){return colors[9-dificultad[i]];})
		.attr("stroke", "black")
		.attr("stroke-width","1px")
		.on("mouseover", function(d,i){return tooltip.style("visibility", "visible").text("Tiempo = "+d+" segs. Taza de Exito/Completación = "+ dificultad[i]*10+"%");})
		.on("mousemove", function(){return tooltip.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
	//despliegue de isotipo de expansionde topicos
	var expandIcon = svg.selectAll(".expandIcon").data(topicNames).enter().append("image").attr("class","expandIcon");
	expandIcon.attr("xlink:href", "assets/expandIcon.png")
		.attr("height","30")
		.attr("width","30")
		.attr("x","5")
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
					.attr("x", 950)
					.attr("y", function(d,i){return (120)+i*tCuadrados;})
					.attr("width", function(d,i){return tCuadrados})
					.attr("height", function(d,i){return tCuadrados})
					.attr("fill",function(d,i){ return colors[9-i];})
					.attr("style", "stroke-width:1;stroke:rgb(0,0,0);");
	var Leyenda = svg.selectAll(".textoLeyenda").data(colors).enter().append("text")
					.text(function(d,i){return i*10+"% - "+(i*10+10)+"%";})
					.attr("x", 978)
					.attr("y", function(d,i){return (140)+i*tCuadrados;})
					.attr("font-size", "18");
	
	var lName = ["Quizpet y Parson = Taza de Exito ", " Ejemplos = Nivel de Completacion"];
	
    svg.selectAll(".leyendaNombre")
     						.data(lName)
     						.enter()
     						.append("text")
     						.text(function(d){return d;})
     						.attr("x", 940)
     						.attr("y", function(d,i){return 60+(i*15)+ padding.top})
     						.attr("font-size", "18");
     						//.attr("font-family", "seriff");
    
    svg.append("text")
    						.text("Leyenda")
    						.attr("x", 940)
    						.attr("y", padding.top)
    						.attr("font-size", "24")
    						.attr("text-decoration", "underline");
    
    svg.append("circle")
    						.attr("cx", 960)
    						.attr("cy", padding.top+430)
    						.attr("r", timeScale(2))
    						.attr("fill", "#aaaaaa");
    svg.append("circle")
	.attr("cx", 960)
	.attr("cy", padding.top+500)
	.attr("r", timeScale(150))
	.attr("fill", "#aaaaaa");
    
	svg.append("text")
	.text("Tamaño:")
	.attr("x", 940)
	.attr("y", padding.top+400)
	.attr("text-decoration", "underline")
	.attr("font-size", "18");
	
	svg.append("text")
	.text(function(){return "Tiempo Mínimo: "+ (Math.min.apply(Math,tiempo))+" segundos";})
	.attr("x", 1020)
	.attr("y", padding.top+435).attr("font-size", "18");
	
	svg.append("text")
	.text(function(){return "Tiempo Máximo: "+ (Math.max.apply(Math, tiempo))+" segundos";})
	.attr("x", 1020)
	.attr("y", padding.top+502).attr("font-size", "18");
	
	
	//Boton para activar el modo Colorblind
	var butt = svg.append("g").attr("transform", "translate(1000, 600)")
	.on("mouseover",function(){
		d3.selectAll("#botonrect").transition().attr("fill", "#ffffff");
		d3.selectAll("#botontext").transition().attr("fill", "#F44336")
		d3.selectAll("#botonrectshadow").transition().attr("x", 0).attr("y", 0);
	})
	.on("mouseout",function(){
		d3.selectAll("#botonrect").transition().attr("fill", "#F44336");
		d3.selectAll("#botontext").transition().attr("fill", "white");
		d3.selectAll("#botonrectshadow").transition().attr("x", -2).attr("y", 2);
	})
	.on("click",function(){
		if (!colorblind){
			d3.selectAll("#botontext").transition().text("Modo Daltónico: ON");
			toColorblindON();
			colorblind = true;
		}else{
			d3.selectAll("#botontext").transition().text("Modo Daltónico: OFF");
			toColorblindOFF();
			colorblind = false;
		}
	});
	butt.append("rect").attr("width", 180).attr("height", 50).attr("x", -2).attr("y",2).attr("id", "botonrectshadow");
	butt.append("rect").attr("width", 180).attr("height", 50).attr("id", "botonrect").attr("fill","#F44336");
	butt.append("text").text("Modo Daltónico: OFF").attr("font-size",18).attr("fill", "white").attr("id", "botontext")
    .style("z-index", "100").attr("x", 13).attr("y",30);
					
}

//Funcion dedicada a redibujar la visualizacion dado los topicos expandidos.
function invalidate() {
	
	
	//Redibuja contenedor principal (aumenta la altura)
	svg.transition().attr("height", function(){
		var extra = 0;
		for (i = 0; i < expanded.length; i++){
			extra += expanded[i]*expandedSize[i];
		}
		return height+extra;
	});
	
	//Redibuja los topicos (cambia posicion en y)
	svg.selectAll(".topics").transition()
	.attr("y", function(d,i){
		var extra = 0;
		for (j=i-1;j>=0; j--){
			extra+= expanded[j]*expandedSize[j];
		}
		//console.log(extra);
		return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i + extra;
		});
	
	//Redibuja los circulos (cambia posicion en y)
	svg.selectAll(".topicCircles").transition()
		.attr("cy", function(d,i){
			var extra = 0;
			for (j=Math.floor(i/4) - 1;j>=0; j--){
				extra+= expanded[j]*expandedSize[j];
			}
			//console.log(extra);
			return ( 40 )*Math.floor(i/4)+padding.top*2.6 + Math.floor(i/4)*minItemHeight + extra;
			});
	
	//Redibuja los isotipos (cambia posicion en y)
	svg.selectAll(".expandIcon").transition()
		.attr("y", function(d,i){
			var extra = 0;
			for (j=i-1;j>=0; j--){
				extra+= expanded[j]*expandedSize[j];
			}
			//console.log(extra);
			return ( (i+2)*(padding.top+minItemHeight-25))+(minItemHeight)*i - 19 + extra;
		});
	
	//Redibuja las lineas separadoras (cambia posicion en y)
	svg.selectAll(".linesUp").transition()
		.attr("points", function(d,i){
			var extra = 0;
			for (j=i;j>=0; j--){
				extra+= expanded[j]*expandedSize[j];
			}
			//console.log("extra = "+extra);
			return (padding.left-10) + "," + ((i+2)*(padding.top+minItemHeight)-20+10*i+extra)
			+ " " + (padding.left-10) + "," + ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+extra) 
			+ " " + (width*31/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+extra) 
			+ " " + (width*58/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+extra) 
			+ " " + (width*89/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+extra) 
			+ " " + (width*120/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*151/160) + ","+ ((i+2)*(padding.top+minItemHeight)-16+10*i+extra) 
			+ " " + (width*151/160) + ","+ ((i+2)*(padding.top+minItemHeight)-20+10*i+extra)
		});
	
	//Una vez expandido, crea los circulos de las actividades correspondientes en cada  topico
	for(var l = 0; l<expanded.length; l++){
		if (expanded[l] == 1){
			var extraX = 0;
			var extraY = 0;
			var lastID = "41";
			var bool = false;			
			var cir = svg.selectAll(".c"+l).data(dataXTopic[l]).enter().append("circle")
						.attr("class", "c"+l)
						.attr("stroke","black")
						.attr("cx", function(d,i){
							
							if (lastID != dataXTopic[l][i].appid){
								lastID = dataXTopic[l][i].appid;
								if(dataXTopic[l][i].topicname == "output_formatting" && !bool){
									extraX+=173;
									bool = true;
								}
								extraX +=173	;
								
							}
							return 160+padding.left*1.5 + extraX;	
						});
			lastID = "41";
			var extra = 0;
			for (j=l;j>=0; j--){
				extra+= expanded[j]*expandedSize[j];
			}
			cir.attr("cy", function(d,i){										
				if (lastID == dataXTopic[l][i].appid && i != 0){
					extraY +=80;
				}else{
					lastID = dataXTopic[l][i].appid;
					extraY = 0;
				}							
				if ( dataXTopic[l][i].topicname == dataXTopic[0][0].topicname){
					return (padding.top*2.8 + activityCircleSpacing + extraY);	
				}
				else{
					return (padding.top*2.8 + activityCircleSpacing + extraY);	
				}	
			})
						.attr("r", function(d,i){if (dataXTopic[l][i].tiempo_prom!=0) return timeScale(dataXTopic[l][i].tiempo_prom); else return 0;})
						.attr("fill", function(d,i){if (dataXTopic[l][i].success_rate*10 != 10) return colors[9-parseInt(dataXTopic[l][i].success_rate*10)]; else return colors[0];}) 
						.attr("opacity", "0")
						.on("mouseover", function(d,i){
							//console.log(d);
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
			
			//Crea los labels que acompañaran a los circulos de las actividades
			var extraX = 0;
			var extraY = 0;
			var lastID = "41";
			var bool = false;	
			
			var tex = svg.selectAll(".t"+l).data(dataXTopic[l]).enter().append("text").attr("class","t"+l)
				.attr("x",function(d,i){
					
					if (lastID != dataXTopic[l][i].appid){
						lastID = dataXTopic[l][i].appid;
						if(dataXTopic[l][i].topicname == "output_formatting" && !bool){
							extraX+=173;
							bool = true;
						}
						extraX +=173	;
						
					}
					return 160+padding.left*1.5 + extraX;	
				});
			lastID = "41";
			
			var extra = 0;
			for (j=l;j>=0; j--){
				extra+= expanded[j]*expandedSize[j];
			}
			tex.attr("y", function(d,i){										
				if (lastID == dataXTopic[l][i].appid && i != 0){
					extraY +=80;
				}else{
					lastID = dataXTopic[l][i].appid;
					extraY = 0;
				}
				if ( dataXTopic[l][i].topicname == dataXTopic[0][0].topicname){
					return (padding.top*2.8 + activityCircleSpacing + extraY);
				}else{
					return (padding.top*2.8 + activityCircleSpacing + extraY);
				}	
			})
			.text(function(d,i){return dataXTopic[l][i].activityname;})
			.attr("text-anchor","middle")
			.attr("font-size", "14")
			.attr("style", "fill: black;" +
					"text-shadow: 3px 3px 3px white;").attr("opacity","0");
			
						
		}else{
			svg.selectAll(".c"+l).remove();
			svg.selectAll(".t"+l).remove();
		}
		
		//Tooltip que sera mostrada para los circulos de las actividades
		var tooltip = d3.select("body")
	    .append("div")
	    .attr("class","activity_tool")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("color", "black")
	    .style("background","rgba(255,255,255, .8)")
	    .text("");
		
		//Mueve los circulos a su posicion correcta en caso de que haya otro topico expandido
		svg.selectAll(".c"+l).transition().attr("cy", function(d,i){
			if (lastID == dataXTopic[l][i].appid && i != 0){
				extraY +=80;
			}else{
				lastID = dataXTopic[l][i].appid;
				extraY = 0;
			}
			var exxtra =0;
			for(var j = 0; j<l; j++){
				exxtra += expanded[j]*expandedSize[j];
			}
			if ( dataXTopic[l][i].topicname == dataXTopic[0][0].topicname){
				return (padding.top*2.8 + activityCircleSpacing + extraY );
			}
			else{
				return (padding.top*2.8 + activityCircleSpacing + extraY+65*l+10*(l-1) + exxtra);
			}
		
		})
		.attr("opacity", "1").duration("600");
		//Mueve los labels a su posicion correcta en caso de que haya otro topico expandido
		svg.selectAll(".t"+l).transition().attr("y", function(d,i){
			//console.log(i);							
			if (lastID == dataXTopic[l][i].appid && i != 0){
				extraY +=80;
			}else{
				lastID = dataXTopic[l][i].appid;
				extraY = 0;
			}
			var exxtra =0;
			for(var j = 0; j<l; j++){
				exxtra += expanded[j]*expandedSize[j];
			}
			if ( dataXTopic[l][i].topicname == dataXTopic[0][0].topicname){
				return (padding.top*2.8 + activityCircleSpacing + extraY );
			}
			else{
				return (padding.top*2.8 + activityCircleSpacing + extraY+65*l+10*(l-1) + exxtra);
			}
		
		})
		.attr("opacity", "1").duration("600");
		
		
	}
}
//funcion que activa el modo ColorBlind
function toColorblindON(){
	colors = colorsBlind;
	d3.selectAll(".coloresLeyenda").transition().attr("fill",function(d,i){ return colors[9-i];});
	d3.selectAll(".topicCircles").transition().attr("fill", function(d,i){return colors[9-dificultad[i]];});
	//invalidate();

}
//funcion que desactiv el modo Colorblind
function toColorblindOFF(){
	colors = colorsNotBlind;
	d3.selectAll(".coloresLeyenda").transition().attr("fill",function(d,i){ return colors[9-i];});
	d3.selectAll(".topicCircles").transition().attr("fill", function(d,i){return colors[9-dificultad[i]];});
	//invalidate();
}


//Funcion auxiliar para guardar en "data" la primera consulta y realizar la segunda consulta
function hele(res){
	data=data.concat(res);
	$.getJSON("http://146.83.216.206/INFO175_Servicios/GetQP666",function(data){main(data)});
}
//Realiza la primera consulta
function loadData(){
	$.getJSON("http://146.83.216.206/INFO175_Servicios/GetAE666",function(data){hele(data)});
}

$(window).ready(function(){loadData();});

//Hace mayuscua la primera letra de un string (para el nombre de los topicos)
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


