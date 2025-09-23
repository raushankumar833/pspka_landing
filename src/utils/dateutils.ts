import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
    subDays,
  } from 'date-fns';


  interface RangeType {
    label: any;
    value: any;
    placement: any;
    closeOverlay?: any;
  }

  export const predefinedRanges: RangeType[] = [
    {
      label: 'Today',
      value: [new Date(), new Date()],
      placement: 'left',
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: 'left',
    },

    {
      label: 'Last 7 days',
      value: [subDays(new Date(), 6), new Date()],
      placement: 'left',
    },
    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()],
      placement: 'left',
    },
    {
      label: 'This month',
      value: [startOfMonth(new Date()), new Date()],
      placement: 'left',
    },
    {
      label: 'Last month',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
      placement: 'left',
    },
    {
      label: 'This week',
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left',
    },
    {
      label: 'Last week',
      closeOverlay: false,
      value: (value: any) => {
        const [start = new Date()] = value || [];
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), -7),
        ];
      },
      placement: 'left',
    },
  ];



  export const rawDate = () => {
    const date = new Date();
    return date;
  };
  
  export const myDate = (dateObj: string | number | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateObj).toLocaleDateString('en-US', options);
  };
  
  export const myDate2 = (dateObj: string | number | Date): string => {
    const options2: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateObj)
      .toLocaleDateString('en-US', options2)
      .replace('/', '_')
      .replace(' ', '_')
      .replace(',', '_');
  };
  
  export const ddmmyyyy = (dateObj: string | number | Date): string => {
    const d = new Date(dateObj);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  };
  
  export const isDateWithinDays = (inputDate: string, differenceDay = 10): boolean => {
    // CONVERT INPUTDATE TO A JAVASCRIPT DATE OBJECT
    const providedDate = new Date(inputDate);
  
    // GET THE CURRENT DATE
    const currentDate = new Date();
  
    // CALCULATE THE DIFFERENCE IN MILLISECONDS
    const differenceInMilliseconds = currentDate.getTime() - providedDate.getTime();
  
    // CONVERT MILLISECONDS TO DAYS
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    // CHECK IF THE DIFFERENCE IS LESS THAN 10 DAYS
    return differenceInDays < differenceDay;
  };

  export const datemonthYear = (dateObj: Date): string => {
    const date = new Date(dateObj);
    const options2: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: "short",
      // year: "numeric",
    };
    const dateTime =
      date
        .toLocaleDateString("en-US", options2)
        .replace("/", " ")
        .replace(" ", " ")
        .replace(",", " ") +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return dateTime;
  };

  export const dateDifference = (a1: Date, b1: Date): number => {
    const a = new Date(a1);
    const b = new Date(b1);
  
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };


  // export const datemonthYear = (dateObj) => {
  //   const date = new Date(dateObj);
  //   const dateTime =
  //     date
  //       .toLocaleDateString("en-US", options2)
  //       .replace("/", " ")
  //       .replace(" ", " ")
  //       .replace(",", " ") +
  //     " " +
  //     date.getHours() +
  //     ":" +
  //     date.getMinutes() +
  //     ":" +
  //     date.getSeconds();
  //   return dateTime;
  // };