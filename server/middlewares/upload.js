const fs = require('fs');
const multer = require('multer');
const { v4 } = require('uuid');

const MAX_FILE_SIZE_VIDEO = 1000; // 1GB
const MAX_FILE_SIZE_THUMBNAIL = 10; // 10MB
const MAX_FILE_SIZE_NOTES = 100; // 100MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, 'public/images');
    } else if (file.mimetype.includes('pdf')) {
      cb(null, 'public/pdfs');
    } else if (file.mimetype.includes('video')) {
      cb(null, 'public/videos');
    }
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    const uid = v4();
    const fileName = `${uid}.${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('image') ||
    file.mimetype.includes('pdf') ||
    file.mimetype.includes('video')
  ) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const getUpload = (type, next) => {
  let MAX_FILE_SIZE;

  switch (type) {
    case 'thumbnail':
      MAX_FILE_SIZE = MAX_FILE_SIZE_THUMBNAIL;
      break;
    case 'module':
      MAX_FILE_SIZE = MAX_FILE_SIZE_VIDEO;
      break;
    default:
      next(new Error('INVALID MEDIA ATTRIBUTE'));
  }

  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE * 1024 * 1024,
    },
    fileFilter,
  });
  return upload;
};

const normalizeFilePath = (req, res, next) => {
  if (!req.file) return next();
  req.file.path = req?.file?.path.replace(/\\/g, '/');
  next();
};

const folderCheck = () => {
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  if (!fs.existsSync('public/pdfs')) {
    fs.mkdirSync('public/pdfs', { recursive: true });
  }
  if (!fs.existsSync('public/videos')) {
    fs.mkdirSync('public/videos', { recursive: true });
  }
};

folderCheck();

module.exports = {
  thumbnail: () => {
    return [getUpload('thumbnail').single('thumbnail'), normalizeFilePath];
  },
  moduleUpload: () => {
    return [getUpload('module').single('module'), normalizeFilePath];
  },
};
