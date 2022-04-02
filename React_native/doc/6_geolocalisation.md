# 2 exemples de geolocalisation

## Exemple 1

```Javascript
import Geolocation from "@react-native-community/geolocation";

const getGeoLocaation = () => {

  const config = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 3600000,
  };

  Geolocation.getCurrentPosition(
    (info) => {

        console.log("INFO", info)

        const { coords } = info

        latitude = coords.latitude
        longitude = coords.longitude
    },
    error => console.log("ERROR", error),
    config,
  );
};
```

## Exemple 2

```Javascript
import Geolocation from "@react-native-community/geolocation";

Geolocation.setRNConfiguration({auto: "auto"});//pas obligatoire, Le code ci-dessus fonctionne sans cette ligne pour android

const getGeoLocaation = () => {

  Geolocation.getCurrentPosition(
    (info) => {

        console.log("INFO", info)

        const { coords } = info

        latitude = coords.latitude
        longitude = coords.longitude
    },
    (error) => console.log("ERROR", error),
    Platform.OS === 'android' ? {} : { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 },
  );
};
```