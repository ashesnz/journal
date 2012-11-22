var longMonthNames = [,"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var shortMonthNames = [,"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDateForDisplay( date ) {
    return date.getDate() + " " + shortMonthNames[date.getMonth() + 1 ] + " " + date.getFullYear();
}

function koSum(self, arrayName, fieldName ) {
    var total = 0;
    ko.utils.arrayForEach(self[arrayName](), function(item) {
                          total += Number(item[fieldName]());
                          });
    return total;
}

function fmt( nbr, precision ) {
    if ( nbr == 0  || nbr == "" ) {
        return "";
    }
    n = nbr.toFixed(precision)
    //The dbl is here because normally 0 will carve out most, but it may format to 0 on rare occasions.
    if ( n == 0  ) {
        return "";
    }
    return n;
}
function fmt_e( nbr ) {
    return fmt( nbr, 3 );
}
function fmt_u( nbr ) {
    return fmt( nbr, 1 );
}
function fmt_p( nbr ) {
    return fmt( nbr, 0 );
}

function handleAjaxError(e, xhr, settings, exception) {
    if ( xhr.status != 0 ) {
        msg = "An enexpected error has occured.\n" +
        "Technical details\n" +
        "status code: " + xhr.status + "\n" +
        "exception: " + exception;
        alert( msg );
    }
    
};

var one_day=1000*60*60*24;
function DayDiff( date1, date2) {
    return Number( Math.floor( ( date1 - date2 ) / one_day ) );
}
function WeekDiff( date1, date2) {
    return Number( Math.floor( ( date1 - date2 ) / one_day / 7 ) );
}
