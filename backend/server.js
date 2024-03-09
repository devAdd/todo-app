import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const app = express();
app.use(express.json());
app.use(cors());

 
app.get("/super-secure-resource", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
});

app.listen(3001, () => {
  console.log("API running on localhost:3001");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`${email} is trying to login ..`);

  if (email === "aadd@add.com" && password === "12345") {
    return res.json({
      token: jwt.sign({ user: "admin" }, JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});

app.post('/logout', (req, res) => {
    // Perform logout actions here
    // For example, clear session, remove authentication token, etc.
    // In this example, we're assuming session-based authentication
    return res
    .status(200)
    .json({ message: "Logged out succesfully !" });
});
app.get("/todo", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(token, JWT_SECRET);
    const status = req.query.status;
    let resData = data;
    if (status !== '') {
      resData = data.filter(item => item.status == status)
    }
    return res.status(200).json({
      data:resData,
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
});

app.post("/todo", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  
  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(token, JWT_SECRET);
    
    let d = {
      id: data.length + 1,
      title: req.body["title"],
      description: req.body["description"],
      status:req.body["status"]
    }
    data.push(d);
    return res.status(200).json({
      data:data,
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Not Authorized" });
  }
});

app.put("/todo/:id", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  
  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(token, JWT_SECRET);
    const id = req.params.id;
    const updated = updateObjectInArray(data, id, req.body);

    if (updated) {
      return res.status(200).json({
      data:data,
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
    } else {
      return res.status(200).json({
       message: `Object with given id not found in the array.`,
    });
    }
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
});


let data = [
  {
    id:1,
    title: "Test Title 1",
    description: "Test description 1",
    status:"OPEN"
  },
  {
    id:2,
    title: "Test Title 2",
    description: "Test description 2",
    status:"PROGRESS"
  },
  {
    id:3,
    title: "Test Title 3",
    description: "Test description 3",
    status:"PROGRESS"
  },
  {
   id:4,
    title: "Test Title 4",
    description: "Test description 4",
    status:"DONE"
  }
  
]

function updateObjectInArray(array, idToUpdate, updatedObject) {
    // Find the index of the object with the given id
    const index = array.findIndex(obj => obj.id == idToUpdate);
  
    // If object with given id is found
    if (index !== -1) {
        // Update the object in the array
        array[index] = { ...array[index], ...updatedObject };
        return true; // Return true to indicate success
    }
    return false; // Return false if object with given id is not found
}
