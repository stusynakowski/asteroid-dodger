var canvas;
var gl;

var myShaderProgram;

var theta;
var stopStartFlag;
var mouseCoordinatesUniform;
var bufferId;
//var BufferIdStars;
var thetaUniform;
var clipX;
var clipY;
var stepX;
var stepY;
var speed;
var difficulty = 1.08;
var lightspeed = 1.00;

//stars
var myShaderPrograms;
var triShaderProgram;
var xmoves;
var xmoveUniforms;
var myPositions; // for stars
var myPositions2; // for triangles
var updateDeltas;
var xtrans;
var ytrans;
var xtranUniforms;
var ytranUniforms;
var bufferIds;
var n = 40;
var count = 0;
var triBuffer;
var x = 0;
var y = 0;
var win = false;
var lose = false;

//triangles
var xmovesTriangle;
var ymovesTriangle;
var xtransTriangle;
var ytransTriangle;
var updateDeltasTriangle;
var xmoveUniforms2;
var xtranUniforms2;
var ytranUniforms2;
var score = 0;
	// look up the elements we want to affect
	var scoreElement =  document.getElementById("score");
 
	// Create text nodes to save some time for the browser.

	var scoreNode;
	// Add those text nodes where they need to go
	//scoreElement.appendChild(scoreNode);

function init() {
	
	//ship
	theta =.0;
	speed=0.022;
	var moving=speed;
	stopStartFlag=0;
	clipX =.0;
	clipY =.0;
	stepX=0.0;
	stepY=0.0;
	
	canvas = document.getElementById("gl-canvas");
	gl= WebGLUtils.setupWebGL(canvas);
	if(!gl){ alert("WebGL is not working");}
	
	gl.viewport(0,0,window.innerWidth,window.innerHeight);
	gl.clearColor(0.0,0.0,0.0,0.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	
	myShaderProgram=initShaders(gl,"vertex-shader","fragment-shader");
	gl.useProgram(myShaderProgram);
	mouseCoordinatesUniform = gl.getUniformLocation( myShaderProgram,"mouseCoordinates");
	gl.uniform2f( mouseCoordinatesUniform,.0,.0);
	

	//stars
	xmoves=[];
    xtrans=[];
    ytrans=[];
    myShaderPrograms=[];
	triShaderProgram=[];
    xmoveUniforms=[];
	ymoveUniforms2=[];
    xtranUniforms=[];
    ytranUniforms=[];
    myPositions=[];
	myPositions2=[];
    updateDeltas=[];
    bufferIds=[];
	triBuffer=[];
    
	
	//triangles
	xmovesTriangle=[];
	ymovesTriangle=[];
	xtransTriangle=[];
    ytransTriangle=[];
	updateDeltasTriangle=[];
	xmoveUniforms2=[];
    xtranUniforms2=[];
    ytranUniforms2=[];
	
    var i;
    
    for (i=0; i<n; i++) {
        xmoves.push(2.0);
        xtrans.push((i-1)*1.0/n);
        ytrans.push(Math.random()*2.0-1.0);
        updateDeltas.push( Math.random()*.01 );
    }
	
	for (i=0; i<n; i++) {
        xmovesTriangle.push(2.0);
		ymovesTriangle.push(0.0);
        xtransTriangle.push((i-1)*1.0/n);
        ytransTriangle.push(Math.random()*2.0-1.0);
        updateDeltasTriangle.push( Math.random()*.01 );
    }
    
   // canvas = document.getElementById("gl-canvas"); // set up the canvas
  //  gl = WebGLUtils.setupWebGL(canvas); // set up the WebGL context
  //  if ( !gl ) alert( "WebGL is not available." );
  //  gl.viewport( 0, 0, 512, 512 ); // set up the viewport
  //  gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // assign a background color
    
    
    // shapes setup...
    
    console.log("here after init");
    setupSquare();

	setupShapes();
	setupTriangles();
    
    
    //setInterval( render,15 ); // handles drawing all shapes
	
	
	
	
thetaUniform = gl.getUniformLocation(myShaderProgram,"theta" );
	//setInterval( render,15 ); // handles drawing all shapes
	render();
}
function setupTriangles() {
    
    var i;
   
    console.log( "Here before setup");
    
    for (i=0; i<n; i++) {
    var basepoint0x=Math.random()*4.0/n; var basepoint0y=Math.random()*2.0/n;
    var basepoint1x=Math.random()*3.0/n; var basepoint1y=1.0/n;
    var basepoint2x=Math.random()*2.0/n; var basepoint2y=Math.random()*2.5/n;
	var basepoint3x=Math.random()*2.0/n; var basepoint3y=Math.random()*2.5/n;
	var basepoint4x=Math.random()*2.0/n; var basepoint4y=Math.random()*2.5/n;
	var basepoint5x=Math.random()*3.0/n; var basepoint5y=Math.random()*2.5/n;
	var basepoint6x=Math.random()*3.0/n; var basepoint6y=Math.random()*2.5/n;
     

        var triangle = [vec2( basepoint0x,basepoint0y),
                        vec2( basepoint1x,basepoint1y),
                        vec2( basepoint2x,basepoint2y),
						vec2( basepoint3x,basepoint3y),
						vec2( basepoint4x,basepoint4y),
						vec2( basepoint5x,basepoint5y),
						vec2( basepoint5x,basepoint6y),];

        triShaderProgram.push( initShaders( gl, "vertex-shader_triangles", "fragment-shader_triangles" ) );
        triBuffer.push( gl.createBuffer() );
        
        gl.useProgram( triShaderProgram[i] );
        ymoveUniforms2.push( gl.getUniformLocation( triShaderProgram[i], "ymove" ) );
        gl.uniform1f( ymoveUniforms2[i], ymovesTriangle[i] );
		xmoveUniforms2.push( gl.getUniformLocation( triShaderProgram[i], "xmove" ) );
        gl.uniform1f( xmoveUniforms2[i], xmovesTriangle[i] );
        xtranUniforms2.push( gl.getUniformLocation( triShaderProgram[i], "xtran" ) );
        gl.uniform1f( xtranUniforms2[i], xtransTriangle[i] );
        ytranUniforms2.push( gl.getUniformLocation( triShaderProgram[i], "ytran" ) );
        gl.uniform1f( ytranUniforms2[i], ytransTriangle[i] );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, triBuffer[i] );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(triangle), gl.STATIC_DRAW );
        
        myPositions2.push( gl.getAttribLocation( triShaderProgram[i], "myPositions" ) );
        gl.vertexAttribPointer( myPositions2[i], 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositions2[i] );
    }
    console.log("all triangles set up");

}

function setupShapes() {
    
    var i;
    var basepoint0x=.0; var basepoint0y=.0;
    var basepoint1x=.0; var basepoint1y=.15/n;
    var basepoint2x=5.0/n; var basepoint2y=.15/n;
	var basepoint3x= 5.0/n;    ; var basepoint3y=.0;
    
    
    console.log( "Here before setup");
    
    for (i=0; i<n; i++) {
        
        var triangle = [vec2( basepoint0x,basepoint0y),
                        vec2( basepoint1x,basepoint1y),
                        vec2( basepoint2x,basepoint2y),
						vec2( basepoint3x,basepoint3y)];
        
        myShaderPrograms.push( initShaders( gl, "vertex-shader_stars", "fragment-shader_stars" ) );
        bufferIds.push( gl.createBuffer() );
        
        gl.useProgram( myShaderPrograms[i] );
        xmoveUniforms.push( gl.getUniformLocation( myShaderPrograms[i], "xmove" ) );
        gl.uniform1f( xmoveUniforms[i], xmoves[i] );
        xtranUniforms.push( gl.getUniformLocation( myShaderPrograms[i], "xtran" ) );
        gl.uniform1f( xtranUniforms[i], xtrans[i] );
        ytranUniforms.push( gl.getUniformLocation( myShaderPrograms[i], "ytran" ) );
        gl.uniform1f( ytranUniforms[i], ytrans[i] );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferIds[i] );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(triangle), gl.STATIC_DRAW );
        
        myPositions.push( gl.getAttribLocation( myShaderPrograms[i], "myPositions" ) );
        gl.vertexAttribPointer( myPositions[i], 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositions[i] );
    }
    console.log("here after setup");

}


function setupSquare() {
	
	var point0 = vec2(-.01,-.01);
	var point1 = vec2(-.01,.01);
	var point2 = vec2(.015,.015);
	var point3 = vec2(.10,0);
	var point4 = vec2(.015,-.015)
	
	var arrayOfpointsForSquare=[point0,point1,point2,point3,point4];
	
	 bufferId =gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
	
	gl.bufferData(gl.ARRAY_BUFFER,flatten(arrayOfpointsForSquare),gl.STATIC_DRAW);
	
	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	
	gl.vertexAttribPointer(myPosition,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(myPosition);
}






function moveSquareUsingKeys(event){
	
	var theKeyCode=event.keyCode; 
	
	if(theKeyCode==68){ //D
    stepX=1.0;}
	else if(theKeyCode==65){ //A
     stepX=-1.0;}
	else if(theKeyCode==87){ // W
     stepY=1.0;
	 theta=-.30;}
	else if(theKeyCode==83){ //S
    stepY=-1.0;
	theta=.30;}
		
}

function StopSquareUsingKeys(event){
	
	var theKeyCode=event.keyCode; 
	
	if(theKeyCode==68){ //D
    stepX=0.0;}
	else if(theKeyCode==65){ //A
     stepX=0.0;}
	else if(theKeyCode==87){ // W
     stepY=0.0; 
	 theta=0.0;}
	else if(theKeyCode==83){ //S
    stepY=0.0;
	theta =0.0;}
		
}



function stop()
{speed=0.0;}
function start()
{speed=.0025;}




function render() {
	
	
	
	gl.clear(gl.COLOR_BUFFER_BIT );
	
	
	
	
	//requestAnimFrame(render);
	

	// STARS
	  //console.log("here before render");
    
    // clear the buffer
    //gl.clear( gl.COLOR_BUFFER_BIT );
    
    var i=0;
    
    for (i=0; i<n; i++) {
        gl.useProgram( myShaderPrograms[i]);
		
        gl.bindBuffer(gl.ARRAY_BUFFER,bufferIds[i]);
		myPositions.push( gl.getAttribLocation( myShaderPrograms[i], "myPositions" ) );
       gl.vertexAttribPointer( myPositions[i], 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositions[i] );
        xmoves[i]-=14*lightspeed*updateDeltas[i];
		gl.uniform1f( xmoveUniforms[i], xmoves[i] );
        if (xmoves[i]<=-2) { // send to the front
			xmoves[i]=1;
            //updateDeltas[i]=-updateDeltas[i];
        }
        
        
        
        
        if (i < (count/10)) {
			//gl.vertexAttribPointer(myPositions[i],2,gl.FLOAT,false,0,0);
			//gl.enableVertexAttribArray(myPositions[i]);
           gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
        }
		 
    }
    count++;
	for (i=0; i<n; i++) {
        gl.useProgram( triShaderProgram[i]);
		
        gl.bindBuffer(gl.ARRAY_BUFFER,triBuffer[i]);
		myPositions2.push( gl.getAttribLocation( triShaderProgram[i], "myPositions" ) );
       gl.vertexAttribPointer( myPositions2[i], 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositions2[i] );
        xmovesTriangle[i]-=difficulty*updateDeltasTriangle[i];
		gl.uniform1f( xmoveUniforms2[i], xmovesTriangle[i] );
        if (xmovesTriangle[i]<=-2) { // send to the front
			xmovesTriangle[i]=1;
            //updateDeltas[i]=-updateDeltas[i];
        }
		
		//collision
		x=xmovesTriangle[i]+xtransTriangle[i];
		y=ytransTriangle[i];
		if((Math.abs(clipX-x)<0.05)&&(Math.abs(clipY-y)<0.05))
		{
			lose = true;
		}
        if (i < (count/10)) {
			//gl.vertexAttribPointer(myPositions[i],2,gl.FLOAT,false,0,0);
			//gl.enableVertexAttribArray(myPositions[i]);
           gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 );
        }
		 
    }
	
	
	
	
	
	
	//gl.clear(gl.COLOR_BUFFER_BIT );
	clipX=clipX+stepX*speed;
	clipY=clipY+stepY*speed;
	gl.useProgram(myShaderProgram);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
	
	//gl.bufferData(gl.ARRAY_BUFFER,buffer
	//gl.vertexAttribPointer(myPosition,2,gl.FLOAT,false,0,0);
	//gl.enableVertexAttribArray(myPosition);
	
	
	gl.uniform1f(thetaUniform,theta);
	gl.uniform2f(mouseCoordinatesUniform,clipX,clipY);
	
	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	gl.vertexAttribPointer(myPosition,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(myPosition);

	
	difficulty+= 0.0004;
	lightspeed+= 0.00005;
	if(score >= 10000){
		win =true;
	}
	gl.drawArrays(gl.TRIANGLE_FAN,0,5);
	if(lose){
		document.getElementById("score").textContent=score + " GAME OVER";
	}
	else if(win){
		document.getElementById("score").textContent="10000 " + " YOU WIN!";
	}
	else{
	score+=1;
    document.getElementById("score").textContent=score;
	//console.log(score);
	requestAnimFrame(render);
	}
	
	
	
}