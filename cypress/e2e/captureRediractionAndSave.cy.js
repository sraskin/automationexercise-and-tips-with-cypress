let details = []; // Array to store all the details

describe('Capture Redirections', () => {
    it('should capture all redirections', () => {
        cy.intercept('**', (req) => {
            req.continue((res) => {
                details.push({
                    url: req.url,
                    method: req.method,
                    status: res.statusCode,
                    requestHeaders: req.headers,
                    responseHeaders: res.headers,
                    requestBody: req.body,
                    responseBody: res.body
                });
            });
        });

        cy.visit('http://mac-torrent-download.net').then(() => {
            // Save the details to your file (modify as needed)
            cy.writeFile('redirections.json', JSON.stringify(details, null, 2));
        });
    })
})