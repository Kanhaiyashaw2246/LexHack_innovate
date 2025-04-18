import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  id: String,
  type: String,
  content: mongoose.Schema.Types.Mixed,
  xpReward: Number,
  completed: Boolean,
});

const moduleSchema = new mongoose.Schema({
  id: String,
  maximId: String,
  activities: [activitySchema],
  totalXp: Number,
  completed: Boolean,
});

export default mongoose.model('Module', moduleSchema);
