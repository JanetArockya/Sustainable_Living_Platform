import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  carbonFootprint: number;
  sustainabilityScore: number;
  goals: {
    type: 'carbon_reduction' | 'energy_saving' | 'waste_reduction' | 'water_conservation';
    target: number;
    current: number;
    deadline: Date;
  }[];
  preferences: {
    notifications: boolean;
    publicProfile: boolean;
    dataSharing: boolean;
    language: string;
    units: 'metric' | 'imperial';
  };
  achievements: string[];
  joinedChallenges: mongoose.Types.ObjectId[];
  location?: {
    country: string;
    city: string;
    coordinates?: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  carbonFootprint: {
    type: Number,
    default: 0
  },
  sustainabilityScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  goals: [{
    type: {
      type: String,
      enum: ['carbon_reduction', 'energy_saving', 'waste_reduction', 'water_conservation'],
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      default: 0
    },
    deadline: {
      type: Date,
      required: true
    }
  }],
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    publicProfile: {
      type: Boolean,
      default: false
    },
    dataSharing: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    },
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    }
  },
  achievements: [{
    type: String
  }],
  joinedChallenges: [{
    type: Schema.Types.ObjectId,
    ref: 'Challenge'
  }],
  location: {
    country: String,
    city: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next: any) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id }, 
    process.env.JWT_SECRET || 'fallback_secret', 
    { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);