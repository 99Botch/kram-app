const { DateTime } = require("luxon");

// export API URI
function spacedRepetition(_card, _event, _id){
    let learning_cue = [null, 0.60, 0.150, 1, 2, 7, 14, 30];
    let is_learning = learning_cue.indexOf(_card.interval, 0);

    let feedback;
    (_event == 'ArrowLeft' || _id == 'fail') ? feedback = false : feedback =true;
    
    if(feedback){

        if(_card.next_session == null || _card.interval == 0.60){
            _card.interval = 0.150;
            let date = DateTime.local().plus({ minutes: 15 }).toString();  
            let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
            _card.next_session = new_interval;
        }

        else if (_card.interval <= 30 && is_learning < learning_cue.length - 1) {

            _card.interval = learning_cue[++is_learning];
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }  

        else if (_card.interval >= 30) {

            if (_card.success_streak != 0 && _card.success_streak % 2 == 0) 
                _card.ease_factor += 0.20;
                _card.ease_factor.toFixed(2);
            
            if (_card.fail_counter > 0) _card.fail_counter--;
            
            _card.interval = Math.round(_card.interval * _card.ease_factor);
            if (_card.interval > 3650) _card.interval = 3650;

            _card.success_streak++;
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }   
    } 

    else if (!feedback){
        if(_card.interval <= 30){
            _card.interval = 0.60;
            let date = DateTime.local().plus({ seconds: 60 }).toString();  
            let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
            _card.next_session = new_interval;
        }

        else{
            _card.success_streak = 0;
            _card.fail_counter++;
            _card.ease_factor -= 0.35;
            
            if (_card.ease_factor <= 1.3) _card.ease_factor = 1.3;
            
            _card.interval = Math.round(_card.interval * _card.ease_factor);
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }

    }
    return _card
}
export { spacedRepetition };