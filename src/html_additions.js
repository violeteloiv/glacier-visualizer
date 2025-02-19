export var create_toggle_group = (p5, name, overlay_toggles) => {
    let div = p5.createDiv();
    div.id(`${name}_group`);
    div.parent("overlays");

    overlay_toggles[name].div = div;

    let checkbox = p5.createCheckbox(`${name}`);
    checkbox.parent(`${name}_group`);
    checkbox.checked(overlay_toggles[name].value);
    checkbox.elt.onchange = () => {
        overlay_toggles[name].value = !overlay_toggles[name].value;
        for (let [key, _] of Object.entries(overlay_toggles[name])) {
            if (key != "value" && key != "div") {
                overlay_toggles[name][key].value = overlay_toggles[name].value;
                overlay_toggles[name][key].checkbox.checked(overlay_toggles[name][key].value);
                if (overlay_toggles[name][key].checkbox.checked()) {
                    overlay_toggles[name][key].checkbox.show();
                } else {
                    overlay_toggles[name][key].checkbox.hide();
                }
            }
        }
    }
}

export var create_toggle = (p5, name, overlay_toggles, group_name) => {
    let div = p5.createDiv();
    div.id(`${name}_container`);

    let checkbox = p5.createCheckbox(`&ensp;&ensp;&ensp;${name}`);
    checkbox.parent(`${name}_container`);
    checkbox.checked(overlay_toggles[group_name][name].value);
    checkbox.elt.onchange = () => {
        overlay_toggles[group_name][name].value = !overlay_toggles[group_name][name].value;
    }

    div.parent(`${group_name}_group`);

    overlay_toggles[group_name][name].checkbox = checkbox;
    if (checkbox.checked()) {
        checkbox.show();
    } else {
        checkbox.hide();
    }
}