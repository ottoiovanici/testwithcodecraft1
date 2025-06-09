const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  mood: {
    type: String,
    enum: ['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'excited', 'angry', 'grateful', 'reflective'],
    default: 'neutral'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  weather: {
    type: String,
    maxlength: [100, 'Weather description cannot exceed 100 characters']
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'audio', 'video', 'document'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  }],
  readingTime: {
    type: Number, // in minutes
    default: 0
  },
  wordCount: {
    type: Number,
    default: 0
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  reminderDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
journalSchema.index({ userId: 1, createdAt: -1 });
journalSchema.index({ userId: 1, tags: 1 });
journalSchema.index({ userId: 1, mood: 1 });
journalSchema.index({ userId: 1, isFavorite: 1 });
journalSchema.index({ userId: 1, title: 'text', content: 'text' });

// Pre-save middleware to calculate word count and reading time
journalSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    // Calculate word count
    const words = this.content.trim().split(/\s+/).filter(word => word.length > 0);
    this.wordCount = words.length;
    
    // Calculate reading time (average 200 words per minute)
    this.readingTime = Math.ceil(this.wordCount / 200);
  }
  next();
});

// Virtual for excerpt
journalSchema.virtual('excerpt').get(function() {
  const maxLength = 150;
  if (this.content.length <= maxLength) {
    return this.content;
  }
  return this.content.substring(0, maxLength) + '...';
});

// Virtual for formatted creation date
journalSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for relative time
journalSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
});

// Instance method to get mood emoji
journalSchema.methods.getMoodEmoji = function() {
  const moodEmojis = {
    'very-happy': '😄',
    'happy': '😊',
    'neutral': '😐',
    'sad': '😢',
    'very-sad': '😭',
    'anxious': '😰',
    'excited': '🤩',
    'angry': '😠',
    'grateful': '🙏',
    'reflective': '🤔'
  };
  return moodEmojis[this.mood] || '😐';
};

// Static method to get user's journal statistics
journalSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalEntries: { $sum: 1 },
        totalWords: { $sum: '$wordCount' },
        averageWordsPerEntry: { $avg: '$wordCount' },
        favoriteEntries: { $sum: { $cond: ['$isFavorite', 1, 0] } },
        moodDistribution: {
          $push: '$mood'
        }
      }
    }
  ]);
  
  if (stats.length === 0) {
    return {
      totalEntries: 0,
      totalWords: 0,
      averageWordsPerEntry: 0,
      favoriteEntries: 0,
      moodDistribution: {}
    };
  }
  
  const result = stats[0];
  
  // Calculate mood distribution
  const moodCount = {};
  result.moodDistribution.forEach(mood => {
    moodCount[mood] = (moodCount[mood] || 0) + 1;
  });
  
  return {
    totalEntries: result.totalEntries,
    totalWords: result.totalWords,
    averageWordsPerEntry: Math.round(result.averageWordsPerEntry || 0),
    favoriteEntries: result.favoriteEntries,
    moodDistribution: moodCount
  };
};

// Static method to search entries
journalSchema.statics.searchEntries = async function(userId, searchTerm, filters = {}) {
  const query = { userId };
  
  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }
  
  if (filters.mood) {
    query.mood = filters.mood;
  }
  
  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }
  
  if (filters.dateFrom || filters.dateTo) {
    query.createdAt = {};
    if (filters.dateFrom) {
      query.createdAt.$gte = new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      query.createdAt.$lte = new Date(filters.dateTo);
    }
  }
  
  let sortOption = { createdAt: -1 };
  if (searchTerm) {
    sortOption = { score: { $meta: 'textScore' }, createdAt: -1 };
  }
  
  return this.find(query)
    .sort(sortOption)
    .populate('userId', 'username firstName lastName');
};

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;