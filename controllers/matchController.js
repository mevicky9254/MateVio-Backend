import Match from '../models/match.model.js';

export const createMatch = async (req, res) => {
  try {
    const { user2, compatibilityScore } = req.body;
    const user1 = req.user._id;

    // Prevent duplicate match
    const exists = await Match.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
    });

    if (exists) return res.status(400).json({ message: 'Match already exists' });

    const match = await Match.create({
      user1,
      user2,
      compatibilityScore,
      status: 'pending',
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }],
      status: 'matched',
    }).populate('user1 user2', 'name email');

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMatchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Only user1 or user2 can update
    if (![match.user1.toString(), match.user2.toString()].includes(req.user._id.toString()))
      return res.status(403).json({ message: 'Not authorized' });

    match.status = status;
    await match.save();

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
