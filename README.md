# dynamo-components

A set of custom elements wrapped in preact.js that can be uses in Wix's Editor

### Install & Setup

1. clone the repository:
```
git clone https://github.com/igorsheg-wix/dynamo-components.git
```
2. install & run: 
```
npm i
npm start
```

### Components anatomy 

Each component is a standart preact.js component (a 3kb alternative to React) - [learn more about preact.js](https://github.com/preactjs/preact)

At the end of each component, we register it a custom component using a small helper called **preact-custom-element**, which allows us to access the custom element's attributes as React's props. Learn more how to use it [here](https://github.com/preactjs/preact-custom-element)
