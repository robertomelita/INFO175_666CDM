function inicializacionTopics(data){
	cont = 0;
	topicNames.push(data[0].topicname)
	for(i=0; i < data.length;i++){
		if(data[i].topicname!=topicNames[cont]){
			cont++;
			topicNames.push(data[i].topicname);
			console.log(data[i].topicname);
		}
	}
	while(topicNames[0]!=topicNames[topicNames.length-1]){
		topicNames.pop();
	}
	topicNames.pop();
	console.log(data);
	//console.log(topicNames);
}

function tiempoTopics(data){
	for(i=0;i<topicNames.length;i++){
		for(k=0;k<4;k++){
			cont=0;
			acum=0;
			for(j=0;j<data.length;j++){
				if(data[j].topicname==topicNames[i] && data[j].appid==codigoActivity[k]){
					cont++;
					acum = acum + parseInt(data[j].tiempo_prom);
				}
			}
			if(cont!=0) tiempo.push(parseInt(acum/cont));
			else tiempo.push(0);
		}
	}
	console.log(tiempo)
	ratesfe(data);
}
function ratesfe(data){
	for(i=0;i<topicNames.length;i++){
		for(k=0;k<4;k++){
			cont=0;
			acum=0;
			for(j=0;j<data.length;j++){
				if(data[j].topicname==topicNames[i] && data[j].appid==codigoActivity[k]){
					cont++;
					acum = acum + parseFloat(data[j].success_rate);
				}
			}
			if(cont!=0) dificultad.push(parseInt(10*(acum/cont)));
			else dificultad.push(0);
		}
	}
	console.log(dificultad);
	quezada(data);
}
function quezada(data){
	for(i=0;i<topicNames.length;i++){
		var aux = []; 
		for(k=0;k<4;k++){
			for(j=0;j<data.length;j++){
				if(data[j].topicname==topicNames[i] && data[j].appid==codigoActivity[k]){
					aux.push(data[j]);
				}
			}
		}
		dataXTopic.push(aux);
	}
	console.log(dataXTopic);
}




