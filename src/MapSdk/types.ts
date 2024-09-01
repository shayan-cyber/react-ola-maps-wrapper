import React from "react";

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