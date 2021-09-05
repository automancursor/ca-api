using System;
using System.Threading.Tasks;

// To interact with Amazon S3.
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Runtime.CredentialManagement;
using Microsoft.Extensions.Configuration;
using Amazon;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace cva_api.Module
{
    public class AWSHelper
    {
        AmazonS3Client s3Client;
        private const string BUCKET_NAME = "cva-api";
        private static readonly RegionEndpoint BUCKET_REGION = RegionEndpoint.APSoutheast2;
        private readonly IConfiguration _configuration;
        public AWSHelper(IConfiguration configuration)
        {
            _configuration = configuration;
            // this.WriteProfile("default", _configuration["AWS:aws_access_key_id"], _configuration["AWS:aws_secret_access_key"]);
            this.s3Client = new AmazonS3Client(_configuration["AWS:aws_access_key_id"],_configuration["AWS:aws_secret_access_key"],BUCKET_REGION);
        }
        // public void WriteProfile(string profileName, string keyId, string secret)
        // {
        //     Console.WriteLine($"Create the [{profileName}] profile...");
        //     var options = new CredentialProfileOptions
        //     {
        //         AccessKey = keyId,
        //         SecretKey = secret
        //     };
        //     var profile = new CredentialProfile(profileName, options);
        //     var sharedFile = new SharedCredentialsFile();
        //     sharedFile.RegisterProfile(profile);

        // }
       
        public  async Task UploadObjectFromFileAsync(
            string objectName,
            IFormFile file)
        {
            try
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.CopyTo(newMemoryStream);
                    var putRequest = new PutObjectRequest
                    {
                        Key = objectName,
                        InputStream = newMemoryStream,
                        CannedACL = S3CannedACL.PublicRead,
                        BucketName= BUCKET_NAME
                    };

                    PutObjectResponse response = await s3Client.PutObjectAsync(putRequest);
                }
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine($"Error: {e.Message}");
                throw e;
            }
        }



    }
}
