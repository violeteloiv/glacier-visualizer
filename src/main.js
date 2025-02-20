import { array_to_points, PointTypes, create_line_between_points, Point3D } from "./point3D.js"
import { draw_filled_loop, draw_line, draw_text_point, draw_points, draw_point } from "./point_functions.js";
import { CAMERA } from "./camera.js";
import { create_toggle, create_toggle_group } from "./html_additions.js";

const Sketch = (p5) => {
    var map_data, location_data;

    var overlay_toggles = {};
    var current_clicked_point;
    var location_clicked_elem;

    p5.preload = () => {
        map_data = p5.loadJSON('./src/data/main_map_data.json');
        location_data = p5.loadJSON('./src/data/location_data.json');
    }
    
    p5.setup = () => {
        p5.createCanvas(CAMERA.width, CAMERA.height);
        p5.background("#022a5b");

        let div = p5.createDiv();
        div.id("overlays");
        div.position(p5.width + 20, 8);

        // Overlay toggles
        location_data.groups.forEach((group) => {
            overlay_toggles[group.name] = { value: group.toggle_default, div: null };
            let overlay_group = create_toggle_group(p5, group.name, overlay_toggles);

            group.sub_overlays.forEach((overlay) => {
                overlay_toggles[group.name][overlay.name] = { value: overlay.toggle_default, checkbox: null };
                create_toggle(p5, overlay.name, overlay_toggles, group.name);
            });            
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
                if (loop.lined) {
                    p5.stroke("#000000");
                } else {
                    p5.noStroke();
                }
                draw_filled_loop(p5, l);
            });
        });

        // Overlays
        location_data.groups.forEach((group) => {
            group.sub_overlays.forEach((overlay) => {
                p5.stroke(overlay.color);

                if (overlay_toggles[group.name][overlay.name].value) {
                    overlay.data.forEach((d) => {
                        if (d.location) {
                            if (d.text == "") {
                                draw_point(p5, new Point3D(d.location[0], d.location[1], d.location[2], PointTypes.LatLonZ));
                            } else {
                                draw_text_point(p5, new Point3D(d.location[0], d.location[1], d.location[2], PointTypes.LatLonZ), d.text, overlay.color);
                            }
                        } else if (d.loop) {
                            let l = array_to_points(d.loop.data, PointTypes.LatLonZ);
                            
                            p5.fill(d.loop.color);
                            if (d.loop.lined) {
                                p5.stroke("#000000");
                            } else {
                                p5.noStroke();
                            }
                            draw_filled_loop(p5, l);
                        }
                    });
                }
            });
        });

        // Draw the current click point 
        p5.stroke("#00ff00");
        p5.strokeWeight(4);
        if (current_clicked_point) {
            let converted = new Point3D(current_clicked_point.lat, current_clicked_point.lon, 0, PointTypes.LatLonZ).as_xy();
            p5.point(converted.x, converted.y);
        }
        p5.strokeWeight(1);

        CAMERA.update(p5);
    }

    p5.mouseWheel = (event) => {
        CAMERA.onMouseScroll(event);
    }

    p5.mouseDragged = (event) => {
        CAMERA.onMouseDrag(p5, event);
    }

    p5.mouseClicked = (event) => {
        let x = event.x;
        let y = event.y;

        if (event.ctrlKey) {
            current_clicked_point = new Point3D(x - 12, y - 12, 0, PointTypes.PlotXYZ).as_lonlat();
            current_clicked_point.lat = +current_clicked_point.lat.toFixed(4);
            current_clicked_point.lon = +current_clicked_point.lon.toFixed(4);

            location_clicked_elem.html(`${current_clicked_point.lat}, ${current_clicked_point.lon}`);
        }
    }
}

new p5(Sketch);