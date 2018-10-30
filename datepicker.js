let datepicker = (() => {
    'use strict'
    const month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const td = document.getElementById('js__days');
    const frag = document.createDocumentFragment();
    let d = new Date();
    let m = d.getMonth();
    let y = d.getFullYear()
    
    const caledar = () => {
        let short_name = month[m];
        let days = __getDayOfTheMonth(m, y);
        
        for (let i = 1; i <= days; i++) {
            const td = document.createElement('td');
            td.innerHTML = i;
            frag.appendChild(td);
        }

        td.appendChild(frag);
        
        console.log(__getDayOfTheMonth(m, y));
        console.log(short_name);
    }

    const __getDayOfTheMonth = (m, y) => {
        return new Date(y, m + 1, 0).getDate();
    }

    return {
        caledar: caledar
    }

})();
datepicker.caledar();