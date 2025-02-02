import {array_to_points, PointTypes} from "./point3D.js"
import { CAMERA } from "./camera.js";

var draw_line = (p5, line) => {
    for (let i = 0; i < line.length - 1; i++) {
        let p1 = line[i].as_xy();
        let p2 = line[i + 1].as_xy();

        p5.vertex(p1.x, p1.y);

        p5.line(p1.x, p1.y, p2.x, p2.y);
    }

    p5.vertex(line[line.length - 1].as_xy().x, line[line.length - 1].as_xy().y);
}

var draw_loop = (p5, loop) => {
    draw_line(p5, loop);

    let pFirst = loop[0].as_xy();
    let pLast = loop[loop.length - 1].as_xy();

    p5.line(pLast.x, pLast.y, pFirst.x, pFirst.y);
}

var draw_filled_loop = (p5, loop) => {
    p5.beginShape();

    draw_loop(p5, loop);

    p5.endShape(p5.CLOSE);
}

const Sketch = (p5) => {
    var map_data;

    p5.preload = () => {
        map_data = p5.loadJSON('./src/data/main_map_data.json');
    }
    
    p5.setup = () => {
        p5.createCanvas(CAMERA.width, CAMERA.height);
        p5.background("#022a5b");
    }

    p5.draw = () => {
        p5.background("#022a5b");

        var loop = array_to_points(map_data.places[0].loops[0].data, PointTypes.LatLonZ);

        draw_filled_loop(p5, loop);

        CAMERA.update(p5);
    }

    p5.mouseWheel = (event) => {
        CAMERA.onMouseScroll(event);
    }
}

let myp5 = new p5(Sketch);