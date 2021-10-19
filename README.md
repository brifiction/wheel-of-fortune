# wheel-of-fortune

Spin the wheel! Win your fortune, wow! Have fun with this knock-off 'Wheel of Fortune'.

![App Demo](2021-10-19_21-18-54.gif "App Demo")

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API

About `port`, see `proxy` url for Dockerized deployments.

`GET` http://localhost:4000/api/items/get

Example JSON response body, from written / updated JSON file:

```json
{
  "items": [
    {
      "text": "Rabbit",
      "color": "hsl(197 30% 43%)"
    },
    {
      "text": "Deer",
      "color": "hsl(173 58% 39%)"
    },
    {
      "text": "Bear",
      "color": "hsl(43 74% 66%)"
    },
    {
      "text": "Duck",
      "color": "hsl(27 87% 67%)"
    },
    {
      "text": "Llama",
      "color": "hsl(12 76% 61%)"
    },
    {
      "text": "Horse",
      "color": "hsl(350 60% 52%)"
    },
    {
      "text": "Goose",
      "color": "hsl(91 43% 54%)"
    },
    {
      "text": "Tiger",
      "color": "hsl(120 36% 74%)"
    }
  ]
}
```

`POST` http://localhost:4000/api/items/create

Example JSON request body:

```json
{
  "items": [
    {
      "text": "Rabbit",
      "color": "hsl(197 30% 43%)"
    },
    {
      "text": "Deer",
      "color": "hsl(173 58% 39%)"
    },
    {
      "text": "Bear",
      "color": "hsl(43 74% 66%)"
    },
    {
      "text": "Duck",
      "color": "hsl(27 87% 67%)"
    },
    {
      "text": "Llama",
      "color": "hsl(12 76% 61%)"
    },
    {
      "text": "Horse",
      "color": "hsl(350 60% 52%)"
    },
    {
      "text": "Goose",
      "color": "hsl(91 43% 54%)"
    },
    {
      "text": "Tiger",
      "color": "hsl(120 36% 74%)"
    }
  ]
}
```
