function getProfile(username) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)

    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
              if (response.statusCode === 200) {
                            let body = "";
                            // Read the data
                            response.on('data', data => {
                              body += data.toString();
                            });

                            response.on('end', () => {
                              try {
                              // Parse the data
                              const profile = JSON.parse(body);
                              // Print the data
                              printMessage(username, profile.badges.length, profile.points.JavaScript);
                           } catch (error){
                             printError(error);
                           }
                          })
        };
                        });
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  }
} catch (error) {
    printError(error);
  }
}
