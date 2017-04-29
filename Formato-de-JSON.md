[
    {
        topicname :   String
        quizpet :   [
                        { 
                            appid : INT,
                            durationseconds : FLOAT,
                            intentos** : INT,
                            result : INT,
                            activityname: String,
                            concurrencia** : INT
                        },...
                        
                    ]
                    
        parson :    [
                        { 
                            appid : INT,
                            durationseconds : FLOAT,
                            intentos** : INT,
                            result : INT,
                            activityname: String,
                            concurrencia** : INT
                        },...
                    ]
                    
        animatedex :  [
                        {
                            parentname : String,
                            appid : INT,
                            durationseconds : FLOAT, 
                            concurrencia : INT
                        },...
                    ]
                    
        annotatedex : [
                        {
                            parentname : String,
                            appid : INT,
                            durationinseconds : FLOAT, 
                            concurrencia : INT,
                        },...
                    ]
    },...
]
