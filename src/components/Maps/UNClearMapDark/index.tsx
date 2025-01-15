import React from "react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import maplibregl from "maplibre-gl";
import { Layer, Source } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { LayerControls } from "./LayerControls";
import {
  DEFAULT_LAYER_CONTROLS,
  INITIAL_VIEW_STATE,
  TERRAIN_CONFIG,
  MAP_SOURCES,
} from "./constants";

export const UNClearMapDark = () => {
  const [layerControls, setLayerControls] = useState(DEFAULT_LAYER_CONTROLS);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  const toggleLayer = (id: string) => {
    setLayerControls(controls =>
      controls.map(control =>
        control.id === id ? { ...control, enabled: !control.enabled } : control
      )
    );
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
      initialViewState={INITIAL_VIEW_STATE}
      dragPan={true}
      scrollZoom={true}
      hash={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="stylejson/geoservices.un.org/clearmap_dark/style.json"
      terrain={
        layerControls.find(c => c.id === "terrain")?.enabled
          ? TERRAIN_CONFIG
          : undefined
      }
    >
      {/* Armed Conflict Data */}
      {layerControls.find(c => c.id === "armed-conflict")?.enabled && (
        <Source
          key={MAP_SOURCES.armedConflict.id}
          id={MAP_SOURCES.armedConflict.id}
          type={MAP_SOURCES.armedConflict.type}
          url={MAP_SOURCES.armedConflict.url}
          maxzoom={MAP_SOURCES.armedConflict.maxzoom}
          minzoom={MAP_SOURCES.armedConflict.minzoom}
        >
          {MAP_SOURCES.armedConflict.layers?.map(layer => (
            <Layer
              key={layer.id}
              id={layer.id}
              type={layer.type}
              paint={layer.paint}
              source={MAP_SOURCES.armedConflict.id}
              source-layer={layer.sourceLayer}
            />
          ))}
        </Source>
      )}

      {/* Population Data */}
      {layerControls.find(c => c.id === "population")?.enabled && (
        <Source
          key={MAP_SOURCES.population.id}
          id={MAP_SOURCES.population.id}
          type={MAP_SOURCES.population.type}
          url={MAP_SOURCES.population.url}
          maxzoom={MAP_SOURCES.population.maxzoom}
          minzoom={MAP_SOURCES.population.minzoom}
        >
          {MAP_SOURCES.population.layers?.map(layer => (
            <Layer
              key={layer.id}
              id={layer.id}
              type={layer.type}
              paint={layer.paint}
              source={MAP_SOURCES.population.id}
              source-layer={layer.sourceLayer}
            />
          ))}
        </Source>
      )}

      {/* Terrain Data */}
      {layerControls.find(c => c.id === "terrain")?.enabled && (
        <Source
          key={MAP_SOURCES.terrain.id}
          id={MAP_SOURCES.terrain.id}
          type={MAP_SOURCES.terrain.type}
          tiles={MAP_SOURCES.terrain.tiles}
          maxzoom={MAP_SOURCES.terrain.maxzoom}
          minzoom={MAP_SOURCES.terrain.minzoom}
          tileSize={MAP_SOURCES.terrain.tileSize}
        >
          {MAP_SOURCES.terrain.layers?.map(layer => (
            <Layer
              key={layer.id}
              id={layer.id}
              type={layer.type}
              paint={layer.paint}
              source={MAP_SOURCES.terrain.id}
            />
          ))}
        </Source>
      )}
    </Map>
    <LayerControls controls={layerControls} onToggle={toggleLayer} />
    </div>
  );
};
