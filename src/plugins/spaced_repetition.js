const { DateTime } = require("luxon");

// export API URI
function spacedRepetition(_card, _event, _id){
    let learning_cue = [null, 60, 15, 1, 2, 7, 14, 30];
    let is_learning = learning_cue.indexOf(_card.interval, 0);
    console.log(_id)
    if(_event == 'ArrowRight' || _id == 'pass'){

        if(_card.next_session == null || _card.interval == 60){
            _card.interval = 15;
            let date = DateTime.local().plus({ minutes: _card.interval }).toString();  
            let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
            _card.next_session = new_interval;
        }
        else if (is_learning < learning_cue.length - 1) {
            _card.interval = learning_cue[++is_learning];
            _card.next_session = DateTime.local().plus({ days: _card.interval }).toISODate();
        }   
    } 
    else if (_event == 'ArrowLeft' || _id == 'fail'){
        _card.interval = 60;
        let date = DateTime.local().plus({ seconds: _card.interval }).toString();  
        let new_interval = date.slice(0,10) + " " + date.slice(11,16);  
        _card.next_session = new_interval;
    }
    return _card
}
export { spacedRepetition };