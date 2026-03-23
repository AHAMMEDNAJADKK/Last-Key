import Document from "../models/Document.js";

// ADD DOCUMENT
export const addDocument = async (req, res) => {
  try {
    const { name, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const document = await Document.create({
      user: req.user._id,
      name,
      category,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DOCUMENTS
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE DOCUMENT
export const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};