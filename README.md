# Photo Gallery Project

A beautiful, responsive photo gallery web application with lightbox functionality and customizable visual elements. This project creates an elegant way to showcase photo memories with interactive and visual effects.

## Features

- **Responsive Photo Gallery**: Displays images in a grid layout that adapts to different screen sizes
- **Interactive Lightbox**: Click on any image to view it in a fullscreen lightbox
- **Customizable Colors**: Easily change the color scheme through configuration
- **Animated Effects**: Includes floating hearts animation for visual appeal
- **Password Protection**: Option to protect gallery access with a password
- **Dynamic Content Loading**: Images and configuration load dynamically
- **Lazy Loading**: Images load as they enter the viewport for better performance
- **Blur Effects**: Modern glass-morphism design with backdrop filters

## File Structure

```
project/
├── index.html                # Landing page with login option
├── destination.html          # Gallery page
├── styles.css                # Main stylesheet
├── destination-script.js     # Gallery page JavaScript
├── index-script.js           # Landing page JavaScript
├── configuration.json        # Site configuration settings
└── images/                   # Directory for images
    ├── background.jpg        # Background image
    ├── image1.jpg            # Gallery images
    ├── image2.jpg
    └── ...
```

## Setup Instructions

1. Clone or download this repository
2. Place your images in the `images/` directory
   - Gallery images should be named sequentially (image1.jpg, image2.jpg, etc.)
   - Add a background image named `background.jpg`
3. Customize `configuration.json` to match your preferences
4. Open `index.html` in your web browser

## Configuration Options

Edit `configuration.json` to customize your gallery:

```json
{
    "mainTitle": "Photo Gallery",
    "mainMessage": "Welcome to our photo gallery",
    "desTitle": "Our Photo Gallery",
    "desMessage": "Enjoy our beautiful memories together",
    "colors": {
        "primary": "#00337c",
        "primaryLight": "#4aaab6",
        "textDark": "#333",
        "textLight": "white",
        "bgLight": "#4aaab6"
    },
    "imagesPath": "images/",
    "imageExtension": ".jpg",
    "defaultImageCount": 7  ,
    "heartColor": "#00337c",
    "passwordHint": "Enter the password to view the gallery",
    "correctPassword": "2508",
    "backgroundImage": "images/background.jpg"
}
```

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `mainTitle` | Gallery title displayed at the top of the main page |
| `mainMessage` | Subtitle message at the main page |
| `desTitle` | Gallery title displayed at the top of the destination page |
| `desMessage` | Subtitle message at the destination page |
| `colors` | Color scheme for visual elements |
| `imagesPath` | Directory path where images are stored |
| `imageExtension` | File extension for images (.jpg, .png, etc.) |
| `defaultImageCount` | Number of images to display in gallery |
| `heartColor` | Color for animated floating hearts |
| `backgroundImage` | Path to background image |

## Lightbox Features

The image lightbox includes:
- Click to open full-size view of images
- Smooth open/close transitions
- Click outside image or X button to close
- ESC key to close
- Image caption display
- Responsive design for all screen sizes

## Browser Compatibility

This project works on modern browsers that support:
- CSS Grid
- Flexbox
- CSS Variables
- Backdrop Filter
- ES6 JavaScript

## Customization

### Changing the Background

You can change the background image in two ways:
1. Replace the existing `background.jpg` file in the images folder
2. Edit the `backgroundImage` property in `configuration.json`

### Adding More Images

1. Add your image files to the `images/` folder
2. Name them sequentially (image8.jpg, image9.jpg, etc.)
3. Update the `defaultImageCount` in `configuration.json`

### Modifying Colors

Edit the color properties in `configuration.json` to change the color scheme:
- `primary`: Main accent color
- `primaryLight`: Lighter version of accent color
- `textDark`: Color for dark text
- `textLight`: Color for light text (on dark backgrounds)
- `bgLight`: Light background color

## License

This project is open-source and available for personal or commercial use.

## Acknowledgements

- Icons from built-in SVG resources
- Fonts from Google Fonts (Poppins and Dancing Script)