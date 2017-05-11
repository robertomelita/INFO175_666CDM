# Servicios

# getAvgTimeQP:**

**Descripcion**

### Este servicio nos otorga el promedio de tiempo por actividad para las Quizpet y Parson

**Salida**

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

# Consulta SQL
### Para esta consulta, se crea un archivo de vista que se agrupa por nombre de actividad

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
# Consulta SQL

### Para esta consulta, se crea un archivo de vista que entrega al maximo de intentos y los agrupa por nombre de actividad

```SQL
create view view_attemp as select appid,applabel,topicname,activityname,MAX(attemptno) as maxat from activity_traces where (appid=38 or appid=41) group by activityname order by topicname;
```

### finalmente hacemos la consulta a este archivo de vista
```SQL
select activityname,topicname,maxat from view_attemp  order by topicname;
```


