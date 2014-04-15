
	/*
	 *
	 *  This function acts as a wrapper to a canvas object. It logs
	 *  every function call before forwarding the call to the canvas.
	 *
	 */ 
	function captureCanvas(canvas){
		var str='<?xml version="1.0" encoding="UTF-8"?>\n';
		var lastTimestep = new Date().getTime();

		// Add script tag
		str += '<script type="canvas">\n';

	    this.ctx = canvas;      // This is the actual canvas object
	    this.lineWidth = this.ctx.lineWidth;
		this.lineJoin = this.ctx.lineJoin;
		this.miterLimit = this.ctx.miterLimit;
		this.lineCap = this.ctx.lineCap;
		//Color,shadow and style.
		this.fillStyle = this.ctx.fillStyle;
		this.strokeStyle = this.ctx.strokeStyle;
		this.shadowColor = this.ctx.shadowColor;
		this.shadowBlur = this.ctx.shadowBlur;
		this.shadowOffsetX = this.ctx.shadowOffsetX;
		this.shadowOffsetY = this.ctx.shadowOffsetY;
		
		//Text property.
		this.font = this.ctx.font;
		this.textAlign = this.ctx.textAlign;
		this.textBaseline = this.ctx.textBaseline;
		//PixelManipulation property.
		this.imgData = function(){
			this.width = this.ctx.imgData.width;
			this.height = this.ctx.imgData.height;
			this.data = this.ctx.imageData.data;
		}
		
		//Compositing property.
		this.globalAlpha = this.ctx.globalAlpha;
		this.globalCompositeOperation = this.ctx.globalCompositeOperation;
		
		// Log XML line
		this.log = function(string){
			var timestep = new Date().getTime();

			// Calculate delay
			var delay = timestep - lastTimestep;

			// Update timestep
			lastTimestep = timestep;

			// Set string
			str += '<timestep delay="' + delay + '">' + '\n';
			str += string + '\n';
			str += '</timestep>' + '\n';
		}

	    this.beginPath = function(){
			this.UpdateAllFunctions();
			this.log('<beginpath/>');
	        this.ctx.beginPath();
	    }
	    
	    this.moveTo = function(x, y){
			this.UpdateAllFunctions();
			this.log('<moveto x="'+x+'" y="'+y+'"/>');
	        this.ctx.moveTo(x, y);
	    }
	    
	    this.lineTo = function(x, y){
			this.UpdateAllFunctions();
			this.log('<lineto x="'+x+'" y="'+y+'"/>');
	        this.ctx.lineTo(x, y);
	    }
	    
	    this.stroke = function(){
			this.UpdateAllFunctions();
			this.log('<stroke/>');       
	        this.ctx.stroke();
	    }
		
		this.createLinearGradient = function(x, y, x1,y1){
			this.UpdateAllFunctions();
			this.log('<createlineargradient x="'+x+'" y="'+y+'" x1="'+x1+'" y1="'+y1+'"/>');       
	        this.ctx.createLinearGradient(x, y, x1,y1);
		}
		this.createPattern = function(x, y,img){
			this.UpdateAllFunctions();
			this.log('<createpattern x="'+x+'" y="'+y+'" img="'+img+'"/>');        
	        this.ctx.createPattern(x, y,img);
		}
		this.createRadialGradient = function(x, y,r, x1,y1,r1){
			this.UpdateAllFunctions();
			this.log('<createradialgradient x="'+x+'" y="'+y+'" r="'+r+'" x1="'+x1+'" y1="'+y1+'" r1="'+r1+'"/>');       
	        this.ctx.createRadialGradient(x, y,r, x1,y1,r1);
		}
		
		// Rectangle functions
		this.rect = function(x, y, width, height){
			this.UpdateAllFunctions();
	        this.log('<rect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');         
	        this.ctx.rect(x, y, width, height);
		}
		this.fillRect = function(x, y, width, height){
			this.UpdateAllFunctions();
			this.log('<fillrect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');        
	        this.ctx.fillRect(x, y, width, height);
		}
		this.strokeRect = function(x, y, width, height){
			this.UpdateAllFunctions();
	        this.log('<strokerect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');        
	        this.ctx.strokeRect(x, y, width, height);
		}
		this.clearRect = function(x, y, width, height){
			this.UpdateAllFunctions();
	        this.log('<clearrect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');        
	        this.ctx.clearRect(x, y, width, height);
		}

		// Path functions
		this.fill = function(){
			this.UpdateAllFunctions();
	        this.log('<fill/>');        
	        this.ctx.fill();
	    }
		this.closePath = function(){
			this.UpdateAllFunctions();
	        this.log('<closepath/>');        
	        this.ctx.closePath();
	    }
		this.clip = function(){
			this.UpdateAllFunctions();
	        this.log('<clip/>');        
	        this.ctx.clip();
	    }
		this.quadraticCurveTo = function(x, y, cpx, cpy){
			this.UpdateAllFunctions();
	        this.log('<quadraticcurveto x="' + x + '" y="' + y+ '" cpx="'+cpx+'" cpy="'+cpy+'"/>');        
	        this.ctx.quadraticCurveTo(x, y, cpx, cpy);
		}
		this.bezierCurveTo = function(x, y, cpx, cpy, cpx1, cpy1){
			this.UpdateAllFunctions();
	        this.log('<beziercurveto x="' + x + '" y="' + y+ '" cpx="'+cpx+'" cpy="'+cpy+'" cpx1="'+cpx1+'  cpy1="'+cpy1+'"/>');        
	        this.ctx.bezierCurveTo(x, y, cpx, cpy, cpx1, cpy1);
		}
		this.arc = function(x, y,r,sAngle,eAngle,counterclockwise){
			this.UpdateAllFunctions();
	        this.log('<arc x="'+x+'" y="'+y+'" r="'+r+'" sAngle="'+sAngle+'" eAngle="'+eAngle+'" counterclockwise="'+counterclockwise+'"/>');        
	        this.ctx.arc(x, y,r,sAngle,eAngle,counterclockwise);
		}
		this.arcTo = function(x, y,r,x1,y1){
			this.UpdateAllFunctions();
	        this.log('<arcto x="'+x+'" y="'+y+'" r="'+r+'" x1="'+x1+'" y1="'+y1+'"/>');        
	        this.ctx.arcTo(x, y,r,x1,y1);
		}
		this.isPointInPath = function(x, y){
			this.UpdateAllFunctions();
	        this.log('<ispointinpath x="'+x+'" y="'+y+'"/>');        
	        return this.ctx.isPointInPath(x, y);
		}

		// Transformation functions
		this.scale = function(width, height){
			this.UpdateAllFunctions();
	        this.log('<scale width="'+width+'" height="'+height+'"/>');        
	        this.ctx.scale(width, height);
		}
		this.rotate = function(angle){
			this.UpdateAllFunctions();
	        this.log('<rotate angle="'+angle+'"/>');        
	        this.ctx.rotate(angle);
		}
		this.translate = function(x, y){
			this.UpdateAllFunctions();
	        this.log('<translate x="'+x+'" y="'+y+'"/>');        
	        this.ctx.translate(x, y);
		}
		this.transform = function(a,b,c,d,e,f){
			this.UpdateAllFunctions();
	        this.log('<transform a="' + a + '" b="' +b+ '" c="'+c+'" d="'+d+'" e="'+e+'  f="'+f+'"/>');        
	        this.ctx.transform(a,b,c,d,e,f);
		}
		this.setTransform = function(a,b,c,d,e,f){
			this.UpdateAllFunctions();
	        this.log('<settransform a="' + a + '" b="' +b+ '" c="'+c+'" d="'+d+'" e="'+e+'  f="'+f+'"/>');        
	        this.ctx.setTransform(a,b,c,d,e,f);
		}

		// Text functions
		this.fillText = function(x, y,text,maxWidth){
			this.UpdateAllFunctions();
	        this.log('<filltext x="' + x + '" y="' + y+ '" text="'+text+'" maxwidth="'+maxWidth+'"/>');        
	        this.ctx.fillText(x, y,text,maxWidth);
		}
		this.strokeText = function(x, y,text,maxWidth){
			this.UpdateAllFunctions();
	        this.log('<stroketext x="' + x + '" y="' + y+ '" text="'+text+'" maxwidth="'+maxWidth+'"/>');        
	        this.ctx.strokeText(x, y,text,maxWidth);
		}
		this.measureText = function(text){
			this.UpdateAllFunctions();
	        this.log('<measuretext text="'+text+'"/>');        
	        return this.ctx.measureText(text);
		}

		// Image draw functions
		this.drawImage = function(img,sx,sy,swidth,sheight,x,y,width,height){
		
			this.UpdateAllFunctions();
	        this.log('<drawimage img="'+img+'" sx="'+sx+'" sy="'+sy+'" swidth="'+swidth+'" sheight="'+sheight+'" x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');        
	        this.ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		}

		// Pixel manipulation functions
		this.createImageData = function( imageData, width, height){
			this.UpdateAllFunctions();
			this.log('<createimagedata imagedata="'+imageData+'" width="'+width+'" height="'+height+'"/>');        
			this.ctx.createImageData( imageData, width, height);
			
		}
		this.getImageData = function(x, y, width, height){
			this.UpdateAllFunctions();
	        this.log('<getimagedata x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'"/>');        
	        return this.ctx.getImageData(x, y, width, height);
		}
		this.putImageData = function(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight){
			this.UpdateAllFunctions();
	        this.log('<putimagedata imgdata="'+imgData+'" x="'+x+'" y="'+y+'" dirtyx="'+dirtyX+'" dirtyy="'+dirtyY+'" dirtywidth="'+dirtyWidth+'" dirtyheight="'+dirtyHeight+'"/>');        
	        return this.ctx.putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
		}
		//Other methods.
		this.restore = function(){
			this.UpdateAllFunctions();
	        this.log('<restore/>');        
	        return this.ctx.restore();
	    }
		
		/* Update state of the contextlines in the function for the properties and will check if any property needs updates.
		This updates are added to the xml if there are any.*/
		this.UpdateAllFunctions = function(){
			this.updateContextLineState();
			this.updateContextCssState();
			this.updateContextTextState();
			this.updateContextPixelManipulationState();
			this.updateContextCompositingState();
		}
		this.updateContextLineState = function(){
			var str = '<state';

			// Check for updates
			if (this.ctx.lineWidth != this.lineWidth) {
				str += this.updateContextProperty('lineWidth');
			}
			if (this.ctx.lineJoin != this.lineJoin) {
				str += this.updateContextProperty('lineJoin');
			}
			if (this.ctx.miterLimit != this.miterLimit) {
				str += this.updateContextProperty('miterLimit');
			}
			if (this.ctx.lineCap != this.lineCap) {
				str += this.updateContextProperty('lineCap');
			}

			// Add state update to XML if needed
			if (str.length > 6){
				str += '/>';
				this.log(str);
			}
		}
		
		// Update state
		this.updateContextCssState = function(){
			var str = '<state';
			
			// Check for updates
			if (this.ctx.fillStyle != this.fillStyle) {
				str += this.updateContextProperty('fillStyle');
			}
			if (this.ctx.strokeStyle != this.strokeStyle) {
				str += this.updateContextProperty('strokeStyle');
			}
			if (this.ctx.shadowColor != this.shadowColor) {
				str += this.updateContextProperty('shadowColor');
			}
			if (this.ctx.shadowBlur != this.shadowBlur) {
				str += this.updateContextProperty('shadowBlur');
			}
			if (this.ctx.shadowOffsetX != this.shadowOffsetX) {
				str += this.updateContextProperty('shadowOffsetX');
			}
			if (this.ctx.shadowOffsetY != this.shadowOffsetY) {
				str += this.updateContextProperty('shadowOffsetY');
			}

			// Add state update to XML if needed
			if (str.length > 6){
				str += '/>';
				this.log(str);
			}
		}

		// Update state
		this.updateContextTextState = function(){
			var str = '<state';
			
			// Check for updates
			if (this.ctx.font != this.font) {
				str += this.updateContextProperty('font');
			}
			if (this.ctx.textAlign != this.textAlign) {
				str += this.updateContextProperty('textAlign');
			}
			if (this.ctx.textBaseline != this.textBaseline) {
				str += this.updateContextProperty('textBaseline');
			}

			// Add state update to XML if needed
			if (str.length > 6){
				str += '/>';
				this.log(str);
			}
		}
		// Update state
		this.updateContextPixelManipulationState = function(){
			
			// These properties does not exist in canvas and should be removed.
			/*
			var str = '<state';
				// Check for updates
				if (this.ctx.imgData.width != this.imgData.width) {
					str += this.updateContextProperty('imgData.width');
				}
				if (this.ctx.imgData.height != this.imgData.height) {
					str += this.updateContextProperty('imgData.height');
				}
				if (this.ctx.imageData.data != this.imageData.data) {
					str += this.updateContextProperty('imageData.data');
				}

				// Add state update to XML if needed
				if (str.length > 6){
					str += '/>';
					this.log(str);
				}*/
		}

		// Update state
		this.updateContextCompositingState = function(){
			var str = '<state';
			
			// Check for updates
			if (this.ctx.globalAlpha != this.globalAlpha) {
				str += this.updateContextProperty('globalAlpha');
			}
			if (this.ctx.globalCompositeOperation != this.globalCompositeOperation) {
				str += this.updateContextProperty('globalCompositeOperation');
			} 
		
			// Add state update to XML if needed
			if (str.length > 6){
				str += '/>';
				this.log(str);
			}
		}
		
		
		
		// Update a specific property
		this.updateContextProperty = function(property) {
			// Update property
			this.ctx[property] = this[property];

			// Create string for state
			var attribute = '_' + property + ' value="' + this[property] + '"';
			attribute.toLowerCase();

			return (attribute);
		}
		
		// Add save button to BODY
		$("body").append("<input type='button' id='CanvasWrapper-save' value='Save log' style='position:absolute;right:0;top:0'>");
		// Save log when "Save log" button is clciked
		$("#CanvasWrapper-save").click(function(){
			$.ajax({
		        type: 'POST',
		        url: 'logfile.php',
		        data: { string: str + "</script>" }
	        });
		});
		
		
	}
 	
