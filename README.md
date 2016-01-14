# cloud-door-lock

Design features:
  Name of each icon and its function
  p tag with white background

1/14/16:
	Problem with icons not changing when clicked has been fixed!

	The lock and light online switch statuses finally work. The webpage shows the connection
	status of the Photon and updates automatically once the Photon is connected or not.

	I debugged the code by changing the if else statements that are used to determine the value
	of the variable result to use ONLY the 'json.result' instead of a variable attached to it.

	I also changed from the shorthand 'getJSON' to .ajax() to do a HTTP GET of the isOn and isLocked
	cloud variables. To find failure: use error: function() {} callback.

	NEED TO DO: 
		Need to make the 'waiting' animation work whenever the refresh button is pressed.