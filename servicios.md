# Servicios

**getAvgTimeQP:**

*Descripcion*

Este servicio nos otorga el promedio de tiempo por actividad para las Quizpet y Parson

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



