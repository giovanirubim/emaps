const { PI } = Math;
const HALF_PI = PI/2;
const TO_RAD = 180/PI;

export const latLongToXyz = (lat, long) => {
    const y = Math.sin(lat);
    const rad = Math.cos(lat);
    const x = Math.sin(long)*rad;
    const z = Math.cos(long)*rad;
    return [ x, y, z ];
};

export const xyzToLatLong = (x, y, z) => {
    const rad = Math.sqrt(x*x + z*z);
    if (rad === 0) return [ y > 0 ? HALF_PI : -HALF_PI , 0 ];
    const cos = z/rad;
    const acos = Math.acos(cos);
    const long = x >= 0 ? acos : -acos;
    const lat = Math.asin(y);
    return [ lat, long ];
};

export const calcXyzDist = (ax, ay, az, bx, by, bz) => {
    const dx = bx - ax;
    const dy = by - ay;
    const dz = bz - az;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
};

export const xyzDistToArc = (xyzDist) => {
    const halfAngle = Math.asin(xyzDist/2);
    return halfAngle*2;
};

export const latLongDist = (aLat, aLong, bLat, bLong) => {
    const [ ax, ay, az ] = latLongToXyz(aLat, aLong);
    const [ bx, by, bz ] = latLongToXyz(bLat, bLong);
    const xyzDist = calcXyzDist(ax, ay, az, bx, by, bz);
    return xyzDistToArc(xyzDist);
};
