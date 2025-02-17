export var create_toggle = (p5, name, overlay_toggles) => {
    let div = p5.createDiv();
    div.id(`${name}_container`);

    let checkbox = p5.createCheckbox(`${name}`);
    checkbox.parent(`${name}_container`);
    checkbox.checked(overlay_toggles[name]);
    checkbox.elt.onchange = () => {
        overlay_toggles[name] = !overlay_toggles[name];
    }
}