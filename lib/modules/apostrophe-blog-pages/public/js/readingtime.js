/*!
Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: February 28, 2018
Licensed under the MIT license
*/

;
(function ($) {

    $.fn.readingTime = function (options) {

        // define default parameters
        const defaults = {
            readingTimeTarget: '.eta',
            readingTimeAsNumber: false,
            wordCountTarget: null,
            wordsPerMinute: 270,
            round: true,
            lang: 'en',
            lessThanAMinuteString: '',
            prependTimeString: '',
            prependWordString: '',
            remotePath: null,
            remoteTarget: null,
            success: function () {},
            error: function () {}
        };

        const plugin = this;
        const el = $(this);

        var wordsPerSecond;
        var lessThanAMinute;
        var minShortForm;

        var totalWords;
        var totalReadingTimeSeconds;

        var readingTimeMinutes;
        var readingTimeSeconds;
        var readingTime;
        var readingTimeObj;

        // merge defaults and options
        plugin.settings = $.extend({}, defaults, options);

        // define vars
        const s = plugin.settings;

        const setTime = function (o) {

            if (o.text !== '') {

                //split text by spaces to define total words
                totalWords = o.text.trim().split(/\s+/g).length;

                //define words per second based on words per minute (s.wordsPerMinute)
                wordsPerSecond = s.wordsPerMinute / 60;

                //define total reading time in seconds
                totalReadingTimeSeconds = totalWords / wordsPerSecond;

                // define reading time
                readingTimeMinutes = Math.floor(totalReadingTimeSeconds / 60);

                // define remaining reading time seconds
                readingTimeSeconds = Math.round(totalReadingTimeSeconds - (readingTimeMinutes * 60));

                // format reading time
                readingTime = readingTimeMinutes+':'+readingTimeSeconds;

                // if s.round
                if (s.round) {

                    // if minutes are greater than 0
                    if (readingTimeMinutes > 0) {

                        // set reading time by the minute
                        $(s.readingTimeTarget).text(s.prependTimeString + readingTimeMinutes + ((!s.readingTimeAsNumber) ? ' ' + minShortForm : ''));

                    } else {

                        // set reading time as less than a minute
                        $(s.readingTimeTarget).text((!s.readingTimeAsNumber) ? s.prependTimeString + lessThanAMinute : readingTimeMinutes);
                    }

                } else {

                    // set reading time in minutes and seconds
                    $(s.readingTimeTarget).text(s.prependTimeString + readingTime);
                }

                // if word count container isn't blank or undefined
                if (s.wordCountTarget !== '' && s.wordCountTarget !== undefined) {

                    // set word count
                    $(s.wordCountTarget).text(s.prependWordString + totalWords);
                }

                readingTimeObj = {
                    wpm: s.wordsPerMinute,
                    words: totalWords,
                    eta: {
                        time: readingTime,
                        minutes: readingTimeMinutes,
                        seconds: totalReadingTimeSeconds
                    }
                };

                // run success callback
                s.success.call(this, readingTimeObj);

            } else {

                // run error callback
                s.error.call(this, {
                    error: 'The element does not contain any text'
                });
            }
        };

        // if no element was bound
        if (!this.length) {

            // run error callback
            s.error.call(this, {
                error: 'The element could not be found'
            });

            // return so chained events can continue
            return this;
        }

        // Use switch instead of ifs
        switch (s.lang) {
            // if s.lang is Arabic
            case 'ar':
                lessThanAMinute = s.lessThanAMinuteString || "أقل من دقيقة";
                minShortForm = 'دقيقة';
                break;
                // if s.lang is Czech
            case 'cz':
                lessThanAMinute = s.lessThanAMinuteString || "Méně než minutu";
                minShortForm = 'min';
                break;
                // if s.lang is Danish
            case 'da':
                lessThanAMinute = s.lessThanAMinuteString || "Mindre end et minut";
                minShortForm = 'min';
                break;
                // if s.lang is German
            case 'de':
                lessThanAMinute = s.lessThanAMinuteString || "Weniger als eine Minute";
                minShortForm = 'min';
                break;
                // if s.lang is Spanish
            case 'es':
                lessThanAMinute = s.lessThanAMinuteString || "Menos de un minuto";
                minShortForm = 'min';
                break;
                // if s.lang is French
            case 'fr':
                lessThanAMinute = s.lessThanAMinuteString || "Moins d'une minute";
                minShortForm = 'min';
                break;
                // if s.lang is Hungarian
            case 'hu':
                lessThanAMinute = s.lessThanAMinuteString || "Kevesebb mint egy perc";
                minShortForm = 'perc';
                break;
                // if s.lang is Icelandic
            case 'is':
                lessThanAMinute = s.lessThanAMinuteString || "Minna en eina mínútu";
                minShortForm = 'min';
                break;
                // if s.lang is Italian
            case 'it':
                lessThanAMinute = s.lessThanAMinuteString || "Meno di un minuto";
                minShortForm = 'min';
                break;
                // if s.lang is Dutch
            case 'nl':
                lessThanAMinute = s.lessThanAMinuteString || "Minder dan een minuut";
                minShortForm = 'min';
                break;
                // if s.lang is Norwegian
            case 'no':
                lessThanAMinute = s.lessThanAMinuteString || "Mindre enn ett minutt";
                minShortForm = 'min';
                break;
                // if s.lang is Polish
            case 'pl':
                lessThanAMinute = s.lessThanAMinuteString || "Mniej niż minutę";
                minShortForm = 'min';
                break;
                // if s.lang is Russian
            case 'ru':
                lessThanAMinute = s.lessThanAMinuteString || "Меньше минуты";
                minShortForm = 'мин';
                break;
                // if s.lang is Slovak
            case 'sk':
                lessThanAMinute = s.lessThanAMinuteString || "Menej než minútu";
                minShortForm = 'min';
                break;
                // if s.lang is Swedish
            case 'sv':
                lessThanAMinute = s.lessThanAMinuteString || "Mindre än en minut";
                minShortForm = 'min';
                break;
                // if s.lang is Turkish
            case 'tr':
                lessThanAMinute = s.lessThanAMinuteString || "Bir dakikadan az";
                minShortForm = 'dk';
                break;
                // if s.lang is Ukrainian
            case 'uk':
                lessThanAMinute = s.lessThanAMinuteString || "Менше хвилини";
                minShortForm = 'хв';
                break;
                // if s.lang is Greek
            case 'el':
                lessThanAMinute = s.lessThanAMinuteString || 'Λιγότερο από λεπτό';
                minShortForm = 'λεπτά';
                break;
                // default s.lang in english
            default:
                lessThanAMinute = s.lessThanAMinuteString || 'Less than a minute';
                minShortForm = 'min';
        }

        // for each element
        el.each(function (index) {

            // if s.remotePath and s.remoteTarget aren't null
            if (s.remotePath != null && s.remoteTarget != null) {

                // get contents of remote file
                $.get(s.remotePath, function (data) {

                    // set time using the remote target found in the remote file
                    setTime({
                        text: $('<div>').html(data).find(s.remoteTarget).text()
                    });
                });

            } else {

                // set time using the targeted element
                setTime({
                    text: el.text()
                });
            }
        });

        return true;
    }
})(jQuery);