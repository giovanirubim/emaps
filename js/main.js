import './sphere-math.js';
import * as Projections from './projections.js';
import * as Project2D from './project-2d.js';

const loadImage = (name) => new Promise((done) => {
    const url = `./img-src/${name}`;
    const body = $('body');
    body.append(`<img/>`);
    const img = body.children().last();
    img.css({ display: 'none' });
    img[0].onload = () => {
        done(img[0]);
    };
    img.attr({ src: url });
});

const [ width, height ] = [ 256, 256 ];
const [ canvas ] = $('canvas').attr({ width, height });
const ctx = canvas.getContext('2d');
const img = await loadImage('nAzimuthal.jpg');
Project2D.startProjection(img, ctx, Projections.northAzimuthal, width, height);
