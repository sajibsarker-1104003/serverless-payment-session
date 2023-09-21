const AWS =require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_LOCATION
});

const s3 = new AWS.S3();


// exports.handler = async (event) => {
//     try {
//         // Extract the relevant part of event.body (without boundary)
//         const formDataString = event.body.split('\r\n').slice(1, -1).join('\r\n');
        
//         // Parse the extracted form data
//         const formData = querystring.parse(formDataString);

// console.log(formData);

// const jsonResult = {
//   sessionId: formData.sessionId,
//   customerId: formData.customerId,
//   adminFirstname: formData.adminFirstname,
//   adminLastname: formData.adminLastname,
//   adminUsername: formData.adminUsername,
//   adminPassword: formData.adminPassword,
//   adminEmail: formData.adminEmail,
//   adminRecoveryEmail: formData.adminRecoveryEmail,
//   adminPhone: formData.adminPhone,
//   companyName: formData.companyName,
//   companySubdomain: formData.companySubdomain,
//   subscriptionType: formData.subscriptionType,
//   maxUsers: formData.maxUsers,
//   subscriptionStartDate: formData.subscriptionStartDate,
//   subscriptionEndDate: formData.subscriptionEndDate,
//   mailingAddress: formData.mailingAddress
// };

// console.log(formData);

//         // Return a success response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: 'Form data processed successfully'}),
//         };
//     } catch (error) {
//         // Handle errors and return an error response
//         console.error('Error:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'An error occurred while processing the form data' }),
//         };
//     }
// };

exports.handler = async (event) => {
  try {
    console.log(event.body);

  

      // Return the JSON object
      return {
          statusCode: 200,
          body: JSON.stringify(jsonObject),
          headers: {
              'Content-Type': 'application/json'
          }
      };
  } catch (error) {
      console.error('Error:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: 'An error occurred while processing the form data' }),
          headers: {
              'Content-Type': 'application/json'
          }
      };
  }
};

function parseMultipartFormData(formData) {
  // Split the input data by the boundary marker
  const boundary = formData.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundary) {
      throw new Error('Boundary not found in form data');
  }

  const boundaryString = `--${boundary[1]}`;
  const parts = formData.split(boundaryString);

  // Initialize an object to store the parsed data
  const parsedData = {};

  // Process each part of the form data
  for (const part of parts) {
      if (!part.includes('Content-Disposition')) continue;

      // Extract the field name and value
      const matches = part.match(/name="([^"]+)"/);
      if (matches) {
          const fieldName = matches[1];
          const valueMatches = part.match(/\r\n\r\n([\s\S]*)\r\n/);
          if (valueMatches) {
              const fieldValue = valueMatches[1];
              // Store the field in the parsedData object
              parsedData[fieldName] = fieldValue;
          }
      }
  }

  return parsedData;
}

