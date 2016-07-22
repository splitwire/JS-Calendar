# JS-Calendar
A simple javascript calendar.

This is a simple popup calendar library.  I have only tested this in IE11/Edge so your experience my vary depending on the browser.  This should work in lower versions of IE but a polyfill for addEventListener and bind will be required.

## Usage:

### The element
    <input id="calendar" type="text" />

### Examples
Just a calendar<br>
    var calendar = new calendar({ elm: document.getElementById('calendar') });


A calendar with time<br>
    var calendar = new calendar({ elm: document.getElementById('calendar'), time: true });


Once a selection is made the 'change' event is fired.  You can feed the value directly into a new Javascript Date Object and use it as needed.<br>

    document.getElementById('calendar').addEventListener('change', function(event) {
      var date = new Date(event.target.value);
    }, false);

