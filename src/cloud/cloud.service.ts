import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudService {
  AWS_S3_BUCKET: string | null = null;
  s3: null | S3 = null;

  constructor(private configService: ConfigService) {
    this.AWS_S3_BUCKET = configService.get<string>('AWS_S3_BUCKET');
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}
