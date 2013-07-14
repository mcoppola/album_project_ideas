function Road (lineWidth, color) {
	if (lineWidth === undefined) { lineWidth = 2;}
	if (color === undefined) { color = "#000000";}
	this.segments = 4;
	this.segmentLength = 80;
	this.x = 0;
	this.y = 0;
	this.color = color;
	this.lineWidth = lineWidth;
	this.areaLines = [];
	this.lineCount = 20;
	this.offsets = [];
	corners_temp = [];
	for(var i = 0; i < this.lineCount; i++) {
/*		for(var k = 0; i < 4; i++) {
			corners_temp[k] = Math.random();
		}*/
		this.offsets[i] = Math.random();
	}
}
Road.prototype.play = function (context, frame, delay, width, height) {

	for(var i = 0; i < this.lineCount; i++) {
		this.areaLines[i] = new AreaLine(this.x - (i*delay), this.y - (i*delay));
		this.areaLines[i].draw(context, frame - (i*delay), width, height, this.offsets[i], i);
	}
	
}

function AreaLine (x, y) {
	this.x = x;
	this.y = y;
	this.color = "#000000";
	this.lineWidth = 2;
}
AreaLine.prototype.draw = function (context, frame, width, height, rand, i) {
	context.save();
	//context.translate(this.x, this.y);	
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	
	seg = 80 - frame/3.6
	if (seg < 0) {
		seg = 0;
	}

	//boxes
	if (i % 2 == 0) {
		if (width/2 > this.x) {
/*			context.shadowBlur = 15;
			context.shadowColor = this.color;*/
			context.moveTo(this.x + seg, this.y + seg);
			context.lineTo(width - this.x - seg, this.y + seg);
			context.moveTo(width - this.x - seg, this.y + seg);
			context.lineTo(width - this.x - seg, height - this.y - seg);
			context.moveTo(width - this.x - seg, height - this.y - seg);
			context.lineTo(this.x + seg, height - this.y - seg);
			context.moveTo(this.x + seg, height - this.y - seg);
			context.lineTo(this.x + seg, this.y + seg);
		}
	}


	//top left
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + seg, this.y + seg);
	
	//top right
	context.moveTo(width - this.x, this.y);
	context.lineTo(width - this.x - seg, this.y + seg);

	//bottom left
	context.moveTo(this.x, height - this.y);
	context.lineTo(this.x + seg, height  - this.y - seg);

	//bottom right
	context.moveTo(width - this.x, height - this.y);
	context.lineTo(width - this.x - seg, height - this.y - seg);

	//snowflake
	if (i % 300 == 0) {
		context.moveTo
	}

	context.stroke();
	context.restore();
}

function SnowFlake (x, y) {
	colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
		"#FF00FF", "#C0C0C0"];
	this.x = x;
	this.y = y;
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.lineWidth = 3;
	this.z = 1;
}
SnowFlake.prototype.draw = function (context, frame, width, height) {
	context.fillStyle = this.color;
	context.save();
/*	context.translate(this.x, this.y);
	context.rotate(Math.PI*z);*/
	context.lineWidth = this.lineWidth;
	context.beginPath();
	

	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 8*this.z, this.y + 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 8*this.z, this.y + 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 8*this.z, this.y - 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 8*this.z, this.y - 8*this.z);

	context.stroke();
	context.restore();

}