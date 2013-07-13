function Road (lineWidth, color) {
	if (lineWidth === undefined) { lineWidth = 2;}
	if (color === undefined) { color = "#000000";}
	this.segments = 4;
	this.segmentLength = 40;
	this.x = 0;
	this.y = 0;
	this.color = color;
	this.lineWidth = lineWidth;
}
Road.prototype.draw = function (context, frame, width, height) {

	context.save();
	//context.translate(this.x, this.y);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();

	seg = this.segmentLength - frame/5
	if (seg < 0) {
		seg = 0;
	}

	//top left
	//context.moveTo(this.x, this.y);
	//context.lineTo(this.x + this.segmentLength, this.y + this.segmentLength);
	
	//top right
	//context.moveTo(width - this.x, this.y);
	//context.lineTo(width - this.x - this.segmentLength, this.y + this.segmentLength);

	//bottom left
	context.moveTo(this.x, height - this.y);
	context.lineTo(this.x + seg, height  - this.y - seg);

	//bottom right
	context.moveTo(width - this.x, height - this.y);
	context.lineTo(width - this.x - seg, height - this.y - seg);

	context.stroke();
	context.restore();
}