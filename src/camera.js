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
        let inc = 0.0005 * (10000 / this.zoom);

        if ((p5.key == "ArrowRight" || p5.key == "d") && p5.keyIsPressed) {
            CAMERA.update_center_lat(CAMERA.center_lat + inc);
        }
        
        if ((p5.key == "ArrowLeft" || p5.key == "a") && p5.keyIsPressed) {
            CAMERA.update_center_lat(CAMERA.center_lat - inc);
        }

        if ((p5.key == "ArrowUp" || p5.key == "w") && p5.keyIsPressed) {
            CAMERA.update_center_lon(CAMERA.center_lon - inc);
        }

        if ((p5.key == "ArrowDown" || p5.key == "s") && p5.keyIsPressed) {
            CAMERA.update_center_lon(CAMERA.center_lon + inc);
        }
    }

    onMouseScroll(event) {
        if (event.delta > 0) {
            this.zoom -= 1000;
            if (this.zoom <= 2000) {
                this.zoom = 2000;
            }
        } else {
            this.zoom += 1000;
        }
        console.log(this.zoom);
        console.log(this.center_lat, this.center_lon);
    }
}

export const CAMERA = new Camera(-74.4952, -104.1181, 2000, 400, 400);