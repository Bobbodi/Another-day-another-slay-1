require("dotenv").config()
//const OpenAI = require("openai");
const { estimateTaskDuration } = require("./helper.js");
//const date = require("date-fns");

const config = require("./config.json")
const mongoose = require("mongoose")


mongoose.connect(config.connectionString)

const User = require("./models/user.model");
const Note = require("./models/note.model");
const Journal = require("./models/journal.model");
const Friends = require("./models/friends.model");
const Mood = require("./models/mood.model");
const Sleep = require("./models/sleep.model");
const Study = require("./models/study.model.js");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

//TASKS/NOTES!!
app.get("/", (req, res) => { 
    res.json({data: "hello"})
})

app.post("/create-account", async (req, res) => { 
    const { fullName, email, password } = req.body;

    if (!fullName) { 
        return res.status(400).json({error: true, message: "Full Name is required"});
    }

    if (!email) { 
        return res.status(400).json({error: true, message: "Email is required"});
    }

    if (!password) { 
        return res.status(400).json({error: true, message: "Password is required"});
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) { 
        return res.json({
            error:true, message: "User already exists"
        })
    }

    const user = new User({
        fullName, 
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({ user }, 
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "360000m",
        });

    return res.json({
        error: false, 
        user, 
        accessToken, 
        message: "Registration Successful"
    });

})

app.post("/login", async (req, res) => { 
    console.log(req.body);
    const { email, password } = req.body; 

    if (!email) { 
        return res.status(400).json({error: true, message: "Email is required"});
    }

    if (!password) { 
        return res.status(400).json({error: true, message: "Password is required"});
    }

    const userInfo = await User.findOne({ email: email }); 

    if (!userInfo) { 
        return res.status(400).json({message: "User not found"});
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = {user: userInfo}; 
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { 
            expiresIn: "36000m",
        })

        return res.json({
            error: false, 
            message: "Login Successful", 
            email, 
            accessToken,
        })
    } else { 
        return res.status(400).json({
            error: true, 
            message: "Invalid Credentials",
        })
    }
})

app.get("/get-user", authenticateToken, async (req, res) => { 
    try { 
        const { user } = req.user; 
        const isUser = await User.findOne({ _id: user._id }); 

        if (!isUser) { 
            return res.sendStatus(401);
        }
        
        return res.json({ user: {
            fullName: isUser.fullName,
            email: isUser.email, 
            "_id": isUser._id, 
            avatar: isUser.avatar,
            studyroom: isUser.studyroom,
            createdOn: isUser.createdOn
        }, 
            message: "" })
    } catch (error) { 
        return res.status(401).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.post("/add-note", authenticateToken, async (req, res) => { 
    const { title, content, priority, isEvent, dueDate, whenDone, tags } = req.body; 
    const { user } = req.user; 

    if (!title) {
        return res.status(400).json({error: true, message: "Title is required"});
    } else if (isEvent && !dueDate) { 
        return res.status(400).json({error: true, message: "An event must have a date"});
    }

    try { 
        const note = new Note({
            title, 
            content, 
            priority: priority || null, 
            dueDate,
            whenDone, 
            tags: tags || [], 
            isEvent,
            userId: user._id,
        });

        await note.save(); 

        return res.json({
            error: false,
            note, 
            message: "Note added successfully",
        }) 
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => { 
    const noteId = req.params.noteId;
    const { title, content, priority, dueDate, tags, isEvent, whenDone, isDone } = req.body || {}; 
    const { user } = req.user;

    if (!title && !content && !priority && !dueDate && !tags &&!isEvent &&!whenDone) { 
        return res
        .status(400)
        .json({ error: true, message: "No changes provided" })
    }

    try { 
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) { 
            return res.status(400).json({error: true, message: "Note not found"});
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (priority) note.priority = priority;
        if (dueDate) note.dueDate = dueDate;
        if (whenDone) note.whenDone = whenDone;
        if (tags) note.tags = tags;
        if (isDone) note.isDone = isDone;
        if (isEvent) note.isEvent = isEvent;
        
        await note.save(); 

        return res.json({ error: false, note, message: "Note updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

app.get("/get-all-notes/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const notes = await Note.find({ userId: user._id});
        //.sort({ isDone: -1});

        return res.json({ error: false, notes, message: "All notes retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => { 
    const noteId = req.params.noteId;
    const { user } = req.user;

    try { 
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) { 
            return res.status(404).json({ error: true, message: "Note not found" })
        }
        
        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({ error: false, message: "Note deleted successfully" })
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.put("/update-note-done/:noteId", authenticateToken, async (req, res) => { 
    const noteId = req.params.noteId;
    const { isDone } = req.body || {}; 
    const { user } = req.user;

    try { 
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) { 
            return res.status(400).json({error: true, message: "Note not found"});
        }
        
        note.isDone = isDone || false;
        //update done date if done
        isDone ? note.whenDone = new Date().getTime() : note.whenDone = null;
        
        await note.save(); 

        return res.json({ error: false, note, message: "Note updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

app.get("/search-notes/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 
    const { query } = req.query; 

    if (!query) { 
        return res.status(400).json({ error: true, message: "Search query is required"});
    }

    try { 
        const matchingNotes = await Note.find({ 
            userId: user._id, 
            $or: [
                {title: {$regex: new RegExp(query, 'i')}},
                {content: {$regex: new RegExp(query, "i")}},
                {tags: {$regex: new RegExp(query, "i")}},
            ],
        }).sort({ isDone: 1});
        return res.json({ error: false, 
            notes: matchingNotes,
            message: "Notes found"
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

//JOURNAL
app.post("/add-journal", authenticateToken, async (req, res) => { 
    console.log(req.body);
    const { entry } = req.body; 
    const { user } = req.user; 

    if (!entry) {
        return res.status(400).json({error: true, message: "Text is required"});
    }

    try { 
        const journal = new Journal({
            entry, 
            userId: user._id,
        });

        await journal.save(); 

        return res.json({
            error: false,
            journal, 
            message: "Journal added successfully",
        }) 
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.get("/get-all-journal/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const journals = await Journal.find({ userId: user._id})
        .sort({ createdOn: -1});

        return res.json({ error: false, journals, message: "All journals retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.delete("/delete-journal/:journalId", authenticateToken, async (req, res) => { 
    const journalId = req.params.journalId;
    const { user } = req.user;

    try { 
        const journal = await Journal.findOne({ _id: journalId });

        if (!journal) { 
            return res.status(404).json({ error: true, message: "Journal not found" })
        }
        
        await Journal.deleteOne({ _id: journalId });

        return res.json({ error: false, message: "Journal deleted successfully" })
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

//FRIENDS
//person 1 has status 0/1/2 with person 2
//change the logic to add friends depending on the person ID 
//1. accept friend request 
//2. reject friend request 
app.post("/send-friend-request", authenticateToken, async (req, res) => { 
    const { person1, person2 } = req.body;

    try {
        // Check if friendship already exists
        const existingFriendship = await Friends.findOne({
            $or: [
                { person1, person2 },
                { person1: person2, person2: person1 }
            ]
        });

        if (existingFriendship) {
            return res.status(400).json({
                error: true,
                message: existingFriendship.status === 1 
                    ? "Friend request already pending" 
                    : "You are already friends"
            });
        }

        const friendship = new Friends({
            person1,
            person2, 
            status: 1 // 1 = pending
        });

        await friendship.save();

        return res.json({
            error: false,
            friendship, 
            message: "Friend request sent successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        });
    }
});

//accept friend request. person1 is sending a friend request to person 2
//so person2 is the one that accepts it 
app.put("/accept-friend-request/:friendshipId", authenticateToken, async (req, res) => { 
    const { user } = req.user;
    const friendshipId = req.params.friendshipId;

    try { 
        const friendship = await Friends.findOne({ _id: friendshipId });
        //, person2: user._id
        if (!friendship) { 
            return res.status(400).json({error: true, message: "Friendship not found"});
        }
        
        friendship.status = 2
        
        await friendship.save(); 

        return res.json({ error: false, friendship, message: "Accept friend request updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

//delete friend request. person1 is sending a friend request to person 2
//so person2 is the one that deletes it 
app.put("/delete-friend-request/:friendshipId", authenticateToken, async (req, res) => { 
    const { user } = req.user;
    const friendshipId = req.params.friendshipId;

    try { 
        const friendship = await Friends.findOne({ _id: friendshipId });
        //, person2: user._id
        if (!friendship) { 
            return res.status(400).json({error: true, message: "Friendship not found"});
        }
        
        await Friends.deleteOne({ _id: friendshipId });

        return res.json({ error: false, friendship, message: "Delete friend request updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

//friendships where status = 2 (already friends)
app.get("/get-all-friends/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const friendships = await Friends.find({
            $or: [
                { person1: user._id },
                { person2: user._id }
            ],
            status: 2,
        })

        // 2. Get all unique friend IDs (excluding the current user)
        const friendIds = friendships.map(f => 
            f.person1.toString() === user._id.toString() ? f.person2 : f.person1
        );

        // 3. Get user details for these friends
        const friends = await User.find(
            { _id: { $in: friendIds } },
            { fullName: 1 } // Only return name field
        ).lean();

        // Attach friendshipId to each friend
        const result = friendships.map(f => ({
            ...friends.find(friend => 
                friend._id.toString() === 
                (f.person1.toString() === user._id.toString() ? f.person2 : f.person1).toString()
            ),
            friendshipId: f._id
        }));

        console.log(result);

        return res.json({ error: false, friends: result, message: "All friends' name retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

//friendships where status = 2 (already friends) -- for STUDY page to show me and my friends' avatar studying 
app.get("/get-all-friends-avatar/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const friendships = await Friends.find({
            $or: [
                { person1: user._id },
                { person2: user._id }
            ],
            status: 2,
        })

        // Get all unique friend IDs (excluding the current user)
        const friendIds = friendships.map(f => 
            f.person1.toString() === user._id.toString() ? f.person2 : f.person1
        );

        // Get user details for these friends
        const friends = await User.find(
            { _id: { $in: friendIds } },
            { fullName: 1, avatar: 1 } // Only return name field
        ).lean();

        const me = await User.findById(
            user._id, 
            { fullName: 1, avatar: 1}
        ).lean(); //fetch my own details and append to result 

        // Attach friendshipId to each friend
        const result0 = friendships.map(f => ({
            ...friends.find(friend => 
                friend._id.toString() === 
                (f.person1.toString() === user._id.toString() ? f.person2 : f.person1).toString()
            ),
            friendshipId: f._id
        }));

        console.log(result0);

        const result = [
            { ...me, friendshipId: null}, //add my details also 
            ...result0
        ]
        

        return res.json({ error: false, friends: result, message: "All friends' name retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

//friendships where status = 1 (pending friend req)
app.get("/get-friend-requests/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        // 1. Get incoming requests (where person2 is current user)
        const incomingRequests = await Friends.find({
            person2: user._id,
            status: 1
        }).lean();

        // 2. Get sent requests (where person1 is current user)
        const sentRequests = await Friends.find({
            person1: user._id,
            status: 1
        }).lean();

        // 3. Get user details for all involved users
        const allFriendIds = [
            ...incomingRequests.map(f => f.person1),
            ...sentRequests.map(f => f.person2)
        ];

        const users = await User.find(
            { _id: { $in: allFriendIds } },
            { fullName: 1 }
        ).lean();

        // 4. Process incoming requests
        const processedIncoming = incomingRequests.map(f => {
            const requester = users.find(u => u._id.toString() === f.person1.toString());
            return {
                ...requester,
                friendshipId: f._id,
            };
        });

        // 5. Process sent requests
        const processedSent = sentRequests.map(f => {
            const recipient = users.find(u => u._id.toString() === f.person2.toString());
            return {
                ...recipient,
                friendshipId: f._id,
            };
        });

        return res.json({ 
            error: false, 
            incomingFriendRequests: processedIncoming,
            sentFriendRequests: processedSent,
            message: "Friend requests retrieved successfully"
        });
    
    } catch (error) { 
        console.error(error);
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error" 
        });
    }
});

//can only search for users where friendships != 1 or 2 (not friends)
app.get("/search-users/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 
    const { query } = req.query; 

    if (!query) { 
        return res.status(400).json({ error: true, message: "Search query is required"});
    }

    try { 
        // 1. Find all friendships involving the current user
        const friendships = await Friends.find({
            $or: [
                { person1: user._id },
                { person2: user._id }
            ]
        });

        // 2. Collect all user IDs that are already friends or have pending requests
        const excludedIds = friendships.flatMap(f => [
            f.person1.toString(),
            f.person2.toString()
        ]);
        // Always exclude self
        excludedIds.push(user._id.toString());

        // 3. Find users not in excludedIds and matching the query
        const matchingPeople = await User.find({ 
            _id: { $nin: excludedIds },
            fullName: { $regex: new RegExp(query, 'i') }
        });

        return res.json({ error: false, users: matchingPeople, message: "users found" });
        
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error"});
    }
});

app.get("/get-all-users/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const users = await User.find()
        console.log(users);
        return res.json({ error: false, users, message: "All users retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

//MOOD
app.post("/add-mood", authenticateToken, async (req, res) => { 
    console.log(req.body);
    const { mood } = req.body; 
    const { user } = req.user; 

    if (!mood) {
        return res.status(400).json({error: true, message: "Mood is required"});
    }

    try { 
        const moodLog = new Mood({
            mood, 
            userId: user._id,
        });

        await moodLog.save(); 
        console.log("mood added")
        return res.json({
            error: false,
            moodLog, 
            message: "Mood added successfully",
        }) 
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.get("/get-all-mood/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const moods = await Mood.find({ userId: user._id})
        .sort({ createdOn: -1});

        return res.json({ error: false, moods, message: "All moods retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.delete("/delete-mood/:moodId", authenticateToken, async (req, res) => { 
    const moodId = req.params.moodId;
    const { user } = req.user;

    try { 
        const mood = await Mood.findOne({ _id: moodId });

        if (!mood) { 
            return res.status(404).json({ error: true, message: "Mood not found" })
        }
        
        await Mood.deleteOne({ _id: moodId });

        return res.json({ error: false, message: "Mood deleted successfully" })
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

//SLEEP
app.post("/add-sleep", authenticateToken, async (req, res) => { 
    console.log(req.body);
    const { sleepStart, sleepEnd, dreams } = req.body; 
    const { user } = req.user; 

    //disable the button if already logged a sleep entry

    if (!sleepStart && !sleepEnd) {
        return res.status(400).json({error: true, message: "Sleep details are required"});
    } else if (!sleepEnd) { 
        return res.status(400).json({error: true, message: "Sleep end is required"})
    } else if (!sleepStart) { 
        return res.status(400).json({error: true, message: "Sleep start is required"})
    } 

    const formatedDreams = dreams 
        ? dreams.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ') 
        : null;

    try { 
        const sleepLog = new Sleep({
            sleepStart, 
            sleepEnd, 
            dreams: formatedDreams || null,
            userId: user._id,
        });

        await sleepLog.save(); 
        console.log("sleep added")
        return res.json({
            error: false,
            sleepLog, 
            message: "Sleep log added successfully",
        }) 
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

app.get("/get-this-week-sleep/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Exactly 7 days ago

        const sleeps = await Sleep.find({ 
            userId: user._id,
            createdOn: {
                $gte: oneWeekAgo, // Created in the last 7 days
                $lte: now // Optional: up to now (if you want to exclude future entries)
            }
        }).sort({ createdOn: -1 }); // Newest first

        return res.json({ error: false, sleeps, message: "All sleeps retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.get("/get-all-sleep/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const sleeps = await Sleep.find({ userId: user._id})
        .sort({ createdOn: 1});
        console.log(sleeps);
        return res.json({ error: false, sleeps, message: "All sleeps retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.delete("/delete-sleep/:sleepId", authenticateToken, async (req, res) => { 
    const sleepId = req.params.sleepId;
    const { user } = req.user;

    try { 
        const sleep = await Sleep.findOne({ _id: sleepId });

        if (!sleep) { 
            return res.status(404).json({ error: true, message: "Sleep not found" })
        }
        
        await Sleep.deleteOne({ _id: sleepId });

        return res.json({ error: false, message: "Sleep deleted successfully" })
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})

//STUDY
app.post("/add-study-session", authenticateToken, async (req, res) => { 
    console.log(req.body);
    const { studyStart, studyEnd, elapsedTime, 
            completedTasks, studyRoom } = req.body; 
    const { user } = req.user; 

    const formatTasks = (completedTasks) => { 
        if (!Array.isArray(completedTasks)) return [];
        return completedTasks.map((task) => ({
            ...task,
            whenDone: Date.now(),
        }));
    }

    try { 
        console.log("HERE4");
        const formattedTasks = formatTasks(completedTasks);
        console.log(studyStart, studyEnd, elapsedTime, completedTasks, studyRoom, user._id);
        const studyLog = new Study({
            studyStart, 
            studyEnd,
            elapsedTime,
            completedTasks: formattedTasks,
            studyRoom,
            userId: user._id,
        });
        console.log(studyLog); 

        await studyLog.save(); 
        
        return res.json({
            error: false,
            studyLog, 
            message: "Study log added successfully",
        }) 
    } catch (error) { 
        console.log(error.message); 
        return res.status(500).json({ 
            error: true, 
            message: error.message || "Internal Server Error"
        })
    }
})

app.get("/get-today-study-time", authenticateToken, async (req, res) => {
    const { user } = req.user; 

    try { 
        const studies = await Study.find({ userId: user._id}).exec();
        console.log(studies);
        const seconds = studies
            .filter(study => new Date(study.createdOn).getDate() == new Date().getDate())
            .reduce((sum, studySession) => 
                sum + studySession.elapsedTime, 
                0
        )

        const hours = Math.floor(seconds/3600); 
        const mins = Math.floor((seconds%3600) / 60);
        console.log("SECONDS"+seconds); 
        return res.json({ error: false, total:`${hours}h ${mins}m`, message: "All studies retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.get("/get-all-study-time/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        
        const studies = await Study.find({ userId: user._id}).exec();
        console.log(studies);
        const seconds = studies.reduce((sum, studySession) => 
            sum + studySession.elapsedTime, 
            0
        )

        const hours = Math.floor(seconds/3600); 
        const mins = Math.floor((seconds%3600) / 60);
        console.log("SECONDS"+seconds); 
        return res.json({ error: false, total:`${hours}h ${mins}m`, message: "All studies retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.get("/get-today-study-time", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const total = 0;
        const studies = await Study.find({ userId: user._id, createdOn: new Date().getTime() })
        .map((studySession) => { 
            total += studySession.elapsedTime;
        })
        return res.json({ error: false, total, message: "All studies retrieved successfully"}); 
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"});
    }
})

//AVATAR 
app.put("/change-avatar/:userId", authenticateToken, async (req, res) => { 
    const userId = req.params.userId;
    const { newAvatar } = req.body || {}; 
    const { user } = req.user;

    try { 
        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) { 
            return res.status(400).json({error: true, message: "User not found"});
        }
        
        existingUser.avatar = newAvatar || existingUser.avatar;

        await existingUser.save(); 

        return res.json({ error: false, existingUser, message: "Avatar updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

//STUDY ROOM 
app.put("/change-studyroom/:userId", authenticateToken, async (req, res) => { 
    const userId = req.params.userId;
    const { newRoom } = req.body || {}; 
    const { user } = req.user;

    try { 
        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) { 
            return res.status(400).json({error: true, message: "User not found"});
        }
        
        existingUser.studyroom = newRoom || existingUser.avatar;

        await existingUser.save(); 

        return res.json({ error: false, existingUser, message: "Study Room updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

app.listen(8000);
module.exports = app;


// const response = await openai.chat.completions.create({
//             model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You're a productivity assistant that suggests which 3 tasks to focus on today."
//                 },
//                 {
//                     role: "user",
//                     content: `Suggest which tasks I should do today from these notes, considering priority (5=highest), due dates, and content. Return only the titles in a JSON array: ${JSON.stringify(notesForPrompt)}`
//                 }
//             ],
//             temperature: 0.3,
//             response_format: { type: "json_object" }
//         });
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENAI_API_KEY,
// });

//ask openai
// app.post("/api/suggest-priority-notes", authenticateToken, async (req, res) => {
//     try {
//         const { notes } = req.body;
//         if (!notes || !Array.isArray(notes) || notes.length === 0) {
//             return res.status(400).json({ error: true, message: "No notes provided" });
//         }

//         // Compose a prompt for OpenAI
//         const prompt = `Given these tasks:\n${notes.map((n, i) => `${i + 1}. ${n.title} (priority: ${n.priority}, due: ${n.dueDate})`).join('\n')}\nSuggest the top 3 tasks to focus on today. Return only the titles as a JSON array.`;

//         // Call OpenAI
//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 100,
//         });

//         // Extract the suggested titles from OpenAI's response
//         let suggestedTitles = [];
//         try {
//             // Try to parse JSON array from the response
//             suggestedTitles = JSON.parse(completion.choices[0].message.content);
//         } catch (e) {
//             // Fallback: extract titles from plain text
//             suggestedTitles = completion.choices[0].message.content
//                 .split('\n')
//                 .map(line => line.replace(/^\d+\.\s*/, '').trim())
//                 .filter(Boolean);
//         }

//         return res.json({ error: false, suggestedNotes: suggestedTitles });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// });
// app.post('/api/suggest-priority-notes', authenticateToken, async (req, res) => {
//     try {
//         const { notes } = req.body; // Expects array of note objects
//         console.log(notes);
//         if (!Array.isArray(notes) || notes.length === 0) {
//             return res.status(400).json({ error: true, message: "No notes provided" });
//         }

//         // Format notes for OpenAI prompt
//         const notesForPrompt = notes.map(note => ({
//             title: note.title,
//             priority: note.priority || 3, // Default to medium priority
//             dueDate: note.dueDate || 'No deadline',
//             content: note.content
//         }));

//         const response = await openai.chat.completions.create({
//             model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
//             messages: [
//                 {
//                     role: "system",
//                     content: `You are an intelligent productivity assistant 
//                             that schedules tasks optimally based on: 
//                             1. Current time (e.g., if it is 9 PM and the user sleeps at 11 PM, only 1–2 tasks fit)
//                             2. Task Priority (3 = highest priority, 1 = lowest)
//                             3. Due dates (urgent tasks first)
//                             4. Estimated time to complete (realistic time blocking)
//                             5. Task variety (avoid stacking similar subjects/concentration-heavy tasks consecutively)
//                             6. Breaks (assume 5 to 15 min breaks every 1 to 2 hours, 30 to 60 min for meals)`
//                 },
//                 {
//                     role: "user",
//                     content: `Suggest which tasks I should do on which day. I would like deterministic output. 
//                     Use a sorting algorithm (e.g., prioritize due dates first, then priority, then shuffle similar 
//                     tasks for variety). Return only the titles in a JSON array, grouped by the day it should be done: ${JSON.stringify(notesForPrompt)}`
//                 }
//             ],
//             temperature: 0.3,
//             response_format: { type: "json_object" }
//         });

//         const suggestions = JSON.parse(response.choices[0].message.content);
//         console.log(suggestions)
//         res.json({ suggestedNotes: suggestions });

//     } catch (error) {
//         console.error("OpenAI error:", error);
//         res.status(500).json({ error: "Failed to get suggestions" });
//     }
// });
