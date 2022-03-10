import moment from 'moment';

// export API URI
function spacedRepetition(_card, _event){
    let learning_cue = ['1mn', '15mn'];
    // let learning_cue = ['1mn', '15mn', '1d', '2d', '7d', '14d', '30d'];
    let is_learning = learning_cue.indexOf(_card.interval, 0)

    if(_event == 'ArrowRight'){
        console.log(is_learning)
        
        if(_card.next_session == null){
            _card.interval = '15mn';
            let newt_interval = moment().add(15, 'minutes').calendar();  
            _card.next_session = newt_interval;
        }
        else if (is_learning < learning_cue.length) {
            _card.interval = learning_cue[++is_learning];

        } 
        else if (is_learning == learning_cue.length) {
            _card.interval = '30d';
        }

    } 
    else if (_event == 'ArrowLeft'){
        _card.interval = '1mn';
    }


    return _card
}
export { spacedRepetition };