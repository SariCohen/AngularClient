import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'setHebrewDate'
})

export class SetHebrewDatePipe implements PipeTransform {
    hebMonth: string[];
    hebMonthH: string[];
    hebDayH: string[];
    gmtrNum: number[];
    gmtrStr: string[];
    civMonth: string[];
    weekDay: string[];
    hebWeekDay: string[];
    shortHebWeekDay: string[];

    constructor() {
        this.hebMonth = this.makeArray(new Array(
            'Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
            'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat',
            'Adar', 'Adar I', 'Adar II'));

        this.hebMonthH = this.makeArray(new Array(
            'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
            'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט',
            'אדר', 'אדר א', 'אדר ב'));

        this.hebDayH = this.makeArray(new Array(
            'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
            'י"א', 'י"ב', 'י"ג', 'י"ד', 'ט"ו', 'ט"ז', 'י"ז',
            'י"ח', 'י"ט', 'כ', 'כ"א', 'כ"ב', 'כ"ג', 'כ"ד',
            'כ"ה', 'כ"ו', 'כ"ז', 'כ"ח', 'כ"ט', 'ל'));

        this.gmtrNum = this.makeArray(new Array(
            400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30,
            20, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1));

        this.gmtrStr = this.makeArray(new Array(
            'ת', 'ש', 'ר', 'ק', 'צ', 'פ', 'ע', 'ס', 'נ', 'מ',
            'ל', 'כ', 'טז', 'טו', 'י', 'ט', 'ח', 'ז', 'ו', 'ה',
            'ד', 'ג', 'ב', 'א'));

        this.civMonth = this.makeArray(new Array(
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'));

        this.weekDay = this.makeArray(new Array(
            'Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Shabbat'));

        this.hebWeekDay = this.makeArray(new Array(
            'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'));

        this.shortHebWeekDay = this.makeArray(new Array(
            'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז'));

    }

    transform(value: Date, format: string): string | undefined {
        return this.setHebrewDate(value, format);
    }

    setHebrewDay() {
        return (day: number) =>  {
            return 'יום ' + this.hebWeekDay[day];
        }
    }

    setHebrewDate(date: Date, format: string) {
        if (!date) return '';
        let number = Date.parse(date.toString());
        let hd = this.mbyHebDate(number, format);
        let hwd = this.mbyDay(number);
        let shwd = this.mbyShortDay(number);
        let hm = this.mbyMoed(number);

        switch (format) {
            case 'hebrew':
            case 'hebrewYear':
            case 'hebrewMonth':
            case 'hebrewDay':
            case 'hebrewDayMonth':
                return hd;
            case 'hebrewWeekDay':
                return hwd;
            case 'shortHebWeekDay':
                return shwd;
            case 'hebrewMoed':
                return hm;
        }
        return '';
    }

    /* kdate.js - Kaluach Javascript Hebrew date routines
     *   Version 0.05 (beta release)
     * Copyright (C) 5760 (2000 CE), by Abu Mami and Yisrael Hersch.
     *   All Rights Reserved.
     *   All copyright notices in this script must be left intact.
     * Updated by: Shay E. Cohen, July 2001 (V0.04, V0.05)
     * Based on the formula by Gauss
     * Terms of use:
     *   - Permission will be granted to use this script on personal
     *     web pages. All that's required is that you please ask.
     *     (Of course if you want to send a few dollars, that's OK too :-)
     *   - Use on commercial web sites requires a $50 payment.
     * website: http://www.kaluach.net
     * email: abu-mami@kaluach.net
     */

    mbyHebDate(myDate: number, format: string) {

        let dt = new Date(myDate);

        // var now = new Date(myDate);
        var day = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();

        if (year < 1900)
            // if date from Netscape, then add 1900
            year += 1900;

        var hebDate = this.civ2heb(day, month, year);
        var hmS = hebDate.substring(hebDate.indexOf(' ') + 1, hebDate.length);
        var hDay = eval(hebDate.substring(0, hebDate.indexOf(' ')));
        var hMonth = eval(hmS.substring(0, hmS.indexOf(' ')));
        var hYear = hmS.substring(hmS.indexOf(' ') + 1, hmS.length);
        if (!format || format == "hebrew")
            return this.hebDayH[hDay] + ' ' + this.hebMonthH[hMonth + 1] + ' ' + this.hebYear(hYear);

        if (format == "hebrewDay")
            return this.hebDayH[hDay];

        if (format == "hebrewMonth")
            return this.hebMonthH[hMonth + 1];

        if (format == "hebrewYear")
            return this.hebYear(hYear);

        if (format == "hebrewDayMonth")
            return this.hebDayH[hDay] + ' ' + this.hebMonthH[hMonth + 1];
        return '';
    }

    mbyMoed(myDate: any) {
        var now = new Date(myDate);
        var dow;
        var tday = now.getDate();
        var tmonth = now.getMonth() + 1;
        var tyear = now.getFullYear();
        var thour = now.getHours();
        var tahanun = "Yes"
        var tahanunAri = "Yes"
        if (tyear < 1900)
            // if date from Netscape, then add 1900
            tyear += 1900;
        var hebDate = this.civ2heb(tday, tmonth, tyear);
        var hmS = hebDate.substring(hebDate.indexOf(' ') + 1, hebDate.length);
        var hDay = eval(hebDate.substring(0, hebDate.indexOf(' ')));
        var hMonth = eval(hmS.substring(0, hmS.indexOf(' ')));
        var hYear = hmS.substring(hmS.indexOf(' ') + 1, hmS.length);

        var Moed;

        dow = this.DOW(tday, tmonth, tyear);
        Moed = this.moadim(tday, tmonth, tyear, hDay, hMonth, dow, thour);
        return Moed;
    }

    mbyDay(myDate : any) {
        var now = new Date(myDate);
        return "יום " + this.hebWeekDay[now.getDay() + 1];
    }

    mbyShortDay(myDate : any) {
        var now = new Date(myDate);
        return "יום " + this.shortHebWeekDay[now.getDay() + 1];
    }

    makeArray(args: any[]) : any[] {
        let arr = new Array()
        arr[0] = args.length;
        for (let i = 0; i < args.length; i++)
            arr[i + 1] = args[i];
        return arr;
    }



    Gauss(year : any) {
        var a, b, c;
        var m;
        var Mar;	// "day in March" on which Pesach falls (return value)

        a = Math.floor((12 * year + 17) % 19);
        b = Math.floor(year % 4);
        m = 32.044093161144 + 1.5542417966212 * a + b / 4.0 - 0.0031777940220923 * year;
        if (m < 0)
            m -= 1;
        Mar = Math.floor(m);
        if (m < 0)
            m++;
        m -= Mar;

        c = Math.floor((Mar + 3 * year + 5 * b + 5) % 7);
        if (c == 0 && a > 11 && m >= 0.89772376543210)
            Mar++;
        else if (c == 1 && a > 6 && m >= 0.63287037037037)
            Mar += 2;
        else if (c == 2 || c == 4 || c == 6)
            Mar++;

        Mar += Math.floor((year - 3760) / 100) - Math.floor((year - 3760) / 400) - 2;
        return Mar;
    }

    leap(y: number) {
        return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0))
    }

    civMonthLength(month : any, year : any) {
        if (month == 2)
            return 28 + (this.leap(year) ? 1 : 0);
        else if (month == 4 || month == 6 || month == 9 || month == 11)
            return 30;
        else
            return 31;
    }

    civ2heb(day: any, month: any, year: any) {
        var d = day;
        var m = month;
        var y = year;
        var hy;
        var pesach;
        var anchor;
        var adarType;

        m -= 2;
        if (m <= 0) { // Jan or Feb
            m += 12;
            y -= 1;
        }

        d += Math.floor(7 * m / 12 + 30 * (m - 1)); // day in March
        hy = y + 3760;	// get Hebrew year
        pesach = this.Gauss(hy);
        if (d <= pesach - 15) { // before 1 Nisan
            anchor = pesach;
            d += 365;
            if (this.leap(y))
                d++;
            y -= 1;
            hy -= 1;
            pesach = this.Gauss(hy);
        }
        else
            anchor = this.Gauss(hy + 1);

        d -= pesach - 15;
        anchor -= pesach - 12;
        y++;
        if (this.leap(y))
            anchor++;

        for (m = 0; m < 11; m++) {
            var days;
            if (m == 7 && anchor % 30 == 2)
                days = 30; // Cheshvan
            else if (m == 8 && anchor % 30 == 0)
                days = 29; // Kislev
            else
                days = 30 - m % 2;
            if (d <= days)
                break;
            d -= days;
        }

        adarType = 0;			// plain old Adar
        if (m == 11 && anchor >= 30) {
            if (d > 30) {
                adarType = 2;	// Adar 2
                d -= 30;
            }
            else
                adarType = 1;	// Adar 1
        }

        if (m >= 6)		// Tishrei or after?
            hy++;		// then bump up year

        if (m == 11)			// Adar?
            m += adarType;	// adjust for Adars

        return (d + ' ' + m + ' ' + hy);
    }

    hebYear(year : any) {
        var hYear = '';
        var iYear;
        var index;
        var num;
        var dup;
        var len;

        iYear = year % 1000;
        index = 1;
        while (iYear > 0) {
            if (iYear >= 17 && iYear <= 19 && this.gmtrNum[index] == 16)
                index += 2;		//special case for טו and טז
            num = Math.floor(iYear / this.gmtrNum[index]);
            if (num > 0) {
                for (dup = 0; dup < num; dup++)
                    hYear += this.gmtrStr[index];
                iYear %= this.gmtrNum[index];
            }
            index++;
        }

        len = hYear.length;
        if (len > 1)
            hYear = hYear.substring(0, len - 1) + '"' + hYear.substring(len - 1, len);
        return (hYear);
    }

    Easter(Y: any) {
        // based on the algorithm of Oudin
        var C = Math.floor(Y / 100);
        var N = Y - 19 * Math.floor(Y / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);

        var ret : number[]= [];
        ret[1] = M;
        ret[2] = D;
        return ret;
    }

    DOW(day: any, month: any, year: any) {
        var a = Math.floor((14 - month) / 12);
        var y = year - a;
        var m = month + 12 * a - 2;
        var d = (day + y + Math.floor(y / 4) - Math.floor(y / 100) +
            Math.floor(y / 400) + Math.floor((31 * m) / 12)) % 7;
        return d + 1;
    }

    NthDOW(nth: any, weekday: any, month: any, year: any) {
        if (nth > 0)
            return (nth - 1) * 7 + 1 + (7 + weekday - this.DOW((nth - 1) * 7 + 1, month, year)) % 7;
        var days = this.civMonthLength(month, year);
        return days - (this.DOW(days, month, year) - weekday + 7) % 7;
    }

    holidays(cday: any, cmonth: any, cyear: any) {
        // American civil holidays and some major religious holiday
        if (cmonth == 1 && cday == 1)
            return "New Year's Day";
        else if (cmonth == 2 && cday == 12)
            return "Lincoln's Birthday";
        else if (cmonth == 2 && cday == 14)
            return "Valentine's Day";
        else if (cmonth == 2 && cday == this.NthDOW(3, 2, 2, cyear))
            return "President's Day";
        else if (cmonth == 3 && cday == 17)
            return "St. Patrick's Day";
        else if (cmonth == 3 || cmonth == 4) {
            var e = this.Easter(cyear);
            if (cmonth == e[1] && cday == e[2])
                return "Easter";
        }
        else if (cmonth == 5 && cday == this.NthDOW(2, 1, 5, cyear))
            return "Mother's Day";
        else if (cmonth == 5 && cday == this.NthDOW(3, 7, 5, cyear))
            return "Armed Forces Day";
        else if (cmonth == 5 && cday == this.NthDOW(0, 2, 5, cyear))
            return "Memorial Day";
        else if (cmonth == 6 && cday == 14)
            return "Flag Day";
        else if (cmonth == 6 && cday == this.NthDOW(3, 1, 6, cyear))
            return "Father's Day";
        else if (cmonth == 7 && cday == 4)
            return "Independence Day";
        else if (cmonth == 9 && cday == this.NthDOW(1, 2, 9, cyear))
            return "Labor Day";
        else if (cmonth == 10 && cday == this.NthDOW(2, 2, 10, cyear))
            return "Columbus Day";
        else if (cmonth == 10 && cday == 31)
            return "Halloween";
        else if (cmonth == 11 && cday == 11)
            return "Veterans' Day";
        else if (cmonth == 11 && cday == this.NthDOW(4, 5, 11, cyear))
            return "Thanksgiving";
        else if (cmonth == 12 && cday == 25)
            return "Christmas";

        return "";
    }

    moadim(cday: any, cmonth: any, cyear: any, hday: any, hmonth: any, dow: any, thour: any) {
        if (hmonth == 6) {
            if (hday == 1 || hday == 2)
                //return "Rosh Hashana"
                return "ראש השנה"
            else if (hday == 3 && dow != 7)
                //return "Fast of Gedalia";
                return "צום גדליה";
            else if (hday == 4 && dow == 1)
                //return "Fast of Gedalia";
                return "צום גדליה";
            else if (hday == 10)
                //return "Yom Kippur"
                return "יום כיפור"
            else if (hday >= 15 && hday <= 22)
                //return "Sukkot"
                return "סוכות"
            else if (hday == 23)
                //return "Sukkot (d)"
                return "סוכות (d)"
        }
        else if (hmonth == 8) {
            if (hday >= 25)
                //return "Chanukkah"
                return "חנוכה"
            // Chanukkah is also in the 24th after 16:00
            else if (hday == 24 && thour >= 16)
                //return "Chanukkah"
                return "חנוכה"
        }
        else if (hmonth == 9) {
            if (hday <= 2) {
                //return "Chanukkah"
                return "חנוכה"
            }
            else if (hday == 3) {
                // Kislev can be malei or chaser
                if (cday == 1) {
                    cday = 29;
                    cmonth = 11;
                }
                else if (cday == 2) {
                    cday = 30;
                    cmonth = 11;
                }
                else
                    cday -= 3;
                let hdate = this.civ2heb(cday, cmonth, cyear);
                let hd1 = eval(hdate.substring(0, hdate.indexOf(' ')));
                if (hd1 == 29)
                    //return "Chanukkah"
                    return "חנוכה"
            }
            else if (hday == 10)
                //return "Fast of Tevet"
                return "צום י' בטבת"
        }
        else if (hmonth == 10) {
            if (hday == 15)
                //		    return "Tu b'Shvat"
                return "טו בשבט"
        }
        else if (hmonth == 11 || hmonth == 13) {
            if (hday == 11 && dow == 5)
                //return "Taanit Esther"
                return "תענית אסתר"
            else if (hday == 13 && thour >= 17)
                //return "Purim"
                return "פורים"
            else if (hday == 13 && dow != 7)
                return "תענית אסתר"
            else if (hday == 14)
                return "פורים"
            else if (hday == 15)
                return "שושן פורים"
        }
        else if (hmonth == 0) {

            if (hday == 12 && dow == 5)
                return "תענית ברכות"
            else if (hday == 14 && dow != 7)
                return "תענית ברכות"
            else if (hday >= 15 && hday <= 21)
                return "פסח"
            else if (hday == 22)
                return "פסח (d)"
        }
        else if (hmonth == 1) {
            if (hday == 3 && dow == 5)
                return "יום העצמאות"
            else if (hday == 4 && dow == 5)
                return "יום העצמאות"
            else if (hday == 5 && dow != 6 && dow != 7)
                return "יום העצמאות"
            if (hday == 14)
                return "פסח שני"
            else if (hday == 18)
                return "לג בעומר"

        }
        else if (hmonth == 2) {
            if (hday == 6)
                return "שבועות"
            else if (hday == 7)
                return "שבועות (d)"
        }
        else if (hmonth == 3) {
            if (hday == 17 && dow != 7)
                return "צום יז בתמוז"
            if (hday == 18 && dow == 1)
                return "צום יז בתמוז"
        }
        else if (hmonth == 4) {
            if (hday == 9 && dow != 7)
                return "ט' באב"
            if (hday == 10 && dow == 1)
                return "ט' באב"
            if (hday == 15)
                return "ט' באב"
        }

        return "";
    }

    /*var now = new Date;
    var dow;
    var tday = now.getDate();
    var tmonth = now.getMonth() + 1;
    var tyear = now.getFullYear();
    var thour = now.getHours();
    if (tyear < 1900)
        // if date from Netscape, then add 1900
        tyear += 1900;
    var hebDate = this.civ2heb(tday, tmonth, tyear);
    var hmS = hebDate.substring(hebDate.indexOf(' ') + 1, hebDate.length);
    var hDay = eval(hebDate.substring(0, hebDate.indexOf(' ')));
    var hMonth = eval(hmS.substring(0, hmS.indexOf(' ')));
    var hYear = hmS.substring(hmS.indexOf(' ') + 1, hmS.length);
    //document.write('<font face="arial, helvetica" SIZE="-1" align="left"><br>');
    //document.write('    ' + hebDayH[hDay] + ' ' + hebMonthH[hMonth+1] + ' ' + hebYear(hYear));
    //document.write('<br>');	// set special days flags
    var Moed;
    
    dow = this.DOW(tday, tmonth, tyear);
    Moed = this.moadim(tday, tmonth, tyear, hDay, hMonth, dow, thour);*/
}