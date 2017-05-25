# Servicios

# getQP:

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
    "activityname": q_py_obj_car2, //nombre actividad
    "avgtime": 29.8895, //tiempo promedio en segundos
    "success_rate": 0.40539992702801314,//tasa de éxito
    "intentos": 2.4667,//intento promedio 
}
```

## Consulta SQL
### Para esta consulta, se crea un primer archivo de vista 

```SQL
create view viewqp as select appid,activityname,topicname,sum(result) as resum,MAX(attemptno)as maxat,avg(durationseconds)as time from activity_traces where(appid=41 or appid=38) group by user,activityname;
```
### se crea luego un segundo archivo vista

```SQL
create view viewqp2 as select appid,activityname,topicname,avg(resum) as avgresum,avg(maxat) as avgmax,avg(time)as avgtime from viewqp group by activityname;
```
### finalmente se hace la consulta a este segundo archivo de vista

```SQL
select appid,topicname,activityname,(avgresum/(avgmax+1))as success_rate,avgtime,avgmax+1 as intentos from viewqp2 order by topicname; 
```


