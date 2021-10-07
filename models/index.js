const sequelize = require('../sequelize')

const User = require('./user.model')
const Post = require('./post.model')
const Upload = require('./upload.model')
const LikeHistory = require('./like-history.model')

// Has

User.hasMany(Post, {
  foreignKey: {
    name: 'authorId',
    allowNull: false
  },
  onDelete: 'CASCADE'
})

Upload.hasMany(User, {
  foreignKey: {
    name: 'avatarId'
  }
})

Upload.hasMany(Post, {
  foreignKey: {
    name: 'mediaId'
  }
})

Post.hasMany(LikeHistory, {
  foreignKey: {
    name: 'postId',
    allowNull: false
  }
})

// Belongs

Post.belongsTo(User, {
  foreignKey: {
    name: 'authorId',
    allowNull: false
  }
})

Post.belongsTo(Upload, {
  foreignKey: {
    name: 'mediaId'
  }
})

User.belongsTo(Upload, {
  foreignKey: {
    name: 'avatarId'
  }
})