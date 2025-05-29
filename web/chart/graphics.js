const graphics={};

/**
 * Draws a circular point on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} loc - [x, y] location of point
 * @param {String} color - Color of the point (default: black)
 * @param {Number} size - Diameter of point (default: 8)
 */
graphics.drawPoint=(ctx,loc,color="black",size=8)=>{
   ctx.beginPath();
   ctx.fillStyle=color;
   ctx.arc(...loc,size/2,0,Math.PI*2);
   ctx.fill();
}

/**
 * Draws text on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} config - Text configuration
 * @param {String} config.text - Text to display
 * @param {Array} config.loc - [x, y] position
 * @param {String} [config.align="center"] - Horizontal alignment
 * @param {String} [config.vAlign="middle"] - Vertical alignment
 * @param {Number} [config.size=10] - Font size
 * @param {String} [config.color="black"] - Text color
 */
graphics.drawText=(ctx,
   {text,loc,align="center",vAlign="middle",size=10,color="black"})=>{
      ctx.textAlign=align;
      ctx.textBaseline=vAlign;
      ctx.font="bold "+size+"px Courier";
      ctx.fillStyle=color;
      ctx.fillText(text,...loc);     
}

/**
 * Generates styled images from text using CSS filters
 * @param {Object} styles - Style definitions
 * @param {Number} [size=20] - Base size of images
 * @returns {Promise} Resolves when all images are loaded
 */
graphics.generateImages=(styles,size=20)=>{
   for(let label in styles){
      const style=styles[label];
      const canvas=document.createElement("canvas");
      canvas.width=size+10;
      canvas.height=size+10;

      const ctx=canvas.getContext("2d");
      ctx.beginPath();
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.font=size+"px Courier";

      const colorHueMap={
         red:0,
         yellow:60,
         green:120,
         cyan:180,
         blue:240,
         magenta:300
      };
      const hue=-45+colorHueMap[style.color];
      if(!isNaN(hue)){
         ctx.filter=`
            brightness(2)
            contrast(0.3)
            sepia(1)
            brightness(0.7)
            hue-rotate(${hue}deg)
            saturate(3)
            contrast(3)
         `;
      }else{
         ctx.filter="grayscale(1)";
      }

      ctx.fillText(style.text,
         canvas.width/2,canvas.height/2);

      style["image"]=new Image();
      style["image"].src=canvas.toDataURL();
   }
}

/**
 * Draws an image centered at a location
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Image} image - Image to draw
 * @param {Array} loc - [x, y] center position
 */
graphics.drawImage=(ctx,image,loc)=>{
   ctx.beginPath();
   ctx.drawImage(image,
      loc[0]-image.width/2,
      loc[1]-image.height/2,
      image.width,
      image.height
   );
   ctx.fill();
}
