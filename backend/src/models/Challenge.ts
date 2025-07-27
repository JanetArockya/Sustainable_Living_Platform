import mongoose, { Document, Schema } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  category: 'carbon' | 'energy' | 'waste' | 'water' | 'transportation' | 'food';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  participants: mongoose.Types.ObjectId[];
  maxParticipants?: number;
  rewards: {
    points: number;
    badges: string[];
  };
  goals: {
    target: number;
    unit: string;
    metric: string;
  };
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChallengeSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a challenge title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['carbon', 'energy', 'waste', 'water', 'transportation', 'food']
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify difficulty level'],
    enum: ['easy', 'medium', 'hard']
  },
  duration: {
    type: Number,
    required: [true, 'Please specify duration in days'],
    min: 1,
    max: 365
  },
  startDate: {
    type: Date,
    required: [true, 'Please specify start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please specify end date']
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxParticipants: {
    type: Number,
    default: null
  },
  rewards: {
    points: {
      type: Number,
      required: true,
      min: 0
    },
    badges: [{
      type: String
    }]
  },
  goals: {
    target: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    metric: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Update status based on dates
ChallengeSchema.pre('save', function(next) {
  const now = new Date();
  
  if (now < this.startDate) {
    this.status = 'upcoming';
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = 'active';
  } else if (now > this.endDate) {
    this.status = 'completed';
  }
  
  next();
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
