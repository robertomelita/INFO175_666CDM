# Servicios

# getAvgTimeQP:

### Descripcion

### Este servicio nos otorga el promedio de tiempo por actividad para las Quizpet y Parson

### Salida

```javascript
[
    TOPICO,
    ...
]

//TOPICNAME OBJECT

{
    "appid": 41, //38 QUIZPET, 41 PARSON
    "activityname": q_py_obj_car2, //nombre actividad
    "time": 29.8895, //tiempo en segundos
}
```

## Consulta SQL
### Para esta consulta, se crea un archivo de vista que contiene el promedio de tiempo agrupado por nombre de actividad

```SQL
create view timepq3 as select appid,activityname,topicname,avg(durationseconds) as time from activity_traces where(appid=41 or appid=38) group by activityname order by topicname;
```
### Finalmente se hace la consulta sobre esta vista

```SQL
select appid,activityname,topicname,time from timepq3  order by topicname;
```

# getAttempQP:

**Descripcion**

### Este servicio nos otorga el numero de intentos por actividad 

**Salida**

```javascript
[
    TOPICO,
    ...
]

//TOPICNAME OBJECT

{
    "appid": 41, //38 para QUIZPET, 41 para PARSON
    "activityname": q_py_obj_car2, //nombre actividad
    "maxat": 4, //numero de intentos
}
```
## Consulta SQL

### Para esta consulta, se crea un archivo de vista que contiene al maximo de intentos y los agrupa por nombre de actividad

```SQL
create view view_attemp as select appid,applabel,topicname,activityname,MAX(attemptno) as maxat from activity_traces where (appid=38 or appid=41) group by activityname order by topicname;
```

### finalmente hacemos la consulta a este archivo de vista
```SQL
select activityname,topicname,maxat from view_attemp  order by topicname;
```


# getSuccessRateQP:

### Descripcion

### Este servicio nos otorga el success rate de cada actividad para las Quizpet y Parson

### Salida


```javascript
[
    TOPICO,
    ...
]

//TOPICNAME OBJECT

{
    "appid": 41, //38 QUIZPET, 41 PARSON
    "activityname": q_py_obj_car2, //nombre actividad
    "success_rate": 0.5471661979590701, //success rate de la actividad
}
```


## Consulta SQL
### Para esta consulta, primero se crea un archivo de vista que contiene la suma de result y el maximo de attemptno(intentos), agrupados por usurario y actividad.

```SQL
create view success3 as select appid,activityname,topicname,sum(result) as resum,MAX(attemptno)as maxat from activity_traces where(appid=41 or appid=38) group by user,activityname;
```

### Luego, se hace un segundo archivo de vista, el cual contiene el promedio de la suma de los result y el promedio de los maximos attemptno ,todo agrupado por actividad

```SQL
create view success_rate as select appid,activityname,topicname,avg(resum) as avgresum,avg(maxat) as avgmax from success3 group by activityname;
```
### Finalmente, se hace la consulta al segundo archivo de vista, entregando la el success_rate(avgresum/(avgmax+1)) 
### observacion: al promedio de  maximos intentos se le suma 1 ya que parte del intento 0.

```SQL
select appid,topicname,activityname,(avgresum/(avgmax+1)) from success_rate order by topicname;

```


