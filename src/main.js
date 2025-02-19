import { array_to_points, PointTypes, create_line_between_points, Point3D } from "./point3D.js"
import { draw_filled_loop, draw_text_point, draw_points, draw_point } from "./point_functions.js";
import { CAMERA } from "./camera.js";
import { create_toggle } from "./html_additions.js";

const Sketch = (p5) => {
    var map_data, location_data;

    var overlay_toggles = {};
    var location_clicked_elem;

    p5.preload = () => {
        map_data = p5.loadJSON('./src/data/main_map_data.json');
        location_data = p5.loadJSON('./src/data/location_data.json');
    }
    
    p5.setup = () => {
        p5.createCanvas(CAMERA.width, CAMERA.height);
        p5.background("#022a5b");

        // Overlay toggles
        location_data.overlays.forEach((overlay) => {
            overlay_toggles[overlay.name] = overlay.toggle_default;
            create_toggle(p5, overlay.name, overlay_toggles);
        });

        location_clicked_elem = p5.createDiv('');
    }

    p5.draw = () => {
        p5.background("#022a5b");

        // Draw the boundaries as dotted lines.
        p5.stroke("#ffffff");

        let top_left = new Point3D(map_data.corners[0].location[0], map_data.corners[0].location[1], map_data.corners[0].location[2]);
        let top_right = new Point3D(map_data.corners[1].location[0], map_data.corners[1].location[1], map_data.corners[1].location[2]);
        let bottom_left = new Point3D(map_data.corners[2].location[0], map_data.corners[2].location[1], map_data.corners[2].location[2]);
        let bottom_right = new Point3D(map_data.corners[3].location[0], map_data.corners[3].location[1], map_data.corners[3].location[2]);

        let top = create_line_between_points(top_left, top_right);
        let left = create_line_between_points(top_left, bottom_left);
        let bottom = create_line_between_points(bottom_left, bottom_right);
        let right = create_line_between_points(bottom_right, top_right);

        draw_points(p5, top);
        draw_points(p5, left);
        draw_points(p5, bottom);
        draw_points(p5, right);
        
        p5.stroke("#000000");

        // Draw the places.
        map_data.places.forEach((place) => {
            place.loops.forEach((loop) => {
                let l = array_to_points(loop.data, PointTypes.LatLonZ);
                p5.fill(loop.color);
                draw_filled_loop(p5, l);
            });
        });

        // Overlays
        location_data.overlays.forEach((overlay) => {
            p5.stroke(overlay.color);

            if (overlay_toggles[overlay.name]) {
                overlay.data.forEach((d) => {
                    if (d.text == "") {
                        draw_point(p5, new Point3D(d.location[0], d.location[1], d.location[2], PointTypes.LatLonZ));
                    } else {
                        draw_text_point(p5, new Point3D(d.location[0], d.location[1], d.location[2], PointTypes.LatLonZ), d.text, overlay.color);
                    }
                });
            }
        });

        CAMERA.update(p5);
    }

    p5.mouseWheel = (event) => {
        CAMERA.onMouseScroll(event);
    }

    p5.mouseDragged = (event) => {
        CAMERA.onMouseDrag(event);
    }

    p5.mouseClicked = (event) => {
        let x = event.x;
        let y = event.y;

        let loc = new Point3D(x, y, 0, PointTypes.PlotXYZ).as_lonlat();
        loc.lat = +loc.lat.toFixed(4);
        loc.lon = +loc.lon.toFixed(4);

        if (event.ctrlKey) {
            location_clicked_elem.html(`${loc.lat}, ${loc.lon}`);
        }
    }
}

new p5(Sketch);