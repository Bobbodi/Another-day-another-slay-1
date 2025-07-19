export const estimateTaskDuration = (task) => {
    const { title, content, priority } = task; 

    let estimatedTime = 60; 

    const titleLower = title.toLowerCase(); 
    const shortTaskKeywords = ["email", "call", "message", "check", 
                            "reply", "quick", "help", "teach", "look", 
                            "remember", "bring"]
    const longTaskKeywords = ["review", "prepare", "draft", "read",
                            "code", "submit", "complete", "update", "do", 
                            "prep", "prepare", "find", "record"]
    const veryLongTaskKeywords = ["write", "essay", "presentation", "test", 
                            "exam", "revise", "finals", "midterms", 
                            "research", "meeting", "paper", "past year", 
                            ];
    
    //contains keywords in title that suggest task difficulty
    if (shortTaskKeywords.some(keyword => titleLower.includes(keyword))) { 
        estimatedTime = 30;
    } else if (longTaskKeywords.some(keyword => titleLower.includes(keyword))) { 
        estimatedTime = 120;
    } else if (veryLongTaskKeywords.some(keyword => titleLower.includes(keyword))) { 
        estimatedTime = 180;
    } 

    //longer content -> more details -> longer
    if (content) { 
        const wordCount = content.split(/\s+/).length; 
        wordCount > 20 
            ? estimatedTime += 20 
            : wordCount > 10 
                ? estimatedTime += 10
                : estimatedTime += 0; 
    }

    return estimatedTime; 

}

export const getSuggestions = (tasks) => { 
    const settings = { 
        wakeTime: 8, 
        sleepTime: 23,
        workHours: 4,
        minBreak: 5, 
        maxBreak: 15, 
        mealBreak: 30, 
        breakInterval: 90,
    };

    const parseDueDate = (dueDate) => { 
        if (!dueDate || dueDate === null) return Infinity; 
        return new Date(dueDate).getTime();
    };

    const sortedTasks = [...tasks].sort((a, b) => { 
        const aDue = parseDueDate(a.dueDate);
        const bDue = parseDueDate(b.dueDate);
        if (aDue !== bDue) return aDue - bDue; // Sort by due date first
        if (a.priority !== b.priority) return b.priority - a.priority; // Then by priority
        return (a.title.length + a.title.charCodeAt(0)) - (b.title.length + b.title.charCodeAt(0)); // hash for deterministic behaviour
    });

    
    //Group tasks by day 
    const dailySchedule = {}
    //calculate remaining hours
    const now = new Date();
    let currentDay = new Date(now); 
    const currentHour = now.getHours();
    let remainingTimeToday;

    if (currentHour >= settings.sleepTime) {
        //outside working hours (sleeping time)
        remainingTimeToday = 0;
    } else {
        //during working hours
        const workingHoursLeft = settings.sleepTime - currentHour;
        remainingTimeToday = Math.min(settings.workHours * 60, workingHoursLeft * 60);
        
        //account for minutes in the current hour:
        const currentMinutes = now.getMinutes();
        remainingTimeToday -= currentMinutes; // subtract minutes already passed in current hour
        remainingTimeToday = Math.max(0, remainingTimeToday); // ensure it doesn't go negative
    }

    for (const task of sortedTasks) { 
        if (task.isEvent) { 
            //an event 
            let dayKey = new Date(task.dueDate).toDateString(); 
            if (!dailySchedule[dayKey]) { 
                dailySchedule[dayKey] = [];
            }
            dailySchedule[dayKey].push(task); 
            continue; 
        }

        const duration = estimateTaskDuration(task);


        //no time to finish today, push to next day
        if (duration > remainingTimeToday) { 
            currentDay = new Date(currentDay); 
            currentDay.setDate(currentDay.getDate() + 1); 
            remainingTimeToday = settings.workHours * 60; 
        }

        //Add task to current day 
        dayKey = currentDay.toDateString(); 
        if (!dailySchedule[dayKey]) { 
            dailySchedule[dayKey] = [];
        }
        dailySchedule[dayKey].push(task); 

        //updateTimeLeft
        remainingTimeToday -= duration; 
        //no time left today, set currentDay to tomorrow
        if (remainingTimeToday <= 0) {
            currentDay = new Date(currentDay);
            currentDay.setDate(currentDay.getDate() + 1);
            remainingTimeToday = settings.workHours * 60;
        } else { 
            const workedSinceLastBreak = duration; 
            if (workedSinceLastBreak >= settings.breakInterval) { 
                const breakDuration = Math.min(Math.max(settings.minBreak, 
                                                        workedSinceLastBreak/10), //in hours
                                                settings.maxBreak); 
                remainingTimeToday -= breakDuration; 
            }
        }
    }


    //console.log(dailySchedule);
    //return reuslt 
    const result = {}
    Object.keys(dailySchedule).forEach(day => { 
        const date = new Date(day); 
        result[date] = dailySchedule[day];
    });

    //console.log("_-------------------------------");
    //console.log("RESULT_-------------------------")
    console.log(result);
    return res.json({ error: false, result, message: "Schedule retrieved successfully"});
}
        