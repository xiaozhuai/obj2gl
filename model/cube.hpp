/*
 * auto created by obj2gl
 *
 * repo  : https://github.com/xiaozhuai/obj2gl
 * obj   : model/cube.obj
 * faces : 12
 * verts : 36
 *
 */

#ifndef OBJ2GL_OBJ2GLVERTS
#define OBJ2GL_OBJ2GLVERTS

typedef struct {
    int numFaces;
    int numVerts;
    float *vertCoords;
    float *normalCoords;
    float *texCoords;
} Obj2glVerts;

#endif



#ifndef OBJ2GL_CUBE
#define OBJ2GL_CUBE

extern Obj2glVerts cubeVerts;

#endif
