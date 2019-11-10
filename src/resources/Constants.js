
export const Constants = {

rainIntensityList : [
    {value : 0, label : 'None'},
    {value : 10, label : 'Drizzle'},
    {value : 20, label : 'Moderate'},
    {value : 30, label : 'Heavy Downpour'},
],


floodIntensityList : [
    {value : -1, label : 'Unknown'},
    {value : 0, label : 'Clear'},
    {value : 10, label : 'Light'},
    {value : 20, label : 'Moderate'},
    {value : 30, label : 'Flooded'},
],

mapFilterList : [
    {value : 'A', label : 'All Time'},
    {value : 'D', label :'Past Day'},
    {value : 'W', label : 'Past Week'},
    {value : 'M', label : 'Past Month'}
],

DAY : 'D',
WEEK : 'W',
MONTH : 'M',
ALL : 'A',

floodColors : {
    "-1" : '#fcba03',
    "0" : '#2bbf0a',
    "10" : '#2bbf0a',
    "20" : '#fc7303',
    "30" : '#fc4103'
}

};