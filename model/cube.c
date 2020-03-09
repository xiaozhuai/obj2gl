/*
 * auto created by obj2gl
 *
 * repo  : https://github.com/xiaozhuai/obj2gl
 * obj   : model/cube.obj
 * faces : 12
 * verts : 36
 *
 */

#include "cube.h"

int cubeNumFaces = 12;

int cubeNumVerts = 36;

float cubeVertCoords[] = {
    -0.5, -0.5, 0.5, 
    0.5, -0.5, 0.5, 
    -0.5, 0.5, 0.5, 
    -0.5, 0.5, 0.5, 
    0.5, -0.5, 0.5, 
    0.5, 0.5, 0.5, 
    -0.5, 0.5, 0.5, 
    0.5, 0.5, 0.5, 
    -0.5, 0.5, -0.5, 
    -0.5, 0.5, -0.5, 
    0.5, 0.5, 0.5, 
    0.5, 0.5, -0.5, 
    -0.5, 0.5, -0.5, 
    0.5, 0.5, -0.5, 
    -0.5, -0.5, -0.5, 
    -0.5, -0.5, -0.5, 
    0.5, 0.5, -0.5, 
    0.5, -0.5, -0.5, 
    -0.5, -0.5, -0.5, 
    0.5, -0.5, -0.5, 
    -0.5, -0.5, 0.5, 
    -0.5, -0.5, 0.5, 
    0.5, -0.5, -0.5, 
    0.5, -0.5, 0.5, 
    0.5, -0.5, 0.5, 
    0.5, -0.5, -0.5, 
    0.5, 0.5, 0.5, 
    0.5, 0.5, 0.5, 
    0.5, -0.5, -0.5, 
    0.5, 0.5, -0.5, 
    -0.5, -0.5, -0.5, 
    -0.5, -0.5, 0.5, 
    -0.5, 0.5, -0.5, 
    -0.5, 0.5, -0.5, 
    -0.5, -0.5, 0.5, 
    -0.5, 0.5, 0.5
};

float cubeNormalCoords[] = {
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0
};

float cubeTexCoords[] = {
    0.001992, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.0019919999999999938, 
    0.001992, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.0019919999999999938, 
    0.998008, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.998008, 
    0.001992, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.0019919999999999938, 
    0.001992, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.0019919999999999938, 
    0.001992, 0.998008, 
    0.998008, 0.998008, 
    0.001992, 0.0019919999999999938, 
    0.001992, 0.0019919999999999938, 
    0.998008, 0.998008, 
    0.998008, 0.0019919999999999938
};

Obj2glVerts cubeVerts = {
    .numFaces = cubeNumFaces,
    .numVerts = cubeNumVerts,
    .vertCoords = cubeVertCoords,
    .normalCoords = cubeNormalCoords,
    .texCoords = cubeTexCoords
};
