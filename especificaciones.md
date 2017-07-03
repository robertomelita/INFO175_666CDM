# Servicios

# GetQP666:

### Descripcion

### Este servicio nos otorga el promedio de tiempo por actividad, success rate por actividad e intentos por actividad para las Quizpet y Parson

### Salida

```javascript
[
    nombreactividad,
    ...
]

//NOMBREACTIVIDAD OBJECT

{
    "appid": 41, //38 QUIZPET, 41 PARSON
    "topicname": classes_objects, //nombre tópico
    "avgtime": 29.8895, //tiempo promedio en segundos
    "success_rate": 0.40539992702801314,//tasa de éxito
    "intentos": 2.4667,//intento promedio 
}
```

## Consulta SQL
### Para esta consulta, se crea un primer archivo de vista 

```SQL
create view viewqp as select topicorder,appid,activityname,topicname,sum(result) as resum,MAX(attemptno)as maxat,avg(durationseconds)as time from activity_traces where(appid=41 or appid=38) group by user,activityname;
```
### se crea luego un segundo archivo vista

```SQL
create view viewqp2 as select topicorder,appid,activityname,topicname,avg(resum) as avgresum,avg(maxat) as avgmax,avg(time)as avgtime from viewqp group by activityname;
```
### finalmente se hace la consulta a este segundo archivo de vista

```SQL
select appid,topicname,activityname,(avgresum/(avgmax+1))as success_rate,avgtime,avgmax+1 as intentos from viewqp2 order by topicorder; 
```
# GetAE666:

### Descripcion

### Este servicio nos otorga el promedio de tiempo por actividad y nivel de completacion para Animated Example y Master Grid

### Salida

```javascript
[
    nombreactividad,
    ...
]

//NOMBREACTIVIDAD OBJECT

{
    "appid": 3, 
    "topicname": classes_objects, //nombre tópico
    "tiempo_promedio": 29.8895, //tiempo promedio en segundos
    "nivel_completacion": 0.40539992702801314,//nivel de completacion 
}
```

## Consulta SQL
### Para esta consulta, se crea un primer archivo de vista 

```SQL
create view animated_def as select topicorder,user,appid,topicname,parentname,sum(durationseconds) as sumtime,max(CAST(activityname AS UNSIGNED))+1 as maxline,count(distinct(activityname))as cant from activity_traces where(appid=3 or appid=35)group by parentname,user;

```

### finalmente se hace la consulta a este archivo de vista

```SQL
select appid,parentname,topicname,avg(sumtime) as tiempo_promedio,(avg(cant)/max(maxline)) as nivel_de_completation from animated_def group by parentname order by topicorder;
```

