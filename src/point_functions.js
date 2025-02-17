export var draw_point = (p5, point) => {
    p5.strokeWeight(5);
    p5.point(point.as_xy().x, point.as_xy().y);
    p5.strokeWeight(1);
}

export var draw_points = (p5, line) => {
    for (let i = 0; i < line.length; i++) {
        let p = line[i].as_xy();
        p5.point(p.x, p.y);
    }
}

export var draw_text_point = (p5, point, name) => {
    draw_point(p5, point);
    p5.fill("#000000");
    p5.text(name, point.as_xy().x + 3, point.as_xy().y - 3);
}

export var draw_line = (p5, line) => {
    for (let i = 0; i < line.length - 1; i++) {
        let p1 = line[i].as_xy();
        let p2 = line[i + 1].as_xy();

        p5.vertex(p1.x, p1.y);

        p5.line(p1.x, p1.y, p2.x, p2.y);
    }

    p5.vertex(line[line.length - 1].as_xy().x, line[line.length - 1].as_xy().y);
}

export var draw_loop = (p5, loop) => {
    draw_line(p5, loop);

    let pFirst = loop[0].as_xy();
    let pLast = loop[loop.length - 1].as_xy();

    p5.line(pLast.x, pLast.y, pFirst.x, pFirst.y);
}

export var draw_filled_loop = (p5, loop) => {
    p5.beginShape();

    draw_loop(p5, loop);

    p5.endShape(p5.CLOSE);
}