function predictInterval(_interval) {
    let interval;

    if (_interval <= 60) interval = '2 months';
    else if (_interval <= 90) interval = '3 months';
    else if (_interval <= 120) interval = '4 months';
    else if (_interval <= 150) interval = '5 months';
    else if (_interval <= 180) interval = '6 months';
    else if (_interval <= 210) interval = '7 months';
    else if (_interval <= 240) interval = '8 months';
    else if (_interval <= 270) interval = '9 months';
    else if (_interval <= 300) interval = '10 months';
    else if (_interval <= 330) interval = '11 months';
    else if (_interval <= 365) interval = '1 year';
    else if (_interval <= 548) interval = '1.5 year';
    else if (_interval <= 730) interval = '2y';
    else if (_interval <= 912) interval = '2.5y';
    else if (_interval <= 1095) interval = '3y';
    else if (_interval <= 1277) interval = '3.5y';
    else if (_interval <= 1460) interval = '4y';
    else if (_interval <= 1642) interval = '4.5y';
    else if (_interval <= 1825) interval = '5y';
    else if (_interval <= 2007) interval = '5.5y';
    else if (_interval <= 2190) interval = '6y';
    else if (_interval <= 2372) interval = '6.5y';
    else if (_interval <= 2555) interval = '7y';
    else if (_interval <= 2737) interval = '7.5y';
    else if (_interval <= 2920) interval = '8y';
    else if (_interval <= 3102) interval = '8.5y';
    else if (_interval <= 3285) interval = '9y';
    else if (_interval <= 3467) interval = '9.5y';
    else interval = '10y'

    return interval;
}

export { predictInterval };
