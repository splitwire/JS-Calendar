function calendar( opts ) {

    if (typeof opts == 'undefined') { opts = {}; }
    
    this.width = opts.width || 250;

    this.date = new Date();

    this._calendar;

    if (opts.elm) { this._elm = opts.elm } else { throw 'elm not provided' };

    this._time = opts.time || false;

    this.monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];


    this.makeCalendar = function() {

        var cal = document.createElement('div');
        cal.className = 'popup-calendar';
        cal.style.width = this.width + 'px';


        var leftArrow = document.createElement('img');
        leftArrow.setAttribute('src', 'images/left-arrow.png');
        leftArrow.style.left = '5px';
        leftArrow.addEventListener('click', (function() {
            this.goBack();
        }).bind(this), false);

        var rightArrow = document.createElement('img');
        rightArrow.setAttribute('src', 'images/right-arrow.png');
        rightArrow.style.right = '5px';
        rightArrow.addEventListener('click', (function() {
            this.goForward();
        }).bind(this), false);

        cal.appendChild(leftArrow);
        cal.appendChild(rightArrow);


        this._title = document.createElement('div');
        this._title.className = 'popup-calendar-title';
        this._title.appendChild(document.createTextNode(''));
        cal.appendChild(this._title);


        this._calendar = cal;



        this._table = document.createElement('table');
        this._table.style.width = Math.floor(this.width * .9) + 'px';


        var header = document.createElement('thead');
        var hRow = document.createElement('tr');

        var days = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];
        for (var i = 0; i < days.length; i++) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(days[i]));
            hRow.appendChild(th);
        }

        header.appendChild(hRow);
        this._table.appendChild(header);

        this._body = document.createElement('tbody');
        this._table.appendChild(this._body);
        this._calendar.appendChild(this._table);


        this.parseMonth((function(resp) {
            document.body.appendChild(this._calendar);
        }).bind(this));


        var h = this._elm.offsetHeight;
        var w = this._elm.offsetWidth;


        var x = (this._elm.offsetLeft - this._elm.scrollLeft + this._elm.clientLeft) - (Math.floor(w / 2));
        var y = (this._elm.offsetTop - this._elm.scrollTop + this._elm.clientTop) + h + 5;



        if (this._time) { this.makeTime(); }


        this.move(x, y);

        this._elm.addEventListener('click', (function() { this.show(); }).bind(this), false);

    };


    this.makeTime = function() {

        this._timer = document.createElement('div');
        this._timer.className = 'popup-calendar-time';


        var h = document.createElement('div');
        h.className = 'popup-calendar-labels';

        var m = document.createElement('div');
        m.className = 'popup-calendar-labels';

        var s = document.createElement('div');
        s.className = 'popup-calendar-labels';

        h.appendChild(document.createTextNode('hours'));
        m.appendChild(document.createTextNode('min'));
        s.appendChild(document.createTextNode('sec'));



        this._hours = document.createTextNode('00');
        var hoursContainer = document.createElement('div');
        hoursContainer.appendChild(h);
        hoursContainer.appendChild(this._hours);


        var hoursArrows = document.createElement('div');
        hoursArrows.className = 'popup-calendar-spinner';

        var hoursUp = document.createElement('img');
        hoursUp.setAttribute('src', 'images/up-arrow.png');
        hoursArrows.appendChild(hoursUp);

        var hoursDown = document.createElement('img');
        hoursDown.setAttribute('src', 'images/down-arrow.png');
        hoursArrows.appendChild(hoursDown);

        hoursUp.addEventListener('mousedown', (function() {

            var value = parseInt(this._hours.textContent) + 1;
            value = (value >= 24) ? '00' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._hours.textContent = value;

        }).bind(this), false);


        hoursDown.addEventListener('mousedown', (function() {

            var value = parseInt(this._hours.textContent) - 1;
            value = (value < 0) ? '23' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._hours.textContent = value;

        }).bind(this), false);

        hoursContainer.appendChild(hoursArrows);




        this._minutes = document.createTextNode('00');
        var minutesContainer = document.createElement('div');
        minutesContainer.appendChild(m);
        minutesContainer.appendChild(this._minutes);

        var minutesArrows = document.createElement('div');
        minutesArrows.className = 'popup-calendar-spinner';

        var minutesUp = document.createElement('img');
        minutesUp.setAttribute('src', 'images/up-arrow.png');
        minutesArrows.appendChild(minutesUp);

        var minutesDown = document.createElement('img');
        minutesDown.setAttribute('src', 'images/down-arrow.png');
        minutesArrows.appendChild(minutesDown);

        minutesUp.addEventListener('mousedown', (function() {

            var value = parseInt(this._minutes.textContent) + 1;
            value = (value >= 60) ? '00' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._minutes.textContent = value;

        }).bind(this), false);


        minutesDown.addEventListener('mousedown', (function() {

            var value = parseInt(this._minutes.textContent) - 1;
            value = (value < 0) ? '59' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._minutes.textContent = value;

        }).bind(this), false);


        minutesContainer.appendChild(minutesArrows);



        this._seconds = document.createTextNode('00')
        var secondsContainer = document.createElement('div');
        secondsContainer.appendChild(s);
        secondsContainer.appendChild(this._seconds);

        var secondsArrows = document.createElement('div');
        secondsArrows.className = 'popup-calendar-spinner';

        var secondsUp = document.createElement('img');
        secondsUp.setAttribute('src', 'images/up-arrow.png');
        secondsArrows.appendChild(secondsUp);

        var secondsDown = document.createElement('img');
        secondsDown.setAttribute('src', 'images/down-arrow.png');
        secondsArrows.appendChild(secondsDown);

        secondsUp.addEventListener('mousedown', (function() {

            var value = parseInt(this._seconds.textContent) + 1;
            value = (value >= 60) ? '00' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._seconds.textContent = value;

        }).bind(this), false);

        secondsDown.addEventListener('mousedown', (function() {

            var value = parseInt(this._seconds.textContent) - 1;
            value = (value < 0) ? '59' : String(value);
            if (value.length == 1) { value = '0' + value; }
            this._seconds.textContent = value;

        }).bind(this), false);

        secondsContainer.appendChild(secondsArrows);



        this._timer.appendChild(hoursContainer);
        this._timer.appendChild(minutesContainer);
        this._timer.appendChild(secondsContainer);



        this._calendar.appendChild(document.createElement('hr'));
        this._calendar.appendChild(document.createTextNode('Time'));

        this._calendar.appendChild(this._timer);


    }
       


    this.parseMonth = function(callback) {

        while (this._body.firstChild) {

            while (this._body.firstChild.firstChild) {

                this._body.firstChild.firstChild.removeEventListener('click', this.callback);
                this._body.firstChild.removeChild(this._body.firstChild.firstChild);

            }

            this._body.removeChild(this._body.firstChild);
        }

        this._title.innerHTML = this.monthList[this.date.getMonth()] + ' ' + this.date.getFullYear();


        var numOfDays = new Date(this.date.getFullYear(), (this.date.getMonth() + 1), 0).getDate();

        var dayArray = [];
        var dayCount = 1;
        var firstDay = new Date(this.date.getFullYear(), (this.date.getMonth()), 1).getDay();

        for (var i = 0; i < numOfDays + firstDay; i++) {

            var day = document.createElement('td');
            if (i >= firstDay) {
                day.appendChild(document.createTextNode(dayCount));
                day.className = 'popup-calendar-day';

                day.addEventListener('click', (function(e) { this.callback(e); }).bind(this), false);

                dayCount++;
            }

            dayArray.push(day);

        }




        for (var d = 0; d < dayArray.length; d += 7) {

            var week = document.createElement('tr');

            for (var wday = d; wday < d + 7; wday++) {

                if (typeof dayArray[wday] == 'undefined') {
                    week.appendChild(document.createElement('td'));
                } else {
                    week.appendChild(dayArray[wday]);
                }
            }

            this._body.appendChild(week);

        }

        callback && callback(true);

    };


    this.parseDate = function() {

        //WORK ON THIS


        var month = this.date.getMonth() + 1;
        var day = this.date.getDate();
        var year = this.date.getFullYear();

        if (this._time) {

            var hours = this._hours.textContent;
            var minutes = this._minutes.textContent;
            var seconds = this._seconds.textContent;

            this.date.setHours(hours, minutes, seconds)

            return String(month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds);

        } else {

            return String(month + '/' + day + '/' + year);

        }

    };




    this.move = function(x, y) {

        this._calendar.style.top = y + 'px';
        this._calendar.style.left = x + 'px';

    };


    this.goBack = function() {

        var month = this.date.getMonth() - 1;
        if (month < 0) {
            month = 11;
            this.date.setFullYear(this.date.getFullYear() - 1); 
        }

        this.date.setMonth(month);

        this.parseMonth();

    };

    this.goForward = function() {

        var month = this.date.getMonth() + 1
        if (month > 11) {
            month = 0;
            this.date.setFullYear(this.date.getFullYear() + 1);
        }

        this.date.setMonth(month);

        this.parseMonth();

    };


    this.hide = function() {
        this._calendar.style.display = 'none';
        document.removeEventListener('click', (function(e) { this.determineHide(e); }).bind(this), false);
        this.display = false;
    };

    this.show = function() {
        document.addEventListener('click', (function(e) { this.determineHide(e); }).bind(this), false);
        this._calendar.style.display = 'block';
        this.display = true;
    };


    this.callback = function(e) {

        this.date.setDate(e.target.textContent);

        this._elm.value = this.parseDate();
        this.hide();


        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            this._elm.dispatchEvent(evt);
        } else {
            element.fireEvent("change");
        }


    };


    this.determineHide = function(e) {

        if (this.display) {
            
            var w = this._calendar.offsetWidth;
            var h = this._calendar.offsetHeight + 20; //20 is to account for padding

            var y = parseInt(this._elm.offsetTop - this._elm.scrollTop + this._elm.clientTop);
            var x = parseInt(this._calendar.style.left.split('px')[0]);

            if (e.clientX < x || e.clientX > (x + w) || e.clientY < y || e.clientY > (y + h)) { this.hide(); }

        }

    };


    this.makeCalendar();

}