# AI 3D Modeling

## Download OpenSCAD

Unfortunately, OpenSCAD is not well-funded and doesn't have often stable releases.
But development snapshots are available.
I highly recommend using the latest snapshot.
**NOT** The normal release!

Download the latest snapshot from: [https://openscad.org/downloads.html#snapshots](https://openscad.org/downloads.html#snapshots)
If you are using Linux, I recommend the flatpak version.

**or**

Run it on the web (takes a while to load): [https://ochafik.com/openscad/](https://ochafik.com/openscad/)

## Getting Started with OpenSCAD

We will follow chapters 1 and 2 of this tutorial: [https://openscad.org/documentation.html](https://openscad.org/documentation.html).

## Using AI with OpenSCAD

### Example 1: Rounded Cube (Dice)

Prompt: "Write the code to make a 20mm cube with slightly rounded edges to be like a dice in OpenSCAD"

Expected Output:

```openscad
size = 20;
corner_radius = 2;

//https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations
minkowski() {
    cube([size - corner_radius*2, size - corner_radius*2, size - corner_radius*2], center=true);
    sphere(r=corner_radius, $fn=20);
}
```

### Example 2: Washer

Prompt: "Write the code that would create a washer that's 20mm outer diameter, 10mm inner diameter, and 3mm thick in OpenSCAD"

Expected Output:

```openscad
outer_diameter = 20;
inner_diameter = 10;
thickness = 3;

difference() {
    cylinder(h=thickness, d=outer_diameter, $fn=50);
    translate([0, 0, -1])
        cylinder(h=thickness + 2, d=inner_diameter, $fn=50);
}
```

### Example 3: Simple Bracket

Item: An L-shaped mounting bracket with holes

Prompt: "In OpenSCAD write the code to make an L-shaped bracket. Each arm of the bracket needs to be a 40mm by 40mm square with rounded corners, 5mm thick. Each arm should include two mounting holes"

Expected Output:

```openscad
// L-Shaped Bracket Script
// Increase $fn for smoother curved edges
$fn = 64;

// Bracket Parameters
arm_length = 40;       // Length of each arm from the corner
bracket_width = 40;    // Width of the bracket
thickness = 5;         // Thickness of the bracket walls
corner_radius = 3;     // Outer corner rounding radius
hole_diameter = 4.5;   // Mounting hole diameter (sized for M4/M5 screws)

module l_profile() {
    // Generates a 2D L-shape with rounded outer corners using hull combinations
    hull() {
        // Horizontal arm base
        translate([corner_radius, corner_radius]) circle(r=corner_radius);
        translate([arm_length - corner_radius, corner_radius]) circle(r=corner_radius);
        translate([corner_radius, thickness - corner_radius]) circle(r=corner_radius);
        translate([arm_length - corner_radius, thickness - corner_radius]) circle(r=corner_radius);
    }
    hull() {
        // Vertical arm base
        translate([corner_radius, corner_radius]) circle(r=corner_radius);
        translate([thickness - corner_radius, corner_radius]) circle(r=corner_radius);
        translate([corner_radius, arm_length - corner_radius]) circle(r=corner_radius);
        translate([thickness - corner_radius, arm_length - corner_radius]) circle(r=corner_radius);
    }
}

module l_bracket() {
    difference() {
        // Extrude the 2D profile along the width, centered on the Y-axis
        translate([0, -bracket_width / 2, 0])
            linear_extrude(height = bracket_width)
                l_profile();

        // Horizontal arm mounting holes (symmetrically spaced)
        translate([12, 0, -1])
            cylinder(h = thickness + 2, d = hole_diameter);
        translate([28, 0, -1])
            cylinder(h = thickness + 2, d = hole_diameter);

        // Vertical arm mounting holes (symmetrically spaced)
        translate([-1, 0, 12])
            rotate([0, 90, 0])
                cylinder(h = thickness + 2, d = hole_diameter);
        translate([-1, 0, 28])
            rotate([0, 90, 0])
                cylinder(h = thickness + 2, d = hole_diameter);
    }
}

// Render the bracket
l_bracket();
```

### Slicing

Turn a 3D model into something a 3D printer can print.
Don't have to have students follow along here.
I recommend turning on 3D printer at home so you can connect to it during slicing.

- Download your favorite stl slicer.
- Open `.stl` file in slicer.
- Slice.
- Print (don't have to actually print).
