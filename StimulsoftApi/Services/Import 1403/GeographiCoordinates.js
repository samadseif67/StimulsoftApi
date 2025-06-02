
var sm_a = 6378137.0;
var sm_b = 6356752.314;
var UTMScaleFactor = 0.9996;


//convert LatLongToDms

function LatlongToDms(deg, lng) {


    var d = parseInt(deg);
    var minfloat = Math.abs((deg - d) * 60);
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = Math.round(secfloat);
    d = Math.abs(d);

    if (s == 60) {
        m++;
        s = 0;
    }
    if (m == 60) {
        d++;
        m = 0;
    }

    var TT = {
        //dir: deg < 0 ? lng ? 'W' : 'S' : lng ? 'E' : 'N',
        deg: d,
        min: m,
        sec: s
    };

    return TT;

}


//convert DmsToLatLong
function ConvertDMSToLatLong(DD, MM, SS) {

    MM = parseFloat(parseFloat(MM) / parseFloat(60));
    SS = parseFloat(parseFloat(SS) / parseFloat(3600))
    var latLong = ((parseFloat(DD) + (MM) + (SS))).toFixed(5);

    return latLong;

}




//convert UtmToLatLong
function btnUTM_ToLatLong(TX, TY, TZoon) {

    latlong = new Array(2);
    var x, y, zone, southhemi;

    x = parseFloat(TX);

    y = parseFloat(TY);

    zone = parseFloat(TZoon);

    UTMXYToLatLong(x, y, zone, southhemi, latlong);

    var Result =
    {
        long: RadToDeg(latlong[1]),
        lat: RadToDeg(latlong[0]),
        zone: zone
    };



    return Result;


}
function UTMXYToLatLong(x, y, zone, southhemi, latlong) {
    var cmeridian;

    x -= 500000.0;
    x /= UTMScaleFactor;

    /* If in southern hemisphere, adjust y accordingly. */
    if (southhemi)
        y -= 10000000.0;

    y /= UTMScaleFactor;

    cmeridian = UTMCentralMeridian(zone);
    MapXYToLatLong(x, y, cmeridian, latlong);

    return;
}
function RadToDeg(rad) {
    var pi = 3.14159265358979;

    return (rad / pi * 180.0)
}
function MapXYToLatLong(x, y, lambda0, philambda) {
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



function btnUTM_OnClick(lat, lang) {
    var xy = new Array(2);



    lang = parseFloat(lang);


    lat = parseFloat(lat);


    // Compute the UTM zone.
    zone = Math.floor((lang + 180.0) / 6) + 1;

    zone = LatLongToUTMXY(DegToRad(lat), DegToRad(lang), zone, xy);


    var Result = {
        x: xy[0],
        y: xy[1],
        zone: zone,
        SN: lat < 0 ? "S" : "N"

    };

    return Result;


}
function LatLongToUTMXY(lat, long, zone, xy) {
    MapLatLongToXY(lat, long, UTMCentralMeridian(zone), xy);

    /* Adjust easting and northing for UTM system. */
    xy[0] = xy[0] * UTMScaleFactor + 500000.0;
    xy[1] = xy[1] * UTMScaleFactor;
    if (xy[1] < 0.0)
        xy[1] = xy[1] + 10000000.0;

    return zone;
}
function DegToRad(deg) {
    var pi = 3.14159265358979;
    return (deg / 180.0 * pi)
}
function MapLatLongToXY(phi, lambda, lambda0, xy) {
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
function UTMCentralMeridian(zone) {
    var cmeridian;

    cmeridian = DegToRad(-183.0 + (zone * 6.0));

    return cmeridian;
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



function LatLonPointUTMtoLL($f1, $f, $j) { // $f1 = Easting  x // $f = Northing y // $j: UTM ZONE (Danmark = 32) 

    $d = 0.99960000000000004;
    $d1 = 6378137;
    $d2 = 0.0066943799999999998;

    $d4 = (1 - Math.sqrt(1 - $d2)) / (1 + Math.sqrt(1 - $d2));
    $d15 = $f1 - 500000;
    $d16 = $f;
    $d11 = (($j - 1) * 6 - 180) + 3;
    $d3 = $d2 / (1 - $d2);
    $d10 = $d16 / $d;
    $d12 = $d10 / ($d1 * (1 - $d2 / 4 - (3 * $d2 * $d2) / 64 - (5 * Math.pow($d2, 3)) / 256));
    $d14 = $d12 + ((3 * $d4) / 2 - (27 * Math.pow($d4, 3)) / 32) * Math.sin(2 * $d12) + ((21 * $d4 * $d4) / 16 - (55 * Math.pow($d4, 4)) / 32) * Math.sin(4 * $d12) + ((151 * Math.pow($d4, 3)) / 96) * Math.sin(6 * $d12);
    $d13 = $d14 * (180 / Math.PI);
    $d5 = $d1 / Math.sqrt(1 - $d2 * Math.sin($d14) * Math.sin($d14));
    $d6 = Math.tan($d14) * Math.tan($d14);
    $d7 = $d3 * Math.cos($d14) * Math.cos($d14);
    $d8 = ($d1 * (1 - $d2)) / Math.pow(1 - $d2 * Math.sin($d14) * Math.sin($d14), 1.5);
    $d9 = $d15 / ($d5 * $d);
    $d17 = $d14 - (($d5 * Math.tan($d14)) / $d8) * ((($d9 * $d9) / 2 - (((5 + 3 * $d6 + 10 * $d7) - 4 * $d7 * $d7 - 9 * $d3) * Math.pow($d9, 4)) / 24) + (((61 + 90 * $d6 + 298 * $d7 + 45 * $d6 * $d6) - 252 * $d3 - 3 * $d7 * $d7) * Math.pow($d9, 6)) / 720);
    $d17 = $d17 * (180 / Math.PI);
    $d18 = (($d9 - ((1 + 2 * $d6 + $d7) * Math.pow($d9, 3)) / 6) + (((((5 - 2 * $d7) + 28 * $d6) - 3 * $d7 * $d7) + 8 * $d3 + 24 * $d6 * $d6) * Math.pow($d9, 5)) / 120) / Math.cos($d14);
    $d18 = $d11 + $d18 * (180 / Math.PI);

    return $d17 + ":" + $d18;

}


Object.defineProperty(HTMLScriptElement.prototype, "__src__", Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"));
Object.defineProperty(HTMLScriptElement.prototype, "src", {
    configurable: true,
    enumerable: true,
    get() {
        return this.__src__;
    },
    set(new_src) {
        if (!new_src || !(new_src.startsWith("https://maps.googleapis.com/maps/api/js/AuthenticationService.Authenticate") ||
            new_src.startsWith("https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent")))
            this.__src__ = new_src;
    }
});