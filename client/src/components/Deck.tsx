import { useEffect, useState, useCallback } from 'react'
import { MapViewState, FlyToInterpolator } from '@deck.gl/core'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers'
import { Tile3DLayer } from '@deck.gl/geo-layers'
import pin from './pin.png'
import { isMobile } from 'react-device-detect'
// import { LinearInterpolator } from "deck.gl/typed";
// import StaticMap from "react-map-gl";
// import { CesiumIonLoader } from "@loaders.gl/3d-tiles";
// import {I3SLoader} from '@loaders.gl/i3s';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Tile3D } from '@loaders.gl/tiles'
// import { MapView } from 'deck.gl'


// const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY // eslint-disable-line
const TILESET_URL = 'https://tile.googleapis.com/v1/3dtiles/root.json'

//https://deck.gl/docs/developer-guide/view-state-transitions
//https://github.com/CartoDB/tiles3d-demo/blob/master/components/Map/Map.jsx

//use viewstate & viewstate change instead of initalviewstate

function Deck() {
  const coords = useSelector((state: RootState) => state.location.coords)
  const [lng, setLng] = useState<number>(0)
  const [lat, setLat] = useState<number>(0)
  const [credits, setCredits] = useState<string>('')
  // const [viewState, setViewState] = useState({
  //   latitude: 45.439087,
  //   longitude: 12.323647,
  //   zoom: 16.8,
  //   bearing: 90,
  //   pitch: 60,
  // });

  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128 },
  }
  // const transitionInterpolator = new LinearInterpolator(["bearing"]);

  // const isMobile = true

  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    // latitude: 45.439087,
    // longitude: 12.323647,
    latitude: lat,
    longitude: lng,
    zoom: 16.8,
    bearing: 90,
    pitch: 60,
    // transitionDuration: 1000,
    // transitionInterpolator: new FlyToInterpolator(),
  })

  const rotateCamera = useCallback(() => {
    setInitialViewState((viewState: MapViewState) => ({
      ...viewState,
      bearing: (viewState.bearing ?? 0) + 1,
      transitionDuration: 1000,
      // transitionInterpolator,
      onTransitionEnd: rotateCamera,
    }))
  }, [])

  useEffect(() => {
    if (coords) {
      setLat(coords.lat)
      setLng(coords.lng)
      setInitialViewState((viewState: MapViewState) => ({
        ...viewState,
        latitude: coords.lat,
        longitude: coords.lng,
        zoom: 16,
        // bearing: 90,
        // pitch: 60,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        onTransitionEnd: rotateCamera,
      }))
    }
  }, [coords])

  useEffect(() => {
    rotateCamera()
  }, [lat, lng])

  const layers = [
    new Tile3DLayer({
      id: 'google-3d-tiles',
      data: TILESET_URL,
      // opacity: 0.5,
      // loader: I3SLoader,
      onTilesetLoad: (Tileset3D) => {
        Tileset3D.options.onTraversalComplete = (selectedTiles: Tile3D[]) => {
          const uniqueCredits = new Set()
          selectedTiles.forEach((tile: Tile3D) => {
            const { copyright } = tile.content.gltf.asset
            copyright.split(';').forEach(uniqueCredits.add, uniqueCredits)
          })
          setCredits([...uniqueCredits].join('; '))
          return selectedTiles
        }
      },
      loadOptions: {
        fetch: { headers: { 'X-GOOG-API-KEY': GOOGLE_MAPS_API_KEY } },
      },
      operation: 'terrain+draw',
    }),
    new IconLayer({
      id: 'icon-layer',
      data: [{ position: [lng, lat], icon: 'marker' }],
      iconAtlas: pin, // Path to your icon atlas
      iconMapping: ICON_MAPPING,
      // getPosition: (d: any) => [d.position[0], d.position[1], 60],
      // getIcon: (d: any) => d.icon,
      getSize: 30, // Size of the icons
      sizeScale: 1,
      // getPixelOffset: [0, -100],
      parameters: {
        depthTest: false,
      },
    }),
  ]


  return (
    <>
      {/* <div className={`${size ? 'h-[55.8vh]' : 'h-[30vh]'}`}> */}
      {/* <div className="relative h-[40vh]"> */}
      <div className="relative w-full h-[40vh] lg:h-[100vh]">
        <DeckGL
          // style={{ backgroundColor: "#061714" }}
          // @ts-ignore
          initialViewState={initialViewState}
          // viewState={viewState}
          // onViewStateChange={({ viewState }: any) =>
          //   setInitialViewState(viewState)
          // }
          layers={layers}
          controller={{ touchRotate: true }}
          // viewState={{ farZMultiplier: 1.4 }}
          // views={[
          //   new MapView({
          //     farZMultiplier: 1.4,
          //     // nearZMultiplier: .5,
          //     controller: { touchRotate: true },
          //   }),
          // ]}
          onLoad={rotateCamera}
          useDevicePixels={isMobile ? 1 : true}
          _pickable={!isMobile}
          _typedArrayManagerProps={
            isMobile ? { overAlloc: 1, poolSize: 0 } : undefined
          }
        >
          {/*<StaticMap*/}
          {/*    // mapStyle={*/}
          {/*    //   isMobile*/}
          {/*    //     ? "mapbox://styles/mapbox/streets-v12"*/}
          {/*    //     : "mapbox://styles/mapbox/standard"*/}
          {/*    // }*/}
          {/*    mapStyle={"mapbox://styles/mapbox/standard"}*/}
          {/*    mapboxAccessToken={MAPBOX_API_KEY}*/}
          {/*/>*/}
        </DeckGL>
        <div className="absolute left-[8px] bottom-[4px] text-white text-[8px]">
          {credits}
        </div>
      </div>

      {/*{isMobile && <div className="absolute text-white top-10">Mobile</div>}*/}
    </>
  )
}

export default Deck
