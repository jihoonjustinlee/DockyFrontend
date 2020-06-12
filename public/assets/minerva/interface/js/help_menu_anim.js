(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.topicNavText = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A7KArIgIgDIACgHQADACAEABIAIABQAEAAAEgBQADgCACgEQACgEAAgGIAAgFIgGAGQgEACgFAAQgGAAgFgDQgFgDgCgFQgDgGAAgGQAAgIADgFQADgGAFgDQAFgDAGAAQAEAAADABQADABACACIADAEIAAAAIABgHIAHAAIAAAGIAAAHIAAAbQAAAJgCAFQgCAFgDADQgEAEgEABQgFABgFAAIgIgBgA7JgNQgEAEAAAJQAAAEACAEQABAEADACQAEACAEAAQAEAAAEgCQADgCABgFIABgCIAAgCIAAgIIAAgCIAAgCQgCgEgDgDQgDgCgFAAQgGAAgEAFgEggeAArIAAgzIgBgJIAAgHIAIAAIAAAIIABAAQACgEAFgDQAEgCAGAAQAGAAAEADQAFADADAFQACAGAAAHQAAAIgDAGQgDAGgFACQgFADgGAAQgEAAgEgCQgEgCgDgDIAAAagEggQgAPQgEADgBAFIgBABIAAACIAAAIIAAABIABACQABAFADADQAEACAFAAQAFAAADgCQADgCACgEQACgFAAgEQAAgFgCgEQgCgEgDgDQgDgCgFAAQgEAAgEADgEAhuAAWQgFgDgDgDQgCgEgBgFQABgGADgEQADgEAGgDQgFgDgDgDQgCgEAAgFQAAgFADgEQACgDAFgDQAEgCAGAAQAGAAAFADQAEACACADQACAEAAAEQAAAEgCAEQgDAEgGADIAAABQAGACAEAEQADAEAAAFQAAAGgDAEQgDAFgEACQgFACgHAAQgHAAgEgCgEAhvgACQgDADAAAFIACAGIAEAEQADACAEAAQAGAAAEgDQADgEAAgFQAAgGgDgCQgEgDgHgCQgGACgDADgEAhzgAiQgCABgBADIgCAFQAAAFAEADQADACAGACQAEgCADgDQACgDABgEQAAgDgCgCQgBgCgCgCIgGgCIgHACgAakAVQgFgDgDgHQgDgGAAgHQAAgKADgHQADgIAFgFQAEgEAGgCIALgDIAEgBIACAAIAAAIIgDAAIgDAAQgHABgFAEQgFADgCAFQgDAFgBAFQADgDAEgCQAEgCAFgBQAGABAEACQAFADACAEQADAFAAAFQAAAGgDAGQgCAFgFADQgFADgHAAQgHAAgFgDgAaogKQgDACgCAEIgBACIAAACQAAAEACAFQABAEADACQAEACAEABQAGgBADgEQAEgEAAgHQAAgGgEgEQgDgEgHAAQgEAAgDACgAW8AXIgHgDIACgGIAGACIAIABQAEAAAEgBQADgCACgDQACgDAAgFQAAgFgEgEQgFgEgJAAIgFAAIgEAAIAEgfIAfAAIAAAIIgZAAIgCAQIACAAIADAAIAHABIAHACIAHAHQACAEAAAFQAAAHgDAFQgDAFgFACQgGADgHAAIgJgBgAPyAXQgFgBgCgCIACgHIAGADQAEABAFAAQAFAAAEgCQADgCABgDQACgDgBgCQAAgFgCgCQgCgDgEgBIgIgBIgFAAIAAgHIAFAAIAGgBQAEgBACgDQACgCAAgEQAAgDgBgCIgEgDQgCgCgEAAQgEAAgEACIgFADIgDgHIAIgDQAEgCAFAAQAHAAAEACQAEADACADQACAEAAAEQAAAFgDAEQgDAEgGACIAAAAQAEABADACQAEACACAEIACAHQAAAFgDAFQgDAEgFADQgFACgIAAQgGAAgEgBgAFGAUQgFgDgDgIQgCgHgBgKQAAgLADgHQADgIAFgEQAFgEAHAAQAKAAAGAJQAFAIAAAQQAAAQgFAIQgGAJgLAAQgHAAgEgEgAFIgcQgEAHAAANQAAAMAEAHQADAGAGABQAFgBADgDQADgDABgGQACgFAAgJQAAgIgCgGQgBgFgDgEQgDgDgFAAQgFAAgEAHgABcAYIAAgHIADAAIAEAAIAIgCQADgCADgDQADgCADgFIADgJIgBAAQgCADgEACQgEABgFAAQgGAAgEgCQgEgCgDgFQgCgEAAgGQAAgGADgFQACgFAFgEQAFgDAHAAQAHAAAFAEQAEADADAGQADAGAAAJQgBAKgDAHQgDAHgFAFQgDAEgFACQgFACgGABIgEAAIgEAAgABmghQgDACgCADQgBAEAAAFQAAAGADAEQADADAGAAQAFAAADgBQADgCACgDIAAgCIABgCQAAgFgCgFQgBgEgDgDQgDgCgFAAQgDAAgDACgAhQAWQgFgDgCgDQgDgEAAgFQAAgGADgEQAEgEAGgDQgGgDgCgDQgDgEAAgFQABgFACgEQADgDAEgDQAFgCAGAAQAGAAAEADQAEACACADQACAEAAAEQABAEgDAEQgCAEgGADIAAABQAGACADAEQAEAEAAAFQAAAGgDAEQgDAFgFACQgFACgGAAQgHAAgFgCgAhOgCQgDADAAAFIABAGIAFAEQADACAEAAQAGAAADgDQAEgEAAgFQAAgGgEgCQgEgDgGgCQgGACgDADgAhKgiQgDABgBADIgBAFQAAAFADADQADACAGACQAEgCADgDQADgDAAgEQAAgDgBgCQgBgCgDgCIgGgCIgGACgAmyAVQgGgDgCgHQgDgGAAgHQAAgKADgHQADgIAFgFQAEgEAFgCIALgDIAEgBIADAAIAAAIIgDAAIgEAAQgHABgEAEQgFADgDAFQgDAFAAAFQACgDAEgCQAEgCAGgBQAFABAFACQAEADADAEQACAFAAAFQAAAGgCAGQgDAFgFADQgFADgGAAQgHAAgFgDgAmugKQgEACgCAEIAAACIgBACQAAAEACAFQACAEADACQADACAFABQAFgBAEgEQADgEAAgHQAAgGgDgEQgEgEgGAAQgEAAgDACgApnAXIgHgDIACgGIAGACIAIABQAEAAAEgBQADgCACgDQACgDAAgFQAAgFgEgEQgFgEgJAAIgFAAIgEAAIAEgfIAfAAIAAAIIgZAAIgCAQIACAAIADAAIAHABIAHACIAHAHQACAEAAAFQAAAHgDAFQgDAFgFACQgGADgHAAIgJgBgAvKAXQgFgBgCgCIACgHIAGADQAEABAFAAQAFAAAEgCQADgCABgDQACgDgBgCQAAgFgCgCQgCgDgEgBIgIgBIgFAAIAAgHIAFAAIAGgBQAEgBACgDQACgCAAgEQAAgDgBgCIgEgDQgCgCgEAAQgEAAgEACIgFADIgDgHIAIgDQAEgCAFAAQAHAAAEACQAEADACADQACAEAAAEQAAAFgDAEQgDAEgGACIAAAAQAEABADACQAEACACAEIACAHQAAAFgDAFQgDAEgFADQgFACgIAAQgGAAgEgBgA3EAXQAAgBgBAAQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAgA4qAVQgFgDgDgFQgDgGAAgHQAAgIADgFQADgGAFgDQAGgDAHAAQAHAAAFADQAFADADAGQADAFAAAIQAAAIgEAFQgDAGgGADQgFACgGAAQgHAAgFgDgA4mgQQgDADgCAEQgCAEAAAFQAAAFACAEQACAEAEACQADADAEAAQAEAAAEgDQADgCACgEQACgFAAgEIgCgJQgBgEgDgDQgDgDgGAAQgFAAgDADgA5hAXIgEgCIgDgGIAAgHIAAgZIgIAAIAAgHIAIAAIAAgMIAIgCIAAAOIANAAIAAAHIgNAAIAAAZQAAAEACADQABACAEAAIADAAIACgBIAAAHIgDABIgFAAIgFgBgA6YAWIgFgFQgBgDAAgEQAAgIAHgEQAIgFAOAAIAAgBIgBgEQAAgDgDgCQgCgCgFAAIgHABIgGADIgCgGIAHgDIAJgBQAHAAAFADQAEADABAEQACAFAAAFIAAARIAAAGIAAAFIgIAAIAAgGIgBAAQgCADgDACQgEACgFAAQgFAAgEgCgA6LAAIgHACQgDADAAAEQAAAFACACQACACAEAAQAFAAADgDQADgCABgDIAAgCIAAgBIAAgHIgDAAIgHAAgA9HAWIgFgFQgCgDAAgEQAAgIAIgEQAHgFAOAAIAAgBIAAgEQgBgDgCgCQgDgCgFAAIgGABIgGADIgCgGIAHgDIAJgBQAHAAAEADQAEADACAEQABAFAAAFIAAARIAAAGIABAFIgIAAIgBgGIAAAAQgCADgEACQgEACgFAAQgFAAgDgCgA86AAIgIACQgDADAAAEQAAAFACACQADACADAAQAFAAADgDQADgCABgDIAAgCIABgBIAAgHIgEAAIgGAAgA/GAVQgFgDgDgFQgDgGAAgHQAAgHADgGQADgFAGgEQAGgDAIAAIAHABIAFABIgCAHIgEgBIgGgBQgGAAgEACQgEADgCAEQgCAEAAAFQAAAFADAEQACAEAEACQADACAFAAIAHgBIAEgBIACAGIgGACIgIABQgIAAgFgDgEghOAAVQgFgDgDgFQgDgGAAgHQAAgIADgFQADgGAGgDQAFgDAHAAQAHAAAFADQAFADADAGQADAFAAAIQAAAIgDAFQgEAGgFADQgGACgGAAQgGAAgGgDgEghKgAQQgDADgBAEQgCAEAAAFQAAAFACAEQACAEADACQADADAFAAQAEAAADgDQADgCACgEQACgFAAgEIgBgJQgCgEgDgDQgDgDgFAAQgFAAgEADgEAhEAAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAeEAXIAcg4IggAAIAAgIIApAAIAAAGIgcA6gAdfAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAZ6AXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAWVAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgATrAXIAAgRIgeAAIAAgGIAdgpIAKAAIAAApIAJAAIAAAGIgJAAIAAARgATpgbIgDAEIgQAWIAAABIAVAAIAAgWIABgKIgBAAIgCAFgASwAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAPLAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAMGAXIAAgFIAHgHIAOgMQAFgGADgFQACgFAAgFIgBgGIgEgFQgDgBgFAAIgIABIgFAEIgDgGQADgDAFgCQAFgCAFAAQAHAAAFADQAEADACAEQACAEAAAFQAAAGgDAGQgCAFgFAGIgMALIgFAFIAdAAIAAAHgALmAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAI0AXIAAg4IgLAHIgCgHIAOgIIAIAAIAABAgAIBAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAEcAXIAAg4IgMAHIgBgHIAOgIIAHAAIAABAgAkGAXIAcg4IggAAIAAgIIApAAIAAAGIgcA6gAsEAXIAAgRIgeAAIAAgGIAdgpIAJAAIAAApIAJAAIAAAGIgJAAIAAARgAsHgbIgCAEIgQAWIAAABIAVAAIAAgWIAAgKIAAAAIgDAFgAyCAXIAAgFIAHgHIANgMQAGgGACgFQADgFAAgFIgBgGIgEgFQgDgBgFAAIgIABIgGAEIgDgGQAEgDAEgCQAFgCAGAAQAHAAAEADQAFADACAEQACAEAAAFQAAAGgDAGQgDAFgFAGIgMALIgFAFIAdAAIAAAHgA0hAXIAAg4IgLAHIgCgHIAOgIIAIAAIAABAgA3bAXIAAgbIgBgHQgBgDgCgCQgDgCgEAAQgEAAgDADQgDACgCAEIAAACIAAACIAAAcIgJAAIAAgiIAAgHIAAgGIAHAAIABAIIAAAAIAEgFIAFgDQADgBAEAAIAGABIAFADIAFAGQABAEAAAGIAAAcgA5JAXIAAgvIAIAAIAAAvgA7qAXIAAgvIAJAAIAAAvgA8OAXIgSgvIAJAAIAKAaIACAGIACAGIAAAAIACgGIACgGIAKgaIAJAAIgTAvgA9iAXIgVghIgHgLIgGgLIAAAAIAAANIABAOIAAAcIgJAAIAAhCIAKAAIAVAiIAHAKIAGALIgBgNIAAgOIAAgcIAIAAIAABCgA/lAXIAAgvIAIAAIAAAvgEgh6AAXIAAg7IgUAAIAAgHIAyAAIAAAHIgVAAIAAA7gA3EgMQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAgBAAAAQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQABABAAAAQAAABAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQAAAAgBgBgA5JgiIgCgEIACgEQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBgA7qgiIgBgEIACgEQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBABgBAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQgBAAAAAAQAAAAgBgBgA/lgiIgCgEIACgEQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAABQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBg");
	this.shape.setTransform(219.1,4.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.topicNavText, new cjs.Rectangle(0,0,438.3,8.9), null);


(lib.redLine = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD2E27").s().p("EgkoAAbIAAg2MBJRAAAIAAA2g");
	this.shape.setTransform(234.5,2.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.redLine, new cjs.Rectangle(0,0,469,5.5), null);


(lib.plusBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD2E27").s().p("AhhBoIAAjQIDDAAIAADQg");
	this.shape.setTransform(9.8,10.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.plusBtn, new cjs.Rectangle(0,0,19.5,20.9), null);


(lib.plus = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAbIAAgXIgVAAIAAgIIAVAAIAAgWIAJAAIAAAWIAVAAIAAAIIgVAAIAAAXg");
	this.shape.setTransform(2.6,2.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.plus, new cjs.Rectangle(0,0,5.2,5.3), null);


(lib.minus = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgZAFIAAgJIAzAAIAAAJg");
	this.shape.setTransform(2.6,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.minus, new cjs.Rectangle(0,0,5.2,1), null);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgnXAI/IAAx9MBOvAAAIAAR9g");
	this.shape.setTransform(252,57.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.bg, new cjs.Rectangle(0,0,504,115), null);


(lib.darkRedBar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.topicNavText();
	this.instance.parent = this;
	this.instance.setTransform(243,11.7,1,1,0,0,0,219.1,4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 3
	this.instance_1 = new lib.plusBtn();
	this.instance_1.parent = this;
	this.instance_1.setTransform(254.1,10.6,1,1,0,0,0,9.8,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#701D18").s().p("EgkoABqIAAjTMBJRAAAIAADTg");
	this.shape.setTransform(234.5,10.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.darkRedBar, new cjs.Rectangle(0,0,469,21.3), null);


// stage content:
(lib.help_menu_anim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.text = new cjs.Text("Topic Bar", "bold 16px 'Myriad Pro'", "#171717");
	this.text.lineHeight = 22;
	this.text.lineWidth = 73;
	this.text.parent = this;
	this.text.setTransform(24.3,82.5);

	this.text_1 = new cjs.Text("                    - Clicking the ‘Plus’ icon located in the lower left hand portion of the screen will expand the ‘Topic Navigation’ bar. Clicking the links in this bar will allow you to quickly jump to other topics in the same module.\n\nClick the ‘Minus’ icon to again close the Topic Navigation bar.", "16px 'Myriad Pro'", "#171717");
	this.text_1.lineHeight = 21;
	this.text_1.lineWidth = 565;
	this.text_1.parent = this;
	this.text_1.setTransform(24.3,83.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text}]}).wait(189));

	// red line
	this.instance = new lib.redLine();
	this.instance.parent = this;
	this.instance.setTransform(307.1,54.6,1.214,1.214,0,0,0,234.5,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(189));

	// minus
	this.instance_1 = new lib.minus();
	this.instance_1.parent = this;
	this.instance_1.setTransform(34.4,39.4,1.214,1.214,0,0,0,2.6,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(189));

	// plus
	this.instance_2 = new lib.plus();
	this.instance_2.parent = this;
	this.instance_2.setTransform(34.4,39.5,1.214,1.214,0,0,0,2.6,2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},59).wait(99).to({_off:false},0).wait(31));

	// plus button
	this.instance_3 = new lib.plusBtn();
	this.instance_3.parent = this;
	this.instance_3.setTransform(34.2,38.9,1.214,1.214,0,0,0,9.8,10.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(189));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgqtACDIAAkFMBVbAAAIAAEFg");
	mask.setTransform(319.1,39.5);

	// dark red bar
	this.instance_4 = new lib.darkRedBar();
	this.instance_4.parent = this;
	this.instance_4.setTransform(307.1,63.6,1.214,1.214,0,0,0,234.5,10.2);
	this.instance_4._off = true;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(59).to({_off:false},0).to({regY:10.3,y:38.9},30,cjs.Ease.quadOut).wait(69).to({regY:10.2,y:63.6},30).wait(1));

	// background
	this.instance_5 = new lib.bg();
	this.instance_5.parent = this;
	this.instance_5.setTransform(306,99.8,1.214,1.214,0,0,0,252,57.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(59).to({scaleY:1.96,y:112.9},0).wait(130));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(306,138.9,612,180.7);
// library properties:
lib.properties = {
	id: '5DFB8F64559AB042A6D5922563E628E5',
	width: 612,
	height: 225,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['5DFB8F64559AB042A6D5922563E628E5'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;