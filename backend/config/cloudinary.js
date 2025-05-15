const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'campaign_media', // Adjusted folder to store all media related to campaigns
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi'], // Allows image and video formats
    resource_type: 'auto' // Automatically detects the type (image/video)
  }
});

// Main upload setup for both brand logo and campaign media
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for the total file uploads
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

module.exports = {
  cloudinary,
  upload
};
