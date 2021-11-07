import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname,'..','..','uploads');

export default{
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            // Criando um hash para impedir dois arquivos com o mesmo nome do servidor.
            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash} - ${file.originalname}`;

            callback(null, filename);
        },
    }),
};