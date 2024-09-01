



# React Ola Maps

A React wrapper for the Ola Maps SDK, providing an easy-to-use component for integrating Ola Maps into your React applications.

## Features

- Simple integration of Ola Maps in React applications
- Customizable map container
- Support for markers and other Ola Maps features
- TypeScript support


## Screenshots

![App Screenshot](https://i.imgur.com/U0uOKw1.png)




## Installation

To install the package, run:

```bash
npm install react-ola-maps-wrapper
```

or if you're using yarn:

```bash
yarn add react-ola-maps-wrapper
```

Note: This package has peer dependencies of `react` and `react-dom`, so make sure these are installed in your project.

## Usage

First, make sure you have an API key from Ola Maps. Then, you can use the `MapContainer` component in your React application:

```jsx
import React from 'react';
import { MapContainer } from 'react-ola-maps';

const App = () => {
  return (
    <div>
      <h1>My Map App</h1>
      <MapContainer 
        apiKey="YOUR_OLA_MAPS_API_KEY"
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default App;
```

## API Reference

### MapContainer

The main component provided by this package.

Props:

- `apiKey` (string, required): Your Ola Maps API key.
- `width` (string, required): The width of the map container. Default: '100%'.
- `height` (string, required): The height of the map container. Default: '400px'.
- `className` (string, optional): Additional CSS class for the map container.
- `markers` (Array, optional): An array of marker objects to display on the map. Each marker object should have `longitude` and `latitude` properties. Other Optional properties are also included, eg : `element`, `offset`, `anchor` , `draggable`, `popUp`.

- `mapEventListners`(Object, optional) : An Object containing event listeners `onLoad` , `onClick`, `onFail` etc.

- `showCompass`(Boolean, optional) : An boolean to show the compass button.

- `showZoom`(Boolean, optional) : An boolean to show the zoom button.





### Types
```typescript

export interface Position {
    latitude: number;
    longitude: number;
}

export interface MapContainerProps {
    apiKey: string;
    width: string;
    height: string;
    className?: string;
    markers?: Marker[];
    center : Position;
    zoom: number;
    mapEventListners?: MapEventListners;
    showCompass?: boolean;
    showZoom?: boolean;
}

export interface MapEventListners {
    onLoad?: (e: any) => void;
    onClick?: (e: any) => void;
    onFail?: (e: any) => void;
    onIdle?: (e: any) => void;
    onMove?: (e: any) => void;
    onMoveStart?: (e: any) => void;
    onMoveEnd?: (e: any) => void;
    onZoom?: (e: any) => void;
    onZoomStart?: (e: any) => void;
    onZoomEnd?: (e: any) => void;
    onPitch?: (e: any) => void;
    onPitchStart?: (e: any) => void;
    onPitchEnd?: (e: any) => void;

}
export interface Marker {
    latitude: number;
    longitude: number;
    element?: React.ReactNode;
    offset?: [number, number];
    anchor?: 'top' | 'bottom' | 'left' | 'right';
    draggable?: boolean;
    popUp?: React.ReactNode;


}

```

Example with markers:

```jsx
<MapContainer 
  apiKey="YOUR_API_KEY"
  markers={[
    { longitude: 77.61, latitude: 12.93 },
    { longitude: 77.62, latitude: 12.94 },
  ]}
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Ola Maps for providing the mapping SDK.
- This wrapper was inspired by the need for an easy-to-use React component for Ola Maps.

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
