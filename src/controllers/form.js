module.exports.handler = async (event, context) => {
  try {

    const { sessionId } = event.pathParameters;
    // Create an HTML form
    const htmlForm = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Tenant Registration</title>
    </head>
    <body>
        <h1>Tenant Registration Form</h1>
        <form id="registrationForm" enctype="application/x-www-form-urlencoded">
            <label for="sessionId">Session ID:</label>
            <input type="text" id="sessionId" name="sessionId" value=${sessionId}><br><br>

            <label for="customerId">Customer ID:</label>
            <input type="text" id="customerId" name="customerId"><br><br>
    
            <label for="adminFirstname">Admin First Name:</label>
            <input type="text" id="adminFirstname" name="adminFirstname" required><br><br>
    
            <label for="adminLastname">Admin Last Name:</label>
            <input type="text" id="adminLastname" name="adminLastname" required><br><br>
    
            <label for="adminUsername">Admin Username:</label>
            <input type="text" id="adminUsername" name="adminUsername" required><br><br>
    
            <label for="adminPassword">Admin Password:</label>
            <input type="password" id="adminPassword" name="adminPassword" required><br><br>
    
            <label for="adminEmail">Admin Email:</label>
            <input type="email" id="adminEmail" name="adminEmail" required><br><br>
    
            <label for="adminRecoveryEmail">Admin Recovery Email:</label>
            <input type="email" id="adminRecoveryEmail" name="adminRecoveryEmail"><br><br>
    
            <label for="adminPhone">Admin Phone:</label>
            <input type="tel" id="adminPhone" name="adminPhone"><br><br>
    
            <label for="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required><br><br>
    
            <label for="companySubdomain">Company Subdomain:</label>
            <input type="text" id="companySubdomain" name="companySubdomain" required><br><br>
    
            <label for="subscriptionType">Subscription Type:</label>
            <select id="subscriptionType" name="subscriptionType">
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
            </select><br><br>
    
            <label for="maxUsers">Max Users:</label>
            <input type="number" id="maxUsers" name="maxUsers" required><br><br>
    
            <label for="subscriptionStartDate">Subscription Start Date:</label>
            <input type="date" id="subscriptionStartDate" name="subscriptionStartDate" required><br><br>
    
            <label for="subscriptionEndDate">Subscription End Date:</label>
            <input type="date" id="subscriptionEndDate" name="subscriptionEndDate" required><br><br>
    
            <label for="mailingAddress">Mailing Address:</label>
            <textarea id="mailingAddress" name="mailingAddress" rows="4" cols="50"></textarea><br><br>
    
            <input type="submit" value="Submit">
        </form>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script>
        // JavaScript function to handle form submission
        document.getElementById("registrationForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent the default form submission

            // // Create an object to hold the form data
            // const formData = {
            //     sessionId: document.getElementById("sessionId").value,
            //     customerId: document.getElementById("customerId").value,
            //     adminFirstname: document.getElementById("adminFirstname").value,
            //     adminLastname: document.getElementById("adminLastname").value,

            //     adminUsername: document.getElementById("adminUsername").value,
            //     adminPassword: document.getElementById("adminPassword").value,
            //     adminEmail: document.getElementById("adminEmail").value,
            //     adminRecoveryEmail: document.getElementById("adminRecoveryEmail").value,
            //     adminPhone: document.getElementById("adminPhone").value,
            //     companyName: document.getElementById("companyName").value,
            //     companySubdomain: document.getElementById("companySubdomain").value,
            //     subscriptionType: document.getElementById("subscriptionType").value,
            //     maxUsers: document.getElementById("maxUsers").value,
            //     subscriptionStartDate: document.getElementById("subscriptionStartDate").value,
            //     subscriptionEndDate: document.getElementById("subscriptionEndDate").value,
            //     mailingAddress: document.getElementById("mailingAddress").value,                
              
            // };

            const formData = new FormData(event.target);

            const apiUrl = "http://localhost:3000/dev/items"; 
    
            try {
                const response = await axios.post(apiUrl,JSON.stringify(formData),headers:{
                  Content-Type:'application/x-www-form-urlencoded'
                });
    
                if (response.status === 200) {
                    // Handle a successful response (e.g., show a success message)
                    console.log("Form submitted successfully");
                    window.location.href = "https://www.google.com";
                } else {
                    // Handle errors (e.g., show an error message)
                    console.error("Error submitting form:", response.status, response.statusText);
                    window.location.href = "https://www.facebook.com";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    </script>
    </body>
    </html>       
      `;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: htmlForm,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        message: "An error occurred",
      }),
    };
  }
};
