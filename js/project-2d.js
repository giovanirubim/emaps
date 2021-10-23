class ColorFactory {
    constructor(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
        this.sx = img.width;
        this.sy = img.height;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, this.sx, this.sy);
        this.bytes = ctx.getImageData(0, 0, this.sx, this.sy).data;
    }
    getPointBytes(x, y) {
        const { sx, sy, bytes } = this;
        x = Math.min((1 + x)*0.5*sx | 0, sx - 1);
        y = Math.min((1 - y)*0.5*sy | 0, sy - 1);
        const index = (y*sx + x)*4;
        const r = bytes[index];
        const g = bytes[index + 1];
        const b = bytes[index + 2];
        return [ r, g, b ];
    }
    getPointColor(x, y) {
        return `rgb(${this.getPointBytes(x, y)})`;
    }
    getAreaColor(x, y, sx, sy) {
    }
}

export const startProjection = async (img, ctx, projection, width, height) => {
    const colorFactory = new ColorFactory(img);
    width = 3;
    height = 3;
    for (let y=0; y<height; ++y) {
        const ny = 1 - (y + 0.5)/height*2;
        for (let x=0; x<width; ++x) {
            const nx = (x + 0.5)/width*2 - 1;
            let color = colorFactory.getPointColor(nx, ny);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
    // setInterval(() => {
    //     let x = Math.random()*2 - 1;
    //     let y = Math.random()*2 - 1;
    //     x = (1 + x)/2*width | 0;
    //     y = (1 - y)/2*height | 0;
    // }, 0);
};
