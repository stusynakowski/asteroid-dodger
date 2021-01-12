Computer Graphics Project (2017) 
Special Thanks to Christopher Kelly for maintaining this work

The program should be a green polygon with a blue background. 
Due to my lack of dexterity, when it comes to programming. I snagged. 
The rotating square as a template to be modified. 

I first added another vertex to the system. This vertex was shaded in such a way
that it actually creates a 7 vertex polygon. 

I also wanted change the rotation button to one that starts and stops. this was
implemented by merely adding another button in the html script, and adding another
function to the program that sets out rotating flag to be one, and one to be zero

To introduce a speed to the program. I created a variable. speed. 
This can be incremented by 0.0025 with another button, I created. You may also 
decrease the speed. the speed can never be less than 0, thus i put an if statement
that makes sure speed can never be greater an zero. 

the function that keeps updating theframes is the move mouse key, also the jump 
function. 

I also set a stop and stop button that changes the speed to zero and the inital speed
value. 

also the speed is initialized is set to 0 in the y component. and +.0025 in the
x component.

w,s,a,d also change the direction of the polygon, by merely switching on and off
the speed, when the frames update in the render function this is known as stepX
stepY, example: when stepX is 1 the speed will increase in the x direction
-1 increase in the negative x direction, while stepY is 0.  
