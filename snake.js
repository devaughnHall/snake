function SNAKE(){//constuct
	var that = this;
	var mainContainer = $("#mainContainer");
	var mainMenu = $("#mainMenu");
	var controller = $("#controller");
	this.pos ={x:0,y:0};
	this.interval = 20; //milliseconds
	this.snakepieces = [];
	this.snakepath = [];
	this.direction = "";
	this.columnNum = 0;
	this.food = {};
	this.paused = true;
	alert("constructing");
}

SNAKE.prototype.start = function(){
	this.snakehead = this.createSnakeNode(0,0);
	mainMenu.hide();
};

SNAKE.prototype.init = function(){//initialize
	if($(window).width > 340){
		mainContainer.css("max-width","260px");
		this.columnNum = 62;
		this.columnNum = Math.round($(window).width/100) * 10;
	}

	//event handlers
	alert("initializing");
	mainContainer.on("click",this.getPos);
	$("#up").on("click",this.moveUp);
	$("#right").on("click",this.moveRight);
	$("#down").on("click",this.moveDown);
	$("#left").on("click",this.moveLeft);
	mainMenu.find("li")[0].on("click",function(){//play
		that.start();
	});
};


SNAKE.prototype.getpos = function(event){
	this.pos.x = event.clientX;
	this.pos.y = event.clientY;
};

SNAKE.prototype.moveUp = function(event){
	this.direction = "up";
	this.snakepath.push([this.snakepieces[0],{x:0,y:1}]); // make turn point at head of snake [node,direction]
};

SNAKE.prototype.moveRight = function(event){
	this.direction = {x:1,y:0}; //"right";
	this.snakepath.push([this.snakepieces[0],this.direction]); // make turn point at head of snake [node,direction]
};

SNAKE.prototype.moveDown = function(event){
	this.direction = {x:1,y:0};//"down";
	this.snakepath.push([this.snakepieces[0],{x:0,y:-1}]); // make turn point at head of snake [node,direction]
};

SNAKE.prototype.moveLeft = function(event){
	this.direction = "left";
	this.snakepath.push([this.snakepieces[0],{x:-1,y:0}]); // make turn point at head of snake [node,direction]
};

SNAKE.prototype.move = function(x,y,direction){
	switch (direction){
		case {x:1,y:0}:  //right
			var v = String(x * 10) + "px";
			var css = {"margin-left":v};
		break;
		
		case {x:-1,y:0}:  //left
			var v = String(x * 10) + "px";
			var css = {"margin-left":v};
		break;
		
		case {x:0,y:1}:  //down
			var v = String(y * 10) + "px";
			var css = {"margin-top":v};
		break;
		
		case {x:0,y:-1}:  //up
			var v = String(x * 10) + "px";
			var css = {"margin-top":v};
		break;
		default:
		break;
	};
};


SNAKE.prototype.collisionDetector = function(a,b,func){
	if(a.x == b.x && a.y == b.y){
		func();
	}

};

SNAKE.prototype.run = function(){
	if(!this.paused){//if not paused
		for(var i=0;i<this.snakepieces.length;i++){
			collisionDetector(this.snakepieces[i],this.food,function(){
				this.eat();
			});
		}
		this.moveSnake();
	}
};

SNAKE.prototype.createSnakeNode = function(x,y){
	var node = document.createElement("div");
	node.classList.add("node");//set css class 'node'
	if(x && y){
		node.x = x;
		node.y = y;
	}
	else{
		node.x = this.snakepieces[-1].x; //copy position of last node
		node.y = this.snakepieces[-1].y; 
	}
	this.snakepieces.push(node);
	return node;
};

SNAKE.prototype.placeRandomFood = function(){
	this.food.x =  Math.floor(Math.random(this.columnNum));
	thos.food.y =  Math.floor(Math.random(this.rowNum));
};

SNAKE.prototype.eat = function(){
	//grow snake
	// add points
	this.placeRandomFood();

};

SNAKE.prototype.moveSnake = function(direction){
	//add snake nodes with snake path
	for(var i=0;i<this.snakepieces.length;i++){
		var node = this.snakepieces[i];
		var path = this.snakepath[i];
		if(node.x == path[0].x && node.y == path[0].y){//make turn at point
			node.x += path[1].x;
			node.y += path[1].y;
		}
		else{//move in current direction
			node.x += this.direction.x;
			node.y += this.direction.y;
		}
		
	}
	
};
try{
var snake = new SNAKE();
snake.init();
}
catch(e){alert(e);}


