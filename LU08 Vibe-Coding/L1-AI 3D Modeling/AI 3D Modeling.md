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

Prompt: "Write the code to make a 20mm cube with slightly rounded edges  to be like a dice in OpenSCAD"

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

[//]: # (TODO Change expected to have two holes in each arm and rounded corners)

```openscad
arm_length = 40;
thickness = 5;
hole_diameter = 6;

difference() {
    union() {
        // Horizontal arm
        cube([arm_length, arm_length, thickness]);
        
        // Vertical arm
        cube([arm_length, thickness, arm_length]);
    }
    
    // Hole in horizontal arm
    translate([arm_length/2, arm_length/2, -1])
        cylinder(h=thickness + 2, d=hole_diameter, $fn=30);
    
    // Hole in vertical arm
    translate([arm_length/2, -1, arm_length/2])
        rotate([-90, 0, 0])
            cylinder(h=thickness + 2, d=hole_diameter, $fn=30);
}
```

### Slicing 

Turn a 3D model into something a 3D printer can print.
Don't have to have students follow along here.
I recommend turning on 3D printer at home so you can connect to it during slicing.

- Download your favorite stl slicer.
- Open `.stl` file in slicer.
- Slice.
- Print (don't have to actually print).

