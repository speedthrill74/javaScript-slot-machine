$(document).ready(function() {
    var completed = 0,
        imgHeight = 1374,
        posArr = [ 
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
            1298, 
            1374 
            ];
    
    let win = win[] {
    win[0] = win[454] = win[913] = 1;
    win[80] = win[539] = win[1000] = 2;
    win[165] = win[624] = win[1085] = 3;
    win[237] = win[696] = win[1157] = 4;
    win[310] = win[769] = win[1230] = 5;
    win[378] = win[837] = win[1298] = 6;
    }

    function Slot(element, max, step) {
        this.speed = 0; 
        this.step = step; 
        this.si = null; 
        this.element = element; 
        this.maxSpeed = max;
        this.pos = null;    

        $(element).pan({
            fps:30,
            dir:'down'
        });
        $(element).spStop();
    }

     Slot.prototype.start = function() {
        var _this = this;
        $(_this.element).add('.motion');
        $(_this.element).spStart();
        _this.si = window.setInterval(function() {
            if(_this.speed < _this.maxSpeed) {
                _this.speed += _this.step;
                $(_this.element).spSpeed(_this.speed);
            }
        }, 100);
    };


    Slot.prototype.stop = function() {
        var _this = this,
            limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            if(_this.speed > limit) {
                _this.speed -= _this.step;
                $(_this.element).spSpeed(_this.speed);
            }
            if(_this.speed <= limit) {
                _this.finalPos(_this.element);
                $(_this.element).spSpeed(0);
                $(_this.element).spStop();
                clearInterval(_this.si);
                $(_this.element).removeClass('motion');
                _this.speed = 0;
            }
        }, 100);
    };

  
    Slot.prototype.finalPos = function() {
        var element = this.element,
            element_id,
            pos,
            posMin = 2000000000,
            best,
            bgPos,
            i,
            j,
            k;

        element_id = $(element).attr('id');
        
        pos = document.getelementementById(element_id).style.backgroundPosition;
        pos = pos.split(' ')[1];
        pos = parseInt(pos, 10);

        for(i = 0; i < posArr.length; i++) {
            for(j = 0;;j++) {
                k = posArr[i] + (imgHeight * j);
                if(k > pos) {
                    if((k - pos) < posMin) {
                        posMin = k - pos;
                        best = k;
                        this.pos = posArr[i]; 
                    }
                    break;
                }
            }
        }

        best += imgHeight + 4;
        bgPos = "0 " + best + "px";
        $(element).animate({
            backgroundPosition:"(" + bgPos + ")"
        }, {
            duration: 200,
            complete: function() {
                completed ++;
            }
        });
    };
    
  
    Slot.prototype.reset = function() {
        var element_id = $(this.element).attr('id');
        $._spritely.instances[element_id].t = 0;
        $(this.element).css('background-position', '0px 4px');
        this.speed = 0;
        completed = 0;
        $('#result').html('');
    };

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    function printResult() {
        var res;
        if(win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
            res = "You Win!";
        } else {
            res = "You Lose";
        }
        $('#result').html(res);
    }


    var a = new Slot('#slot1', 30, 1),
        b = new Slot('#slot2', 45, 2),
        c = new Slot('#slot3', 70, 3);

   
    $('#control').click(function() {
        var x;
        if(this.innerHTML == "Start") {
            a.start();
            b.start();
            c.start();
            this.innerHTML = "Stop";
            
            disableControl(); 
            x = window.setInterval(function() {
                if(a.speed >= a.maxSpeed && b.speed >= b.maxSpeed && c.speed >= c.maxSpeed) {
                    enableControl();
                    window.clearInterval(x);
                }
            }, 100);
        } else if(this.innerHTML == "Stop") {
            a.stop();
            b.stop();
            c.stop();
            this.innerHTML = "Reset";

            disableControl(); 
            x = window.setInterval(function() {
                if(a.speed === 0 && b.speed === 0 && c.speed === 0 && completed === 3) {
                    enableControl();
                    window.clearInterval(x);
                    printResult();
                }
            }, 100);
        } else { 
            a.reset();
            b.reset();
            c.reset();
            this.innerHTML = "Start";
        }
    });
});
