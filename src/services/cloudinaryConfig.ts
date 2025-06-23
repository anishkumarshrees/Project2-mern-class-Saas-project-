import {v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

 cloudinary.config({ 
        cloud_name: 'dvuibe8md', 
        api_key: '531745136452718', 
        api_secret: '0OyGKxWA7q_UkcPxtfQS2Z5UVD4' // Click 'View API Keys' above to copy your API secret
    })


    new CloudinaryStorage({
        cloudinary,
        params:async(req,file)=>{
            folder:'fullstack'
        }

    })


