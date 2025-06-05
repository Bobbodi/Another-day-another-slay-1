require("dotenv").config()

const config = require("./config.json")
const mongoose = require("mongoose")

mongoose.connect(config.connectionString)

const User = require("./models/user.model");
const Note = require("./models/note.model");
const Journal = require("./models/journal.model");
const Friends = require("./models/friends.model");
const StudyRoom = require("./models/studyroom.model");

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
    const { user } = req.user; 
    const isUser = await User.findOne({ _id: user._id }); 

    if (!isUser) { 
        return res.sendStatus(401);
    }
    
    return res.json({ user: {
        fullName: isUser.fullName,
        email: isUser.email, 
        "_id": isUser._id, 
        createdOn: isUser.createdOn
    }, 
        message: "" })
})


app.post("/add-note", authenticateToken, async (req, res) => { 
    const { title, content, priority, dueDate, tags } = req.body; 
    const { user } = req.user; 

    if (!title) {
        return res.status(400).json({error: true, message: "Title is required"});
    }

    try { 
        const note = new Note({
            title, 
            content, 
            priority, 
            dueDate,
            tags: tags || [], 
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
    const { title, content, priority, dueDate, tags, isDone } = req.body || {}; 
    const { user } = req.user;

    if (!title && !content && !priority && !dueDate && !tags) { 
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
        if (tags) note.tags = tags;
        if (isDone) note.isDone = isDone;
        
        await note.save(); 

        return res.json({ error: false, note, message: "Note updated successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error"})
    }
})

app.get("/get-all-notes/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const notes = await Note.find({ userId: user._id})
        .sort({ isDone: -1});

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
        })
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

//STUDY ROOM 
app.get("/get-all-studyroom/", authenticateToken, async (req, res) => { 
    const { user } = req.user; 

    try { 
        const studyRoom = await StudyRoom.find({ owner: user._id})
        .sort({ createdOn: -1});

        return res.json({ error: false, studyRoom, message: "All study rooms retrieved successfully"})
    } catch (error) { 
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.delete("/delete-note/:studyroomId", authenticateToken, async (req, res) => { 
    const studyroomId = req.params.studyroomId;
    //const { user } = req.user;

    try { 
        const studyRoom = await StudyRoom.findOne({ _id: studyroomId });

        if (!studyRoom) { 
            return res.status(404).json({ error: true, message: "Study Room not found" })
        }
        
        await StudyRoom.deleteOne({ _id: studyroomId });

        return res.json({ error: false, message: "Study Room deleted successfully" })
    } catch (error) { 
        return res.status(500).json({ 
            error: true, 
            message: "Internal Server Error"
        })
    }
})


app.listen(8000);
module.exports = app;