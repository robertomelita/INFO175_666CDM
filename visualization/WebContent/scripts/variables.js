var data=[];			//Variable auxiliar que guarda las consultas
var topicNames = [];	//Arreglo que contiene todos los nombre que se le dan a los topicos
var tiempo = [];		//Arreglo con el tiempo que toma cada actividad
var codigoActivity = [41,38,35,3];		//el appid que toma cada tipo de actividad (Quizpet, Parsons, Animated Ex y Annotated Ex segun corresponda)
var dificultad=[];		//Arreglo que contiene los datos promedios por topico del success rate y el nivel de completacion segun corresponde
var dataXTopic=[];		//Contiene todos los datos de la consulta ordenados por topicos y tipo de actividad
var colorblind = false;			//Define si está activo o no el modo daltónico
var activityCircleSpacing = 75; //Define el espacio entre circulos en las actividades

//Colores y titulos a ocupar en la visualizacion.
var headerNames = ["Tópico", "Quizpet", "Parsons", "Animated Ex", "Annotated Ex"];
var colors = ['#00ff00','#73ff00','#a3ff00','#cbff00','#eeff00','#ffeb00','#ffc200','#ff9600','#ff6500','#ff0000'];
var colorsBlind = ['#313695','#4575b4','#74add1',"#abd9e9",'#e0f3f8','#fee090','#fdae61','#f46d43','#d73027','#a50026'];
var colorsNotBlind = ['#00ff00','#73ff00','#a3ff00','#cbff00','#eeff00','#ffeb00','#ffc200','#ff9600','#ff6500','#ff0000'];


//arreglo conteniendo informacion acerca de cual topico esta expandido y cual no - 1: expandido, 0: cerrado
var expanded = new Array();
var expandedSize = new Array();

//Margenes y sangrias a ocupar
var margins = {top : 100, left : 50, bottom : 0, right : 50};
var padding = {top : 30, left : 50, bottom : 30, right : 50};

//Escala lineal que transformara entradas entre 2 y 6 (tiempo proveniente de la base de datos) a numeros entre 4 y 30 (tamaño de los circulos)
var timeScale = d3.scaleLinear().domain([0,155]).range([4,30]);

var xScale = d3.scaleLinear().domain([0,900]).range([0,900]);
var yScale = d3.scaleLinear().domain([0,1100]).range([0,1100]);

//Tamaños de Cuadrados en la leyenda
var tCuadrados = 25;

//Variables globales para modificacion rapida de apartados de la visualización.
//(se ocupa en svg y en topicos respectivamente).
var width = 900;
var height= 1100;
var minItemHeight = 35;
var expandedHeight = 90;

//Variable svg principal
var svg;