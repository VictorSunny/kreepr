import { DateTime } from "luxon"

const dateFormatter = (dateString) => {

    ////    RETURNS CLASS THAT FOMATS ISO STRING INTO READABLE DATE FORMAT
    // day-month-year

    const formattedDate = DateTime.fromISO(dateString).toFormat('dd-MM-yyyy')

    return formattedDate
}

export default dateFormatter