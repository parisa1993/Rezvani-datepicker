import moment from 'jalali-moment';


// Calendar months names and shortnames
export const EN_MONTHS_SHORT = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const EN_MONTHS = ['','January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber'];
export const FA_MONTHS_SHORT = ['','فرو','خرد','ارد','تیر','مرد','شهر','مهر','آبان','آذر','دی','بهمن','اسفند'];
export const FA_MONTHS = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

// Week days names and shortnames
export const EN_WEEK_DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export const FA_WEEK_DAYS_SHORT = ["ش","ی","د","س","چ","پ","ج"];
export const EN_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const FA_WEEK_DAYS = ['شنبه' ,'یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پینج شنبه','جمعه'];



// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

export const THIS_YEAR = (lang) => {
    let format = ( lang.toLowerCase() === 'fa' ) ? 'jYYYY' : 'YYYY' ;
    return parseInt(moment().locale(lang.toLowerCase()).format(format));
}

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = (lang) => {
    let format = ( lang.toLowerCase() === 'fa' ) ? 'jMM' : 'MM' ;
    return parseInt(moment().locale(lang.toLowerCase()).format(format));
}

// today
export const TODAY = (lang) => {
    let format = ( lang.toLowerCase() === 'fa' ) ? 'jDD' : 'DD' ;
    return parseInt(moment().locale(lang.toLowerCase()).format(format));
}

export const CURRENT_DATE = (LANG) => {

    let year = THIS_YEAR(LANG);
    let month = THIS_MONTH(LANG);
    let day = TODAY(LANG)

    return {
        dateString: year+"-"+month+'-'+day ,
        year: year,
        month: month,
        day: day
    }
}

export const convertObjectDateToString = (dateString) => {
    return dateString.year +'-'+ zeroPad(dateString.month , 2) +'-'+ zeroPad(dateString.day , 2)
}

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}

// (int) Number days in a month for a given year from 28 - 31
export const daysInMonth = (year = THIS_YEAR , month = THIS_MONTH , lang) => {
    let date = year.toString() + "-" + month.toString();
    let format = (lang.toLowerCase() === 'fa') ? 'jYYYY-jMM' :'YYYY-MM';
    let daysInMonth = moment(date,format).locale(lang.toLowerCase()).daysInMonth();
    return daysInMonth;
}

// (int) First day of the month for a given year from 0 - 6
// 0 => Sunday, جمعه
// 6 => Saturday شنبه, 
export const getMonthFirstDay = (year = THIS_YEAR ,month = THIS_MONTH, lang) => {
    let format = (lang.toLowerCase() === 'fa') ? 'jYYYY-jMM-jDD' :'YYYY-MM-DD' ;
    let firstDay = moment(`${year}-${zeroPad(month, 2)}-01` , format).locale(lang.toLowerCase()).day();
    // calculate day of the week persian
    if ( lang.toLowerCase() === 'fa' ) {
        firstDay++;
        if (firstDay > 6) {
            firstDay = 0;
        }
    }

    return ( lang.toLowerCase() === 'fa' ) ? firstDay: firstDay;
}

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (year,month, lang) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;
    return { month: nextMonth, year: nextMonthYear };
}

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth =  (year,month) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;
    return { month: prevMonth, year: prevMonthYear };
}

// this function return [31,30,29] if offset = 3 to show last days of prev month
export const daysInOffsetPrevMonth = (offset, year, month, lang) => {

    let listOfDays = [];
    let days = daysInMonth(year,month,lang);
    for (let i=0 ; i < offset ; i++) {
        listOfDays.push(days);
        days--;
    }
    return changeArryaToArrayObj(listOfDays.reverse(), year, month , ' prev-days ');
}

// this function return [1,2,3] if offset = 3 to show last days of next month
export const daysInOffsetNextMonth = (offset, total,year,month) => {
    let maxLenght = 42;
    let moved  = offset + total; // 31 for example
    let remainCount = maxLenght - moved; // 11 for expample
    let list = [];

    for ( let i = 0 ; i <= maxLenght ; i++ ) {
        if ( i > moved ) {
            list.push(remainCount);
            remainCount--;
        }
    }
    return changeArryaToArrayObj( list.reverse(), year, month , ' next-days ');
}

export const convertDateStringToFun = (dateObj, lang)  => {
    let format = (lang.toLowerCase() === 'fa') ? 'jYYYY-jMM-jDD' :'YYYY-MM-DD' ;
    let date = dateObj.year.toString() + "-" + dateObj.month.toString() + "-" + 0;
    return moment(date,format).locale(lang.toLowerCase())._d;
}

export const isEmptyObj = (obj) => {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export default function Calender(year,month,LANG) {

    // console.log('calendar = ', year,month,LANG);
    
    let DAY = TODAY(LANG);    
    let TODAY_DATE = THIS_YEAR(LANG)+"-"+THIS_MONTH(LANG)+'-'+ DAY;
    
    let YEAR = null;
    let MONTH = null;

    let PREV_YEAR = null;
    let NEXT_YEAR = null;

    let PREV_MONTH = null;
    let NEXT_MONTH = null;

    if ( (year === undefined || null || '') && (month === undefined || null || '') ) {
        YEAR = THIS_YEAR(LANG);
        MONTH = THIS_MONTH(LANG);
    } else {
        YEAR = parseInt(year);
        MONTH = parseInt(month);
    }


    let Prev_data = getPreviousMonth(YEAR,MONTH,LANG);
        PREV_MONTH = Prev_data.month;
        PREV_YEAR = Prev_data.year;

    let Next_data = getNextMonth(YEAR,MONTH,LANG);
        NEXT_MONTH = Next_data.month;
        NEXT_YEAR = Next_data.year;

    let FIRST_DAY_WEEK = getMonthFirstDay(YEAR,MONTH,LANG);
    let TOTAL_DAYS_IN_MONTH = daysInMonth(YEAR,MONTH,LANG);

    let PREV_OFFSET = daysInOffsetPrevMonth(FIRST_DAY_WEEK, PREV_YEAR,PREV_MONTH,LANG);
    let NEXT_OFFSET = daysInOffsetNextMonth(FIRST_DAY_WEEK,TOTAL_DAYS_IN_MONTH,NEXT_YEAR,NEXT_MONTH);

    let CURRENT_MONTH_DAYS = [];
    for ( let z=1; z <= TOTAL_DAYS_IN_MONTH ; z++ ) {
        CURRENT_MONTH_DAYS.push(z);
    }

    CURRENT_MONTH_DAYS = changeArryaToArrayObj(CURRENT_MONTH_DAYS,YEAR,MONTH , 'current-days');

    let all_days = (PREV_OFFSET.concat(CURRENT_MONTH_DAYS)).concat(NEXT_OFFSET);

    for ( let c=0; c < all_days.length ; c++ ) {
        
       if (all_days[c].date === TODAY_DATE) {
           all_days[c].today = true;
       };

    }

    return {
        all_days: all_days,
        todayString:TODAY_DATE,
        currentYear: YEAR,
        currentMonth: MONTH,
        currentDay: DAY,
        dayOfTheWeek: FIRST_DAY_WEEK,
    };
}

const changeArryaToArrayObj = (array,year, month, extera_text) => {
    let obj = {};
    let finalArray = [];
    for ( let a=0; a < array.length ;a++ ){
        obj = {};
        obj.info = extera_text;
        obj.year = year;
        obj.month = month;
        obj.day = array[a];
        obj.date = year + "-" + month + "-" + zeroPad(array[a] , 2);
        finalArray.push(obj); 
    }

    return finalArray;
}