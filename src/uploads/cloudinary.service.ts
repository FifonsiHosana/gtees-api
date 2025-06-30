import { Injectable} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';


@Injectable()
export class CloudinaryService {
    
    async uploadImage(file: Express.Multer.File): Promise<{ url: string; public_id: string }> {
        return new Promise((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error('Upload failed with no result'));
              }
    
              resolve({
                url: result.secure_url,
                public_id: result.public_id,
              });
            },
          );
          const readable = new Readable();
          readable.push(file.buffer);
          readable.push(null);
          readable.pipe(upload);
    });
  }
}