const fs = require('fs');

function calcSizeAndCenter(file) {
    let center = {x: 0, y: 0, z: 0};
    let scale;

    let lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/).map(line => line.trim());

    let tmpNumVerts = 0;

    let x_sum = 0;
    let y_sum = 0;
    let z_sum = 0;

    let x_min = 0;
    let y_min = 0;
    let z_min = 0;

    let x_max = 0;
    let y_max = 0;
    let z_max = 0;

    lines.forEach(line => {

        if (line.match(/v\s+.*/)) {
            tmpNumVerts++;
            let [x, y, z] = line.split(/\s+/).map(token => token.trim()).filter((token, index) => index !== 0).map(value => parseFloat(value));

            x_sum += x;
            y_sum += y;
            z_sum += z;

            if (tmpNumVerts === 1) {
                x_min = x;
                x_max = x;
                y_min = y;
                y_max = y;
                z_min = z;
                z_max = z;
            } else {
                if (x < x_min) x_min = x;
                if (x > x_max) x_max = x;
                if (y < y_min) y_min = y;
                if (y > y_max) y_max = y;
                if (z < z_min) z_min = z;
                if (z > z_max) z_max = z;
            }
        }
    });

    center.x = x_sum / tmpNumVerts;
    center.y = y_sum / tmpNumVerts;
    center.z = z_sum / tmpNumVerts;

    let x_diff = x_max - x_min;
    let y_diff = y_max - y_min;
    let z_diff = z_max - z_min;
    if ((x_diff >= y_diff) && (x_diff >= z_diff)) {
        scale = 1.0 / x_diff;
    } else if ((y_diff >= x_diff) && (y_diff >= z_diff)) {
        scale = 1.0 / y_diff;
    } else if ((z_diff >= x_diff) && (z_diff >= y_diff)) {
        scale = 1.0 / z_diff;
    }

    return {center, scale};
}

function fixedIndex(idx, num) {
    return idx >= 0 ? idx : num + idx + 1;
}

function loadData(file, center, scale) {
    let lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/).map(line => line.trim());

    let tmpNumVerts = 0;
    let numFaces = 0;
    let numTexture = 0;
    let numNormals = 0;

    let x_coords = [];
    let y_coords = [];
    let z_coords = [];
    let nx = [];
    let ny = [];
    let nz = [];
    let tx = [];
    let ty = [];
    let va_idx = [];
    let ta_idx = [];
    let na_idx = [];
    let vb_idx = [];
    let tb_idx = [];
    let nb_idx = [];
    let vc_idx = [];
    let tc_idx = [];
    let nc_idx = [];

    lines.forEach(line => {
        if (line.match(/v\s+.*/)) {
            let [x, y, z] = line.split(/\s+/).map(token => token.trim()).filter((token, index) => index !== 0).map(value => parseFloat(value));
            x = (x - center.x) * scale;
            y = (y - center.y) * scale;
            z = (z - center.z) * scale;

            x_coords[tmpNumVerts] = x;
            y_coords[tmpNumVerts] = y;
            z_coords[tmpNumVerts] = z;

            tmpNumVerts++;
        }

        if (line.match(/vt\s+.*/)) {
            let [x, y] = line.split(/\s+/).map(token => token.trim()).filter((token, index) => index !== 0).map(value => parseFloat(value));
            y = 1 - y;

            tx[numTexture] = x;
            ty[numTexture] = y;

            numTexture++;
        }

        if (line.match(/vn\s+.*/)) {
            let [x, y, z] = line.split(/\s+/).map(token => token.trim()).filter((token, index) => index !== 0).map(value => parseFloat(value));

            nx[numNormals] = x;
            ny[numNormals] = y;
            nz[numNormals] = z;

            numNormals++;
        }

        if (line.match(/f\s+.*/)) {
            let tokens = line.split(/\s+/).map(line => line.trim()).filter((token, index) => index !== 0);

            let a = tokens[0].split('/').map(value => value.trim()).map(value => parseInt(value));
            let b = tokens[1].split('/').map(value => value.trim()).map(value => parseInt(value));
            let c = tokens[2].split('/').map(value => value.trim()).map(value => parseInt(value));

            va_idx[numFaces] = a[0] - 1;
            ta_idx[numFaces] = a[1] - 1;
            na_idx[numFaces] = a[2] - 1;

            vb_idx[numFaces] = b[0] - 1;
            tb_idx[numFaces] = b[1] - 1;
            nb_idx[numFaces] = b[2] - 1;

            vc_idx[numFaces] = c[0] - 1;
            tc_idx[numFaces] = c[1] - 1;
            nc_idx[numFaces] = c[2] - 1;

            numFaces++;

            if (tokens.length === 4) {
                let d = tokens[3].split('/').map(value => value.trim()).map(value => parseInt(value));

                va_idx[numFaces] = a[0] - 1;
                ta_idx[numFaces] = a[1] - 1;
                na_idx[numFaces] = a[2] - 1;

                vb_idx[numFaces] = d[0] - 1;
                tb_idx[numFaces] = d[1] - 1;
                nb_idx[numFaces] = d[2] - 1;

                vc_idx[numFaces] = c[0] - 1;
                tc_idx[numFaces] = c[1] - 1;
                nc_idx[numFaces] = c[2] - 1;

                numFaces++;
            }

        }
    });

    // normalizeNormals
    for (let i = 0; i < numNormals; ++i) {
        let d = Math.sqrt(nx[i] * nx[i] + ny[i] * ny[i] + nz[i] * nz[i]);
        if (d === 0) {
            nx[i] = 1;
            ny[i] = 0;
            nz[i] = 0;
        } else {
            nx[i] /= d;
            ny[i] /= d;
            nz[i] /= d;
        }
    }

    let vertCoords = [];
    for (let i = 0; i < numFaces; i++) {
        let ia = fixedIndex(va_idx[i], tmpNumVerts);
        let ib = fixedIndex(vb_idx[i], tmpNumVerts);
        let ic = fixedIndex(vc_idx[i], tmpNumVerts);

        vertCoords.push(x_coords[ia]);
        vertCoords.push(y_coords[ia]);
        vertCoords.push(z_coords[ia]);

        vertCoords.push(x_coords[ib]);
        vertCoords.push(y_coords[ib]);
        vertCoords.push(z_coords[ib]);

        vertCoords.push(x_coords[ic]);
        vertCoords.push(y_coords[ic]);
        vertCoords.push(z_coords[ic]);
    }

    let normalCoords = [];
    if (numNormals > 0) {
        for (let i = 0; i < numFaces; i++) {
            let ia = fixedIndex(na_idx[i], numNormals);
            let ib = fixedIndex(nb_idx[i], numNormals);
            let ic = fixedIndex(nc_idx[i], numNormals);

            normalCoords.push(nx[ia]);
            normalCoords.push(ny[ia]);
            normalCoords.push(nz[ia]);

            normalCoords.push(nx[ib]);
            normalCoords.push(ny[ib]);
            normalCoords.push(nz[ib]);

            normalCoords.push(nx[ic]);
            normalCoords.push(ny[ic]);
            normalCoords.push(nz[ic]);
        }
    }

    let texCoords = [];
    if (numTexture > 0) {
        for (let i = 0; i < numFaces; i++) {
            let ia = fixedIndex(ta_idx[i], numTexture);
            let ib = fixedIndex(tb_idx[i], numTexture);
            let ic = fixedIndex(tc_idx[i], numTexture);

            texCoords.push(tx[ia]);
            texCoords.push(ty[ia]);

            texCoords.push(tx[ib]);
            texCoords.push(ty[ib]);

            texCoords.push(tx[ic]);
            texCoords.push(ty[ic]);
        }
    }

    let numVerts = numFaces * 3;

    return {
        numFaces,
        numVerts,
        vertCoords,
        normalCoords,
        texCoords
    };
}

module.exports = function (file, center, scale) {
    let sizeAndCenter = calcSizeAndCenter(file);
    if (center === undefined) {
        center = sizeAndCenter.center;
    }
    if (scale === undefined) {
        scale = sizeAndCenter.scale;
    }

    console.log(`center     : (${center.x}, ${center.y}, ${center.z})`);
    console.log(`scale      : ${scale}`);

    return loadData(file, center, scale);
};