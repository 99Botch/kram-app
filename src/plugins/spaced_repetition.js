// The algorithm below is in charge of prediction the intervals

// FIrst I import luxon, a JS library used for time management
const { DateTime } = require("luxon");

function spacedRepetition(_card, _event, _id){
    /**
     * First I declare the learning cue with a set of hardcoded values matching minutes, seconds & days
     * 0.60 means 60 seconds and 0.150 15 minutes. I did that to avoid conflict later in the code. At firt
     * When I used60 and 15, the algorithm interchangeably understood 60 seconds and 60 days as well as 15 minutes and 15 days
     */
    let learning_cue = [null, 0.60, 0.150, 1, 2, 7, 14, 30];

    // If the algo sees that the interval in comprised in learning_cue, it sets the flshcards within the said cue
    let is_learning = learning_cue.indexOf(_card.interval, 0);

    // feedback checks the id or event depending on the screen size, determining the new interval whether if th user was wrong or right
    let feedback;
    (_event == 'ArrowLeft' || _id == 'fail') ? feedback = false : feedback =true;
    
    // If feedback is 'pass'
    if(feedback){

        /**
         * following statement happens if the card is new or failed in the leanring cue
         * If a card's interval is null or eaqual to 0.60, next interval is set to 15 minutes
         * It then update the dates to make sure that card will be reviewd the dat the user either failed the card or created it
         */
        if(_card.next_session == null || _card.interval == 0.60){
            _card.interval = 0.150;
            let date = DateTime.local().plus({ minutes: 15 }).toString();  
            let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
            _card.next_session = new_interval;
        }

        // if the card is within the learning cue, the interval moes from one slot and date gets updated
        else if (_card.interval <= 30 && is_learning < learning_cue.length - 1) {
            _card.interval = learning_cue[++is_learning];
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }  

        /**
         * If the interval if bigger than 30, than the card is in the mature cue
         * The rules to calcutate the interval are henceforth different
         */
        else if (_card.interval >= 30) {
            // First, the success_streak gets icremented by one
            _card.success_streak++;

            // success_streak module 2 is equal to zero and is not equal to zero, is gets a .20% bonus
            if (_card.success_streak != 0 && _card.success_streak % 2 == 0) 
                _card.ease_factor += 0.20;
                _card.ease_factor.toFixed(2);
            
            /**
             * If the card had previously came through a failure, the fail counter is decremented by one
             * I made that so that if the user fails 4 times at first, managed to remember it correctly one, and then forgets it 
             * a fifth time, it does not get into the burry pile to give him another chance
            */
            if (_card.fail_counter > 0) _card.fail_counter--;
            
            // Interval is the product of the last interal by the ease factor
            _card.interval = Math.round(_card.interval * _card.ease_factor);

            // Intervals cap at 10 years, otherwse they would be lost in the eternity
            if (_card.interval > 3650) _card.interval = 3650;

            // card session is updated
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }   
    } 

    // It the user failed the card
    else if (!feedback){
        // If the user failed the card in the learning cue, the interval is set back to 60 sceond, so is teh next_session
        // the process iterates itself until cards graduate
        if(_card.interval <= 30){
            _card.interval = 0.60;
            let date = DateTime.local().plus({ seconds: 60 }).toString();  
            let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
            _card.next_session = new_interval;
        }

        /**
         * If the card was in the mature cue, success_streak is set to 0,  fail_counter increments by one and ease_factor gets a 20% penality
         * ease_factor can't decrease under 130% as that would make the intervals too small as mentionnel by P. Wozniak
         */
        else{
            _card.success_streak = 0;
            _card.fail_counter++;
            _card.ease_factor -= 0.20;
            
            if (_card.ease_factor <= 1.3) _card.ease_factor = 1.3;
            
            // Yet again, interval can't overpass 10 years
            _card.interval = Math.round(_card.interval * _card.ease_factor);
            if (_card.interval > 3650) _card.interval = 3650;
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }

    }
    return _card
}

// export The middleware
export { spacedRepetition };