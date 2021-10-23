const { PI } = Math;
const HALF_PI = PI/2;
const TAU = PI*2;

export const northAzimuthal = {
    ratio: 1,
    latLongToXy: (lat, long) => {
        const rad = lat/PI + 0.5;
        const x = Math.sin(long)*rad;
        const y = - Math.cos(long)*rad;
        return [ x, y ];
    },
    xyToLatLong: (x, y) => {
        const rad = Math.sqrt(x*x + y*y);
        const lat = (0.5 - rad)*PI;
        if (rad === 0) return [ lat, 0 ];
        const acos = Math.acos(-y/rad);
        const long = x >= 0 ? acos : - acos;
        return [ lat, long ];
    },
};
