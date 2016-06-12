# cloud-door-lock

A control panel that connects to the Particle Photon Microcontroller. Locks/unlocks a servo connected to a door, also controls a relay connected to a light bulb.

Room automation is implemented using IFTTT and a particle function, highlighted in room-automation.ino and the main javascript file.

Design features:
  Name of each icon and its function
  p tag with white background

======== UPDATES ========

1/14/16 (1:00am):
	Problem with icons not changing when clicked has been fixed!

	The lock and light online switch statuses finally work. The webpage shows the connection
	status of the Photon and updates automatically once the Photon is connected or not.

	I debugged the code by changing the if else statements that are used to determine the value
	of the variable result to use ONLY the 'json.result' instead of a variable attached to it.

	I also changed from the shorthand 'getJSON' to .ajax() to do a HTTP GET of the isOn and isLocked
	cloud variables. To find failure: use error: function() {} callback.

1/14/16 (9:00pm)
	Pressing the refresh button will trigger the animation and the 'waiting' animation. 
	The issue with this revision is whenever I use the setTimeout function for the refresh
	function, the 'waiting' text animation runs alongside the connection status.

	Idea: The only thing I want to refresh 

	Problems: Once icons are pressed, waiting animation runs. I want the waiting animation
	to run only on press of the refresh icon and initial page load.

	NEED TO DO: 
		Need to make the 'waiting' animation work whenever the refresh button is pressed.