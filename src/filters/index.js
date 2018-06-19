import Vue from 'vue';

Vue.filter('toStringToInt', function(value) {
    if (!value) return value;
    return parseInt(value);
});