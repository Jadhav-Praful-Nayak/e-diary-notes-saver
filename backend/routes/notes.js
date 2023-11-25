const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// route 1 for getting user details using GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
// route 2 adding new notes using POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title length of 3").isLength({ min: 3 }),
    body("description", "Enter a description length of 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //error handling while creating notes
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// route 3 updating a existing  notes using POST "/api/notes/updatenote" login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("No access given");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// route 4 deleting a existing  notes using DE:ETE "/api/notes/deletenote" login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //allow to delete if only authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("No access given");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Success note has been deleted");
  } catch (error) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
