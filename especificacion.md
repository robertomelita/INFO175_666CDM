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
                            parentname : VARCHAR[255],
                            appid : INT,
                            durationseconds : FLOAT, 
                            concurrencia : INT
                        },...
                    ]
                    
        annotatedex : [
                        {
                            parentname : VARCHAR[255],
                            appid : INT,
                            durationinseconds : FLOAT, 
                            concurrencia : INT,
                        },...
                    ]
    },...
]
