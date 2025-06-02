﻿
var UTMScaleFactor = 0.9996;
var pi = 3.14159265358979;
var sm_a = 6378137.0;
var sm_b = 6356752.314;
var sm_EccSquared = 6.69437999013e-03;
var UTMScaleFactor = 0.9996;

//******************************************************************************************************


function ConvertUtmXYZToLatLon(X, Y, Zone) {
    latlon = new Array(2);
    var x, y, zone, southhemi;
    x = X;
    y = Y;
    zone = Zone;
    southhemi = false;
    UTMXYToLatLon(x, y, zone, southhemi, latlon);
    var Lon = RadToDeg(latlon[1]);    
    var lat = RadToDeg(latlon[0]);
    
    var Data =
        {
            lat: lat.toFixed(5),
            Lon: Lon.toFixed(5),
           
        };
    return Data;

}
function UTMXYToLatLon(x, y, zone, southhemi, latlon) {
    var cmeridian;

    x -= 500000.0;
    x /= UTMScaleFactor;

    /* If in southern hemisphere, adjust y accordingly. */
    if (southhemi)
        y -= 10000000.0;

    y /= UTMScaleFactor;

    cmeridian = UTMCentralMeridian(zone);
    MapXYToLatLon(x, y, cmeridian, latlon);

    return;
}
function UTMCentralMeridian(zone) {
    var cmeridian;

    cmeridian = DegToRad(-183.0 + (zone * 6.0));

    return cmeridian;
}
function DegToRad(deg) {
    return (deg / 180.0 * pi)
}
function MapXYToLatLon(x, y, lambda0, philambda) {
    var phif, Nf, Nfpow, nuf2, ep2, tf, tf2, tf4, cf;
    var x1frac, x2frac, x3frac, x4frac, x5frac, x6frac, x7frac, x8frac;
    var x2poly, x3poly, x4poly, x5poly, x6poly, x7poly, x8poly;

    /* Get the value of phif, the footpoint latitude. */
    phif = FootpointLatitude(y);

    /* Precalculate ep2 */
    ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0))
          / Math.pow(sm_b, 2.0);

    /* Precalculate cos (phif) */
    cf = Math.cos(phif);

    /* Precalculate nuf2 */
    nuf2 = ep2 * Math.pow(cf, 2.0);

    /* Precalculate Nf and initialize Nfpow */
    Nf = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nuf2));
    Nfpow = Nf;

    /* Precalculate tf */
    tf = Math.tan(phif);
    tf2 = tf * tf;
    tf4 = tf2 * tf2;

    /* Precalculate fractional coefficients for x**n in the equations
       below to simplify the expressions for latitude and longitude. */
    x1frac = 1.0 / (Nfpow * cf);

    Nfpow *= Nf;   /* now equals Nf**2) */
    x2frac = tf / (2.0 * Nfpow);

    Nfpow *= Nf;   /* now equals Nf**3) */
    x3frac = 1.0 / (6.0 * Nfpow * cf);

    Nfpow *= Nf;   /* now equals Nf**4) */
    x4frac = tf / (24.0 * Nfpow);

    Nfpow *= Nf;   /* now equals Nf**5) */
    x5frac = 1.0 / (120.0 * Nfpow * cf);

    Nfpow *= Nf;   /* now equals Nf**6) */
    x6frac = tf / (720.0 * Nfpow);

    Nfpow *= Nf;   /* now equals Nf**7) */
    x7frac = 1.0 / (5040.0 * Nfpow * cf);

    Nfpow *= Nf;   /* now equals Nf**8) */
    x8frac = tf / (40320.0 * Nfpow);

    /* Precalculate polynomial coefficients for x**n.
       -- x**1 does not have a polynomial coefficient. */
    x2poly = -1.0 - nuf2;

    x3poly = -1.0 - 2 * tf2 - nuf2;

    x4poly = 5.0 + 3.0 * tf2 + 6.0 * nuf2 - 6.0 * tf2 * nuf2
        - 3.0 * (nuf2 * nuf2) - 9.0 * tf2 * (nuf2 * nuf2);

    x5poly = 5.0 + 28.0 * tf2 + 24.0 * tf4 + 6.0 * nuf2 + 8.0 * tf2 * nuf2;

    x6poly = -61.0 - 90.0 * tf2 - 45.0 * tf4 - 107.0 * nuf2
        + 162.0 * tf2 * nuf2;

    x7poly = -61.0 - 662.0 * tf2 - 1320.0 * tf4 - 720.0 * (tf4 * tf2);

    x8poly = 1385.0 + 3633.0 * tf2 + 4095.0 * tf4 + 1575 * (tf4 * tf2);

    /* Calculate latitude */
    philambda[0] = phif + x2frac * x2poly * (x * x)
        + x4frac * x4poly * Math.pow(x, 4.0)
        + x6frac * x6poly * Math.pow(x, 6.0)
        + x8frac * x8poly * Math.pow(x, 8.0);

    /* Calculate longitude */
    philambda[1] = lambda0 + x1frac * x
        + x3frac * x3poly * Math.pow(x, 3.0)
        + x5frac * x5poly * Math.pow(x, 5.0)
        + x7frac * x7poly * Math.pow(x, 7.0);

    return;
}
function FootpointLatitude(y) {
    var y_, alpha_, beta_, gamma_, delta_, epsilon_, n;
    var result;

    /* Precalculate n (Eq. 10.18) */
    n = (sm_a - sm_b) / (sm_a + sm_b);

    /* Precalculate alpha_ (Eq. 10.22) */
    /* (Same as alpha in Eq. 10.17) */
    alpha_ = ((sm_a + sm_b) / 2.0)
        * (1 + (Math.pow(n, 2.0) / 4) + (Math.pow(n, 4.0) / 64));

    /* Precalculate y_ (Eq. 10.23) */
    y_ = y / alpha_;

    /* Precalculate beta_ (Eq. 10.22) */
    beta_ = (3.0 * n / 2.0) + (-27.0 * Math.pow(n, 3.0) / 32.0)
        + (269.0 * Math.pow(n, 5.0) / 512.0);

    /* Precalculate gamma_ (Eq. 10.22) */
    gamma_ = (21.0 * Math.pow(n, 2.0) / 16.0)
        + (-55.0 * Math.pow(n, 4.0) / 32.0);

    /* Precalculate delta_ (Eq. 10.22) */
    delta_ = (151.0 * Math.pow(n, 3.0) / 96.0)
        + (-417.0 * Math.pow(n, 5.0) / 128.0);

    /* Precalculate epsilon_ (Eq. 10.22) */
    epsilon_ = (1097.0 * Math.pow(n, 4.0) / 512.0);

    /* Now calculate the sum of the series (Eq. 10.21) */
    result = y_ + (beta_ * Math.sin(2.0 * y_))
        + (gamma_ * Math.sin(4.0 * y_))
        + (delta_ * Math.sin(6.0 * y_))
        + (epsilon_ * Math.sin(8.0 * y_));

    return result;
}
function RadToDeg(rad) {
    return (rad / pi * 180.0)
}

//***********************************************************************************************


function ConvertLatLongToUtmXYZ(lon, lat) {
    var xy = new Array(2);

    zone = Math.floor((lon + 180.0) / 6) + 1;

    zone = LatLonToUTMXY(DegToRad(lat), DegToRad(lon), zone, xy);

    var Data =
        {
            X: parseInt(xy[0]),
            Y: parseInt(xy[1]),
            Zone: parseInt(zone)
        };
    return Data;

}
function LatLonToUTMXY(lat, lon, zone, xy) {
    MapLatLonToXY(lat, lon, UTMCentralMeridian(zone), xy);

    /* Adjust easting and northing for UTM system. */
    xy[0] = xy[0] * UTMScaleFactor + 500000.0;
    xy[1] = xy[1] * UTMScaleFactor;
    if (xy[1] < 0.0)
        xy[1] = xy[1] + 10000000.0;

    return zone;
}
function MapLatLonToXY(phi, lambda, lambda0, xy) {
    var N, nu2, ep2, t, t2, l;
    var l3coef, l4coef, l5coef, l6coef, l7coef, l8coef;
    var tmp;

    /* Precalculate ep2 */
    ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0)) / Math.pow(sm_b, 2.0);

    /* Precalculate nu2 */
    nu2 = ep2 * Math.pow(Math.cos(phi), 2.0);

    /* Precalculate N */
    N = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nu2));

    /* Precalculate t */
    t = Math.tan(phi);
    t2 = t * t;
    tmp = (t2 * t2 * t2) - Math.pow(t, 6.0);

    /* Precalculate l */
    l = lambda - lambda0;

    /* Precalculate coefficients for l**n in the equations below
       so a normal human being can read the expressions for easting
       and northing
       -- l**1 and l**2 have coefficients of 1.0 */
    l3coef = 1.0 - t2 + nu2;

    l4coef = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2);

    l5coef = 5.0 - 18.0 * t2 + (t2 * t2) + 14.0 * nu2
        - 58.0 * t2 * nu2;

    l6coef = 61.0 - 58.0 * t2 + (t2 * t2) + 270.0 * nu2
        - 330.0 * t2 * nu2;

    l7coef = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - (t2 * t2 * t2);

    l8coef = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - (t2 * t2 * t2);

    /* Calculate easting (x) */
    xy[0] = N * Math.cos(phi) * l
        + (N / 6.0 * Math.pow(Math.cos(phi), 3.0) * l3coef * Math.pow(l, 3.0))
        + (N / 120.0 * Math.pow(Math.cos(phi), 5.0) * l5coef * Math.pow(l, 5.0))
        + (N / 5040.0 * Math.pow(Math.cos(phi), 7.0) * l7coef * Math.pow(l, 7.0));

    /* Calculate northing (y) */
    xy[1] = ArcLengthOfMeridian(phi)
        + (t / 2.0 * N * Math.pow(Math.cos(phi), 2.0) * Math.pow(l, 2.0))
        + (t / 24.0 * N * Math.pow(Math.cos(phi), 4.0) * l4coef * Math.pow(l, 4.0))
        + (t / 720.0 * N * Math.pow(Math.cos(phi), 6.0) * l6coef * Math.pow(l, 6.0))
        + (t / 40320.0 * N * Math.pow(Math.cos(phi), 8.0) * l8coef * Math.pow(l, 8.0));

    return;
}
function ArcLengthOfMeridian(phi) {
    var alpha, beta, gamma, delta, epsilon, n;
    var result;

    /* Precalculate n */
    n = (sm_a - sm_b) / (sm_a + sm_b);

    /* Precalculate alpha */
    alpha = ((sm_a + sm_b) / 2.0)
       * (1.0 + (Math.pow(n, 2.0) / 4.0) + (Math.pow(n, 4.0) / 64.0));

    /* Precalculate beta */
    beta = (-3.0 * n / 2.0) + (9.0 * Math.pow(n, 3.0) / 16.0)
       + (-3.0 * Math.pow(n, 5.0) / 32.0);

    /* Precalculate gamma */
    gamma = (15.0 * Math.pow(n, 2.0) / 16.0)
        + (-15.0 * Math.pow(n, 4.0) / 32.0);

    /* Precalculate delta */
    delta = (-35.0 * Math.pow(n, 3.0) / 48.0)
        + (105.0 * Math.pow(n, 5.0) / 256.0);

    /* Precalculate epsilon */
    epsilon = (315.0 * Math.pow(n, 4.0) / 512.0);

    /* Now calculate the sum of the series and return */
    result = alpha
        * (phi + (beta * Math.sin(2.0 * phi))
            + (gamma * Math.sin(4.0 * phi))
            + (delta * Math.sin(6.0 * phi))
            + (epsilon * Math.sin(8.0 * phi)));

    return result;
}


//*************************************************************************************************
//پیدا کردن یه نقطه در پلی گان رو نقشه
function InsidePointInPolygon(point, vs) {//پیدا کردن یه نقطه در پلی گان رو نقشه

    //نحوه کار کردن با این تابع
    // var Lat = parseFloat($("#HB_Lat").val());
    // var Lon = parseFloat($("#HB_Lon").val());
    // var LstPointPolygon1 = [[35.77410, 51.43434], [35.77383, 51.43432], [35.77385, 51.43490], [35.77441, 51.43487], [35.77452, 51.43443]];
    //InsidePointInPolygon([Lat, Lon], LstPointPolygon1); // true


    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};



//**************************************************************************************************
//رفع تحریم ها 
function LiftingOfSanctions() {//رفع تحریم ها 
    try {
        //Code
        Object.defineProperty(HTMLScriptElement.prototype, "__src__", Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"));
        Object.defineProperty(HTMLScriptElement.prototype, "src", {
            configurable: true,
            enumerable: true,
            get() {
                return this.__src__;
            },
            set(new_src) {

                if (!new_src || !(String(new_src).startsWith("https://maps.googleapis.com/maps/api/js/AuthenticationService.Authenticate") ||
                    String(new_src).startsWith("https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent")))
                    this.__src__ = new_src;
            }
        });

    } catch (e) {

    }
}