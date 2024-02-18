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
            // Save the details to the file into the root of the project
            cy.writeFile('redirections.json', JSON.stringify(details, null, 2));
        });
        //verify that after all the redirection mac-torrent-download.net is loaded on the last
        cy.url().should('eq', 'http://mac-torrent-download.net/');
    })
})