# Simple UI

The Simple UI application is a very basic React application that utilizes the
[Simple API](../simple-api) application as its backend. The UI simply displays
a table of pets as returned from the API.

To run the UI locally, use the following command:

```shell
npm run start
```

To build the application to static assets, use the following command:

```shell
npm run build
```

The application will query the API every 5 seconds for updated pet information.
It will log information to the Javascript console as it receives responses
from the server. Additionally, traffic between the UI and the API may be
observed through the network tab of the browser's developer tools.

Note that the application assumes that the API will be available at the address
`http://localhost:8000`. The source may be updated if this needs to change (see
[src/App.js](src/App.js)).
