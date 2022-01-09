$(document).ready(function() {

    var completed = 0,
        imgHeight = 1374,
        posArr = [
            0, 
            80, 
            165,
            237,
            310, 
            378, 
            454, 
            539,
            624,
            696,
            769, 
            837, 
            913, 
            1000,
            1085,
            1157,
            1230, 
            1298 
    
    var win = [];
    win[0] = win[454] = win[913] = 1;
    win[80] = win[539] = win[1000] = 2;
    win[165] = win[624] = win[1085] = 3;
    win[237] = win[696] = win[1157] = 4;
    win[310] = win[769] = win[1230] = 5;
    win[378] = win[837] = win[1298] = 6;


    function Slot(el, max, step) {
        this.speed = 0; 
        this.step = step; 
        this.si = null; 
        this.el = el; 
        this.maxSpeed = max;
        this.pos = null;    

        $(el).pan({
            fps:30,
            dir:'down'
        });
        $(el).spStop();
    }
