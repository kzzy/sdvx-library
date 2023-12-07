import AWS from 'aws-sdk'
import { SES, type AWSError } from 'aws-sdk';
import type { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses.js'

AWS.config.update({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
});

const ses = new SES();

const params = (subject:String, msg:String) => { 
    return {
        Source: import.meta.env.VITE_AWS_SES_SOURCE,
        Destination: {
            ToAddresses: [
                import.meta.env.VITE_AWS_SES_TO_ADDRESS
            ]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: "UTF-8"
            },
            Body: {
                Text: {
                    Data: msg,
                    Charset: "UTF-8"
                },
                Html: {
                    Data: msg,
                    Charset: "UTF-8"
                }
            }
        }
    } as SendEmailRequest
}
export const sendEmail = (subject:String, msg:String) => {
    if(import.meta.env.VITE_ENABLE_AWS_SES == 'false') return

    const generatedParams = params(subject, msg)
    ses.sendEmail(generatedParams, (err: AWSError, data: SendEmailResponse) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
}