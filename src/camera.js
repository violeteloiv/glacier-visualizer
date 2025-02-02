export class Camera {
    constructor(center_lat, center_lon, zoom, width, height) {
        this.center_lat = center_lat;
        this.center_lon = center_lon;
        this.zoom = zoom;

        this.width = width;
        this.height = height;
    }

    update_center_lat(center_lat) {
        this.center_lat = center_lat;
    }

    update_center_lon(center_lon) {
        this.center_lon = center_lon;
    }
}

// -104.1493, -74.4982

export const CAMERA = new Camera(-74.5271, -104.1102, 50000, 400, 400);