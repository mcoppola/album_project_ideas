function Room (context, width, height) {
	this.x = 0;
	this.y = 0;
	this.z = 1;
	this.frame = 0;
	this.shiftX = 0.1; //staring conditions
	this.shiftY = 1.6; //
	this.shiftFactor = 20;
	this.context = context;
	this.width = width;
	this.height = height;
	this.color = "#000000";
	this.colorChange = "#000000";
	this.oldColorChange = "#000000";
	this.playing = false;
	this.paused = false;
	this.lineWidth = 1;
	this.areaLines = [];
	this.lineCount = 50;
	this.delay = 100;
	this.segmentLength = 80;

}
Room.prototype.play = function () {

	for(var i = 1; i < this.lineCount; i++) {
		this.areaLines[i] = new AreaLine(this, this.x - (i*this.delay), this.y - (i*this.delay));
		this.areaLines[i].draw(this.context, this.frame - (i*this.delay), this.width, this.height, i);
	}
	
}

function AreaLine (room, x, y) {
	this.room = room;
	this.x = x;
	this.y = y;
	this.shiftXL = room.shiftX;
	this.shiftXR = 1 + (1 - room.shiftX);
	this.shiftYT = room.shiftY;
	this.shiftYB = 1 + (1 - room.shiftY);
	this.z = room.z;
	this.color = "#000000";
	this.blacks = ["#000000", "#191919", "#333333", "#4D4D4D", "#666666", "#898989", "#999999", "#B2B2B2", "#CCCCCC", "#E6E6E6", "#FFFFFF"];
	this.lineWidth = 2;
}
AreaLine.prototype.draw = function (context, frame, width, height, i) {

	context.save();
	context.beginPath();
	context.globalAlpha = (width/2 - this.x + 10)/(width/2);
	context.lineWidth = this.lineWidth;
	
	seg = this.room.segmentLength - (frame)/3.6;
	if (seg < 0) {
		seg = 0;
	}

	//boxes
	if (i % 2 == 0) {
		if (width/2 > this.x + 2) {
/*			context.shadowBlur = 15;
			context.shadowColor = this.color;*/
			//top
			context.moveTo(this.x*this.shiftXL + seg*this.shiftXL, this.y*this.shiftYT + seg*this.shiftYT);
			context.lineTo(width - this.x*this.shiftXR - seg*this.shiftXR, this.y*this.shiftYT + seg*this.shiftYT);
			//right
			context.moveTo(width - this.x*this.shiftXR - seg*this.shiftXR, this.y*this.shiftYT + seg*this.shiftYT);
			context.lineTo(width - this.x*this.shiftXR - seg*this.shiftXR, height - this.y*this.shiftYB - seg*this.shiftYB);
			//bottom
			context.moveTo(width - this.x*this.shiftXR - seg*this.shiftXR, height - this.y*this.shiftYB - seg*this.shiftYB);
			context.lineTo(this.x*this.shiftXL + seg*this.shiftXL, height - this.y*this.shiftYB - seg*this.shiftYB);
			//left
			context.moveTo(this.x*this.shiftXL + seg*this.shiftXL, height - this.y*this.shiftYB - seg*this.shiftYB);
			context.lineTo(this.x*this.shiftXL + seg*this.shiftXL, this.y*this.shiftYT + seg*this.shiftYT);
			
			context.stroke();
			
		}
	}

	context.beginPath();

	//top left
	context.moveTo(this.x*this.shiftXL, this.y*this.shiftYT);
	context.lineTo(this.x*this.shiftXL + seg*this.shiftXL, this.y*this.shiftYT + seg*this.shiftYT);
	
	//top right
	context.moveTo(width - this.x*this.shiftXR, this.y*this.shiftYT);
	context.lineTo(width - this.x*this.shiftXR - seg*this.shiftXR, this.y*this.shiftYT + seg*this.shiftYT);

	//bottom left
	context.moveTo(this.x*this.shiftXL, height - this.y*this.shiftYB);
	context.lineTo(this.x*this.shiftXL + seg*this.shiftXL, height  - this.y*this.shiftYB - seg*this.shiftYB);

	//bottom right
	context.moveTo(width - this.x*this.shiftXR, height - this.y*this.shiftYB);
	context.lineTo(width - this.x*this.shiftXR - seg*this.shiftXR, height - this.y*this.shiftYB - seg*this.shiftYB);

	//snowflake
	if (i % 300 == 0) {
		context.moveTo
	}
	//context.strokeStyle = this.blacks[3];
	context.stroke();
	context.restore();}

function SnowFlake (x, y, width, height, size) {
	if (size === undefined) { size = 4; }
	colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
		"#FF00FF", "#C0C0C0"];
	this.x = x;
	this.y = y;
	this.z = 1;
	this.size = size;
	this.delay = 100;
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.lineWidth = 3;


	this.dx = Math.abs(x - (width/2));
	this.dxu = x - width/2;
	this.dy = Math.abs(y - height/2);
	this.dyu = y - height/2;
	this.rate = (Math.sqrt(Math.pow(this.dx, 2)+Math.pow(this.dy, 2))/Math.sqrt(Math.pow(width/2, 2)+Math.pow(height/2, 2)))*3;
	if (this.dx > this.dy){
		this.xScale = this.dx/this.dy;
		this.yScale = 1;
	}
	else {
		this.xScale = 1;
		this.yScale = this.dy/this.dx;
	}

	this.trails = [];
	for (var i = 1; i < Math.random()*10; i++) {
		if(this.dxu < 0 && this.dyu < 0){
			this.trails.push(new SnowFlakeTrails(this.x - (i*this.delay*(this.dx/(width/2))), this.y - (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu > 0 && this.dyu < 0){
			this.trails.push(new SnowFlakeTrails(this.x + (i*this.delay*(this.dx/(width/2))), this.y - (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu < 0 && this.dyu > 0){
			this.trails.push(new SnowFlakeTrails(this.x - (i*this.delay*(this.dx/(width/2))), this.y + (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu > 0 && this.dyu > 0){
			this.trails.push(new SnowFlakeTrails(this.x + (i*this.delay*(this.dx/(width/2))), this.y + (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
	}

}
SnowFlake.prototype.draw = function (context, frame, width, height, shiftX, shiftY) {
	
	context.save();
	context.lineWidth = this.lineWidth;
	context.beginPath();
	context.shadowBlur = 1;
	context.shadowColor = this.color;
	
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.size*this.z, this.y + this.size*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - this.size*this.z, this.y + this.size*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.size*this.z, this.y - this.size*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - this.size*this.z, this.y - this.size*this.z);

	//context.strokeStyle = this.color;
	context.stroke();
	context.restore();


	/*for(var i = 0; i <this.trails.length; i++) {
		this.trails[i].draw(context, frame, width, height);
	}*/

	
	this.dx = Math.abs(this.x - (width/2)*shiftX);
	this.dy = Math.abs(this.y - (height/2)*shiftY);
	this.rate = (Math.sqrt(Math.pow(this.dx, 2)+Math.pow(this.dy, 2))/Math.sqrt(Math.pow((width/2)*shiftX, 2)+Math.pow((height/2)*shiftY, 2)))*3;
	if (this.dx > this.dy){
		this.xScale = this.dx/this.dy;
		this.yScale = 1;
	}
	else {
		this.xScale = 1;
		this.yScale = this.dy/this.dx;
	}

	rate = Math.max(this.z, 0.3)*this.rate;

	if(this.x > (width/2)*shiftX) {
		this.x -= 1/this.yScale*rate;
	}
	else if (this.x < (width/2)*shiftX) {
		this.x += 1/this.yScale*rate;
	}
	if(this.y > (height/2)*shiftY) {
		this.y -= 1/this.xScale*rate;
	}
	else if (this.y < (height/2)*shiftY) {
		this.y += 1/this.xScale*rate;
	}

}

function SnowFlakeTrails (x, y, width, height, rate) {
	colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
		"#FF00FF", "#C0C0C0"];
	this.x = x - 50;
	this.y = y - 50;
	this.z = 1;
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.lineWidth = 2;


	this.dx = Math.abs(x - width/2);
	this.dy = Math.abs(y - height/2);
	this.rate = rate;
	if (this.dx > this.dy){
		this.xScale = this.dx/this.dy;
		this.yScale = 1;
	}
	else {
		this.xScale = 1;
		this.yScale = this.dy/this.dx;
	}

}

SnowFlakeTrails.prototype.draw = function (context, frame, width, height) {
	
	context.save();
/*	context.translate(this.x, this.y);
	context.rotate(Math.PI*z);*/
	context.lineWidth = this.lineWidth;
	context.beginPath();
	
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 4*this.z, this.y + 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 4*this.z, this.y + 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 4*this.z, this.y - 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 4*this.z, this.y - 4*this.z);

	context.strokeStyle = this.color;
	context.stroke();
	context.restore();

	rate = Math.max(this.z, 0.3)*this.rate;

	if(this.x > width/2) {
		this.x -= 1/this.yScale*rate;
	}
	else if (this.x < width/2) {
		this.x += 1/this.yScale*rate;
	}
	if(this.y > height/2) {
		this.y -= 1/this.xScale*rate;
	}
	else if (this.y < height/2) {
		this.y += 1/this.xScale*rate;
	}

}