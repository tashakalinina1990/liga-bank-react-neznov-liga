import React, { useEffect } from 'react';
import L, { PointTuple } from 'leaflet';
import cl from 'clsx';
import LocationSvg from '../../img/icon-location-marker.svg';
import MapImg from '../../img/map.png';
import { MapSettings, ACCESS_TOKEN } from '../../const';
import s from './SimpleMap.module.scss';

const SimpleMap = () => {
  const mapCoordX = MapSettings.center.lat;
  const mapCoordY = MapSettings.center.lng;
  const icon = L.icon({
    iconUrl: LocationSvg,
    iconSize: MapSettings.markerSize as PointTuple,
  });
  const { zoom } = MapSettings;

  useEffect(() => {
    const map = L.map('mapid').setView([mapCoordX, mapCoordY], zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 12,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: ACCESS_TOKEN,
    }).addTo(map);
    // eslint-disable-next-line array-callback-return
    MapSettings.markers.map((item) => {
      const marker = L.marker([item.lat, item.lng], { icon });
      marker.addTo(map);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div id="mapid" className={cl(s.map)} style={{ backgroundImage: `url(${MapImg})` }} />
  );
};

export default SimpleMap;
