const turf = require('@turf/turf');
const SphericalMercator = require("@mapbox/sphericalmercator");
const merc = new SphericalMercator({
    size: 256
});

function forward(c) {
    return merc.forward(c);
}

function contains(lnglats, polygon) {
    const lnglatArray = lnglats.split(',');
    const [minx, miny, maxx, maxy] = lnglatArray;
    const bound = turf.bboxPolygon([parseFloat(minx), parseFloat(miny), parseFloat(maxx), parseFloat(maxy)]);
    return turf.booleanContains(polygon, bound);
}

function disjoint(lnglats, polygon) {
    const lnglatArray = lnglats.split(',');
    const [minx, miny, maxx, maxy] = lnglatArray;
    const bound = turf.bboxPolygon([parseFloat(minx), parseFloat(miny), parseFloat(maxx), parseFloat(maxy)]);
    return turf.booleanDisjoint(polygon, bound);
}

function cross(lnglats, polygon) {
    const lnglatArray = lnglats.split(',');
    const [minx, miny, maxx, maxy] = lnglatArray;
    const bound = turf.bboxPolygon([parseFloat(minx), parseFloat(miny), parseFloat(maxx), parseFloat(maxy)]);
    const coordinates = bound.geometry.coordinates[0];
    const points = coordinates.map(c => {
        return turf.point(c);
    });
    for (let point of points) {
        if (turf.booleanContains(polygon, point)) {
            return true;
        }
    }
    return false;
}
// const lnglats = [120.72438427062991, 31.300479082673263, 120.75133510681155, 31.34065996282854].join(',').toString();

// console.log(contains(lnglats));
// console.log(cross(lnglats));
// console.log(disjoint(lnglats));

module.exports = {
    contains, disjoint, cross, forward
};