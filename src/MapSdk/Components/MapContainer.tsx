import '../style.css'
import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
// @ts-ignore
import { OlaMaps } from '../olamaps-js-sdk.es';
import { MapContainerProps, MapEventListners, Marker } from '../types';


const handleMapEvents = (mapInstance: any, mapEventListners: MapEventListners) => {
    mapInstance.on('load', mapEventListners?.onLoad || function () { });
    mapInstance.on('click', mapEventListners?.onClick || function () { });
    mapInstance.on('fail', mapEventListners?.onFail || function () { });
    mapInstance.on('idle', mapEventListners?.onIdle || function () { });
    mapInstance.on('move', mapEventListners?.onMove || function () { });
    mapInstance.on('movestart', mapEventListners?.onMoveStart || function () { });
    mapInstance.on('moveend', mapEventListners?.onMoveEnd || function () { });
    mapInstance.on('zoom', mapEventListners?.onZoom || function () { });
    mapInstance.on('zoomstart', mapEventListners?.onZoomStart || function () { });
    mapInstance.on('zoomend', mapEventListners?.onZoomEnd || function () { });
    mapInstance.on('pitch', mapEventListners?.onPitch || function () { });
    mapInstance.on('pitchstart', mapEventListners?.onPitchStart || function () { });
    mapInstance.on('pitchend', mapEventListners?.onPitchEnd || function () { });

}

const handleAddMarker = (olaMaps: any, markers: Marker[], mapInstance: any) => {

    markers?.forEach((marker) => {
        let icon = null;
        let popUp = null;

        if (marker.element) {
            icon = document.createElement('div');
            icon.innerHTML = ReactDOMServer.renderToString(marker?.element);
        }
        if (marker.popUp) {
            popUp = olaMaps.addPopup({ offset: [0, -30], anchor: 'bottom' }).setHTML(ReactDOMServer.renderToString(marker?.popUp));
        }

        olaMaps
            .addMarker({

                offset: marker.offset || [0, 6],
                anchor: marker.anchor || 'bottom',
                draggable: marker.draggable || false,
                element: icon ? icon : null,
            })
            .setLngLat([marker.latitude, marker.longitude])
            .setPopup(popUp)
            .addTo(mapInstance)

    })

}

const MapContainer = ({ apiKey, width, height, className, markers, center, zoom, mapEventListners, showCompass, showZoom }: MapContainerProps) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef<HTMLElement | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    useEffect(() => {
        let isMounted = true;

        const initializeMap = async () => {
            if (mapContainerRef.current && !mapInstanceRef.current) {
                const olaMaps = new OlaMaps({
                    apiKey: apiKey,
                });
                try {
                    const myMap = await olaMaps.init({
                        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                        container: mapContainerRef.current,
                        center: [center.latitude, center.longitude],
                        zoom: zoom,
                    });

                    if (isMounted) {

                        mapInstanceRef.current = myMap;
                        setIsMapLoaded(true);

                        if (mapEventListners)
                            handleMapEvents(myMap, mapEventListners);
                        if (markers && markers.length > 0)
                            handleAddMarker(olaMaps, markers, myMap);
                        
                        if (showCompass || showZoom) {
                            const navigationControls = olaMaps.addNavigationControls({
                                showCompass: showCompass || false,
                                showZoom: showZoom || false,
                            })
                            myMap.addControl(navigationControls)
                        }

                    } else {

                        myMap.remove();
                    }
                } catch (error) {

                    console.error('Error initializing map:', error);

                }
            }
        };

        initializeMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                try {
                    if (mapInstanceRef.current !== null)
                        mapInstanceRef.current?.remove();
                } catch (error) {

                    console.error('Error removing map:', error);

                }
            }
        };
    }, [apiKey]);


    return (
        <div ref={mapContainerRef} style={{
            width: width || '100%',
            height: height || '400px',
            position: 'relative',
        }} className={className}>
            {!isMapLoaded && <div>Loading map...</div>}

        </div>
    );

}

export default MapContainer;