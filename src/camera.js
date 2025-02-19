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
            this.zoom -= 1000 * (this.zoom / 10000);
            if (this.zoom <= 4000) {
                this.zoom = 4000;
            }
        } else {
            this.zoom += 1000 * (this.zoom / 10000);
        }
    }

    onMouseDrag(p5, event) {
        if (event.x < p5.width && event.x > 0 && event.y < p5.height && event.y > 0) {
            this.center_lat -= (event.movementX / (this.zoom));
            this.center_lon -= (event.movementY / (this.zoom));
        }
    }
}

export const CAMERA = new Camera(-74.4952, -104.1181, 4000, window.innerWidth / 2, window.innerHeight * 3 / 4);