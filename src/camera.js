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

    update(p5) {
        if ((p5.key == "ArrowRight" || p5.key == "d") && p5.keyIsPressed) {
            CAMERA.update_center_lat(CAMERA.center_lat + 0.0001);
        }
        
        if ((p5.key == "ArrowLeft" || p5.key == "a") && p5.keyIsPressed) {
            CAMERA.update_center_lat(CAMERA.center_lat - 0.0001);
        }

        if ((p5.key == "ArrowUp" || p5.key == "w") && p5.keyIsPressed) {
            CAMERA.update_center_lon(CAMERA.center_lon - 0.0001);
        }

        if ((p5.key == "ArrowDown" || p5.key == "s") && p5.keyIsPressed) {
            CAMERA.update_center_lon(CAMERA.center_lon + 0.0001);
        }
    }

    onMouseScroll(event) {
        if (event.delta > 0) {
            this.zoom -= 1000;
            if (this.zoom <= 0) {
                this.zoom = 0;
            }
        } else {
            this.zoom += 1000;
        }
    }
}

// -104.1493, -74.4982

export const CAMERA = new Camera(-74.5271, -104.1102, 50000, 400, 400);