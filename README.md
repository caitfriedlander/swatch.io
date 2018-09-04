# Swatch.io

![S1](https://i.imgur.com/XN0Nfdr.png)             |  ![S2](https://i.imgur.com/bWQfpJA.png)
:-------------------------:|:-------------------------:

Whether for personal or business purposes, anyone who sews frequently accumulates an excess of fabric. The traditional method of tracking storage is to use a physical swatch book, but those are not portable and not searchable.

**Swatch.io** allows a user to create a searchable digital library of fabric swatches (including a photo, details about the type and color, and quantity). Additionally a user can create projects which are ways of further organizing your fabric. **Swatch.io** is designed primarily to be used on mobile devices for maximum portability.

## Getting Started
### [Try it out on Heroku!](https://swatch-io.herokuapp.com/)
Demo account email: demo@email.com
Demo account password: demo

![S3](https://i.imgur.com/5Te86RH.png)             |  ![S4](https://i.imgur.com/80G8AN0.png)
:-------------------------:|:-------------------------:

## Technology
It was built with HTML, CSS, and Javascript, MongoDB, Express, Node.js, and React.js in about a week. Image storage was handled with AWS. The CSS was written entirely from scratch.

![S5](https://i.imgur.com/8QvjJOG.png)             |  ![S6](https://i.imgur.com/xggisw0.png)
:-------------------------:|:-------------------------:

## Resources

The Ribbon CSS came from [here](https://codepen.io/ultraloveninja/pen/vdJMoW?page=2).

The AWS uploader React-S3 came from [here](https://www.npmjs.com/package/react-s3).

The npm package for accessing the device camera, React-HTML5-Camera-Photo, came from [here](https://www.npmjs.com/package/react-html5-camera-photo).

## Bugs

The main bug that I am not yet able to resolve is that while the getUserMedia() method allows a user to acces the divice camera on desktop and Android through the browser, on iOS devices the browser does not have permission to access the camera.

## Icebox

I plan to impliment search by quantity and improve the styling on the desktop version.