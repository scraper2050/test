import moment from 'moment';

export const formatDate = (date: Date) => moment(date).format('MM/DD/YYYY');

export const formatTime = (time: Date) => moment(time).format('hh:mm a');

export const formatToMilitaryTime = (time: Date) => moment(time).format('HH:mm:ss');

export const convertMilitaryTime = (time: string) => {
    
    let timeAr = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (timeAr.length > 1) { 
        timeAr = timeAr.slice(1); // Remove full string match value.
        timeAr[3] = +timeAr[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        let hoursAsInt = parseInt(timeAr[0]);
        let hours = hoursAsInt % 12 || 12 ;
        timeAr[0] = hours.toString() // Adjust hours
    }
    return timeAr.join(''); 
}