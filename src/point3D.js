import { CAMERA } from "./camera.js";

export const PointTypes = Object.freeze({
    PlotXYZ: 0,
    LatLonZ: 1,
});

// array structure:
    // [[x1, y1], [x2, y2], ...]
export var array_to_points = (array, type) => {
    let list = [];
    
    array.forEach(point => {
        list.push(new Point3D(point[0], point[1], type));
    });

    return list;
}

const resolution = 100;
export var create_line_between_points = (point1, point2) => {
    if (point1.type != point2.type) throw Error("Unable to interpolate between points of different types.");

    let list = [];

    let inc = 1 / resolution;
    for (let t = 0; t < 1; t += inc) {
        let x = point1.val1 + t * (point2.val1 - point1.val1);
        let y = point1.val2 + t * (point2.val2 - point1.val2);
        list.push(new Point3D(x, y, point1.type));
    }

    return list;
}

export class Point3D {
    constructor(val1, val2, val3, type) {
        this.val1 = val1;
        this.val2 = val2;
        this.val3 = val3;

        this.type = type;
    }

    as_xy() {
        if (this.type != PointTypes.PlotXYZ) {
            let x_raw = CAMERA.zoom * (this.val1 - CAMERA.center_lat);
            let y_raw = CAMERA.zoom * (this.val2 - CAMERA.center_lon);

            this.type = PointTypes.PlotXYZ;
            this.val1 = x_raw + CAMERA.width / 2;
            this.val2 = y_raw + CAMERA.height / 2;
            this.val3 = this.val3;
        }

        return {
            x: this.val1,
            y: this.val2,
            z: this.val3,
        };
    }

    as_lonlat() {
        if (this.type != PointTypes.LatLonZ) {
            // TODO: Implement XY -> LonLat
            this.type = PointTypes.LatLonZ;
            
        }

        return {
            lat: this.val1,
            lon: this.val2,
            z: this.val3,
        };
    }

    dist(other_point) {
        let dx = other_point.val1 - this.val1;
        let dy = other_point.val2 - this.val2;

        return Math.sqrt(dx * dx + dy * dy);
    }
}