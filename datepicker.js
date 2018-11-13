let datepicker = (() => {
    'use strict'
    const arr_month     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const arr_days      = ["M","T","W","T","F","S","S"];
    const thead         = document.getElementById('js__day-of-week');
    const tbody         = document.getElementById('js__days');
    const p_name        = document.getElementById('js__month-year');
    const prev          = document.getElementById('js__prev');
    const next          = document.getElementById('js__next');
    const next_year     = document.getElementById('js__next-year');
    const prev_year     = document.getElementById('js__prev-year');
    const date          = document.getElementById('js__task-date');
    const frag          = document.createDocumentFragment();
    let d = new Date();
    let m = d.getMonth();
    let y = d.getFullYear();

    const __prev = () => {
        if ( m > 0 ) {
            m = m-1;
            __caledar(m);
        }
    }

    const __next = () => {
        if ( m < 11 ) {
            m = m+1;
            __caledar(m);
        }
    }

    const __nextYear = () => {
            y = y+1;
            __caledar(m);
    }

    const __prevYear = () => {
        y = y-1;
        __caledar(m);
    }

    const __removeDuplicate = () => {
        const thirty = document.querySelectorAll('#day-30');
        const thirty_one = document.querySelectorAll('#day-31');
        const twenty_eight = document.querySelectorAll('#day-28');
        const twenty_nine = document.querySelectorAll('#day-29');
        if(prev || next || next_year || prev_year) {
            if (thirty.length === 2) {
                [...thirty].find((thirty, key) => key === 1).remove();   
            }
        }
        if(prev || next || next_year || prev_year) {
            if (thirty_one.length === 2) {
                [...thirty_one].find((thirty_one, key) => key === 1).remove();   
           }
        }
        if(prev || next || next_year || prev_year) {
            if (twenty_eight.length === 2) {
                [...twenty_eight].find((twenty_eight, key) => key === 1).remove();   
           }
        }
        if(prev || next || next_year || prev_year) {
            if (twenty_nine.length === 2) {
                [...twenty_nine].find((twenty_nine, key) => key === 1).remove();   
           }
        }
    }

    const __daysOfTheWeek = () => {
        const tr = document.createElement("TR");
        thead.appendChild(tr);
        for ( let i = 0; i < 7; i++ ) {
            const td = document.createElement("TD");
            td.innerHTML = arr_days[i];
            td.setAttribute('class', 'day-of-week')
            frag.appendChild(td);
        }
        tr.appendChild(frag);
    }

    const __caledar = (month) => {
        let short_name = arr_month[month];
        let f_days = new Date(y, m, 1).getDay();
        let l_days = new Date(y, m+1, 0).getDate();
        let offSet = f_days;
        let dayCount = 1;

        if ( month == null ) {
            p_name.innerHTML = arr_month[m] + " " + y;
        } else {
            p_name.innerHTML = short_name + " " + y;
        }
        tbody.innerHTML = '';
        for ( let j = 0; j < 6; j++ ) {
            const tr_w = document.createElement("TR");
            tbody.appendChild(tr_w);

            for ( let rw = 0; rw < 7; rw++ ) {
                if ( offSet === 1 ) {
                    const td_rw = document.createElement("TD");
                    const btn = document.createElement("BUTTON");
                    btn.setAttribute('class', 'day-of-month');
                    tr_w.appendChild(td_rw);
                    btn.innerHTML = dayCount;
                    btn.setAttribute('id', 'day-' + dayCount );
                    btn.addEventListener('click', (e) => {
                        const b = document.getElementById(e.target.id).innerText;
                        if ( month == null ) {
                            date.innerHTML = b + " " + arr_month[m] + " " + y;
                        } else {
                            date.innerHTML = b + " " + short_name + " " + y;
                        }
                    });
                    td_rw.appendChild(btn);

                    if ( dayCount == l_days ) {
                        break;
                    }
                    dayCount++;
                } else if ( offSet === 0 ) {
                    const td_rw = document.createElement("TD");
                    const btn = document.createElement("BUTTON");

                    btn.setAttribute('class', 'day-of-month');
                    tr_w.appendChild(td_rw);
                    btn.innerHTML = dayCount;
                    btn.setAttribute('id', 'day-' + dayCount );
                    btn.addEventListener('click', (e) => {
                        const b = document.getElementById(e.target.id).innerText;
                        if ( month == null ) {
                            date.innerHTML = b + " " + arr_month[m] + " " + y;
                        } else {
                            date.innerHTML = b + " " + short_name + " " + y;
                        }
                    });
                    td_rw.appendChild(btn);
                    if ( dayCount == l_days ) {
                        break;
                    }
                    dayCount++;
                } else {
                    const td_empty = document.createElement("TD");
                    tr_w.appendChild(td_empty);
                    offSet--;
                }
            }
        }
        prev.addEventListener('click', __prev);
        next.addEventListener('click', __next);
        next_year.addEventListener('click', __nextYear);
        prev_year.addEventListener('click', __prevYear);
        __removeDuplicate();
    }

    const bindEvents = (month) => {
        __daysOfTheWeek();
        __caledar(month);
    }

    return {
        caledar: __caledar,
        bindEvents: bindEvents
    }

})();
datepicker.bindEvents();