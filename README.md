# JS-Calendar
A simple javascript calendar.

This is a simple popup calendar library.  I have only tested this in IE11/Edge so your experience my vary depending on the browser.  This should work in lower versions of IE but a polyfill for addEventListener and bind will be required.

Usage Example:

--The element--
<code>
  <input id="calendar" type="text" />
</code>

Just a calendar
<code>
  var calendar = new calendar({ elm: document.getElementById('calendar') });
</code>

A calendar with time
<code>
  var calendar = new calendar({ elm: document.getElementById('calendar'), time: true });
</code>

Once a selection is made the 'change' event is fired.  You can feed the value directly into a new Javascript Date Object and use it as needed.

<code>
  document.getElementById('calendar').addEventListener('change', function(event) {
    var date = new Date(event.target.value);
  }, false);
</code>
