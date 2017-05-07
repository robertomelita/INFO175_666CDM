# Especificacion de JSON
```[JavaScript]
[
    {
        topicname :   VARCHAR[255]
        quizpet :   [
                        { 
                            appid : INT,
                            durationseconds : FLOAT,
                            intentos : INT,
                            result : INT,
                            activityname: VARCHAR[255],
                            concurrencia : INT
                        },...
                        
                    ]
                    
        parson :    [
                        { 
                            appid : INT,
                            durationseconds : FLOAT,
                            intentos : INT,
                            result : INT,
                            activityname: VARCHAR[255],
                            concurrencia : INT
                        },...
                    ]
                    
        animatedex :  [
                        {
                            activityname : VARCHAR[255],
                            appid : INT,
                            durationseconds : FLOAT, 
                            popularity : INT
                        },...
                    ]
                    
        annotatedex : [
                        {
                            activitiname : VARCHAR[255],
                            appid : INT,
                            durationinseconds : FLOAT, 
                            popularity : INT,
                        },...
                    ]
    },...
]
```
