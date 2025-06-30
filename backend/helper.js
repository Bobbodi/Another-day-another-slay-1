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