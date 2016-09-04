var typeName = "typeEffect";

function TypedJs () {
    var ele= null ;
    var startingPoint= 0;
    var dataLen= null ;
    var data= null ;
    var typingSpeed= null ;
    var holdingTime= null ;
    var dataAtm= null ;
    var showCursor = null;
    var eleParent = null;
    var repeat = null;

    this.run = function(options) {
        ele = document.querySelector(".typedContent");
        data = options.data;
        dataLen = data.length;
        typingSpeed = options.typingSpeed;
        holdingTime = options.holdingTime;
        writingTime = options.writingTime;
        repeat = options.repeat;
        //showCursor();
        typify();
    }
    function typify() {
        dataAtm = data[startingPoint];
        createWritingEffect();
    }
    function createWritingEffect () {
        //cursor.removeBlink();
        var dataLen = dataAtm.length;
        var endHere = 0;
        var timer = setInterval(function() {
            ele.innerHTML += dataAtm[endHere];
            endHere++;
            if (endHere == dataLen) {
                clearInterval(timer);
                //cursor.addBlink();
                checkStatus();
            }
        }, typingSpeed);
    }
    function hold(callingFunc) {
        var time;
        if (callingFunc == "typify") {
            time = writingTime;
            setTimeout(function() {
                typify();
            }, time);
         }
         else {
           time = holdingTime;
           setTimeout(function() {
               clearWritten();
           }, time);
         }

    }
    function clearWritten() {
        //this.cursor.removeBlink();
        var dataLen = dataAtm.length;
        var dataToSlice = dataAtm;
        var timer = setInterval(function() {
            dataToSlice = dataToSlice.slice(0, -1);
            ele.innerHTML = dataToSlice;
            dataLen--;
            if (dataLen == 0) {
                clearInterval(timer);
              //  window[typeName].cursor.addBlink();
                hold("typify");
            }
        }, 60);
    }
     function checkStatus() {
        if (repeat == true) {
            if (startingPoint == dataLen - 1) {
                startingPoint = 0;
            } else {
                startingPoint++;
            }

            hold("clearWritten");
        } else if (repeat == false) {
            if (startingPoint != dataLen - 1) {
              startingPoint++;
              hold("clearWritten");
            }
        }
    }
      function showCursor() {
        if(showCursor != false) {
          ele.classList.add("blink");
        }
      }
      function blinkCursor(){
        ele.classList.add("blink");
      }
      function stableCursor() {
        ele.classList.add("stableCursor");
      }


    }
