var typeName = "typeEffect";

window[typeName] = {
    ele: null ,
    startingPoint: 0,
    dataLen: null ,
    data: null ,
    typingSpeed: null ,
    holdingTime: null ,
    dataAtm: null ,
    cursor : null,
    eleParent : null,

    run: function(options) {

        this.ele = document.querySelector(".typedContent");
        this.eleParent = document.querySelector("#" + options.id);
        this.data = options.data;
        this.dataLen = this.data.length;
        this.typingSpeed = options.typingSpeed;
        this.holdingTime = options.holdingTime;
        this.writingTime = options.writingTime;
        this.repeat = options.repeat;
        this.cursor.show();
        this.typify();
    },
    typify: function() {

        this.dataAtm = this.data[this.startingPoint];
        this.createWritingEffect();
    },
    createWritingEffect: function() {
        this.cursor.removeBlink();
        var dataAtm = this.dataAtm;
        var dataLen = dataAtm.length;
        var endHere = 0;
        var timer = setInterval(function() {
            window[typeName].ele.innerHTML += dataAtm[endHere];
            endHere++;
            if (endHere == dataLen) {
                clearInterval(timer);
                window[typeName].cursor.addBlink();
                window[typeName].checkStatus();
            }
        }, this.typingSpeed);
    },
    hold: function(callingFunc) {
        var time;
        if (callingFunc == "typify") {
            time = this.writingTime;
         }
         else {
           time = this.holdingTime;
         }
        setTimeout(function() {
            window[typeName][callingFunc]();
        }, time);
    },
    clearWritten: function() {
        this.cursor.removeBlink();
        var dataAtm = this.dataAtm;
        var dataLen = dataAtm.length;
        var dataToSlice = dataAtm;
        var timer = setInterval(function() {
            dataToSlice = dataToSlice.slice(0, -1);
            window[typeName].ele.innerHTML = dataToSlice;
            dataLen--;
            if (dataLen == 0) {
                clearInterval(timer);
                window[typeName].cursor.addBlink();
                window[typeName].hold("typify");
            }
        }, 60);
    },
    checkStatus: function() {
        if (this.repeat == true) {
            if (this.startingPoint == this.dataLen - 1) {
                this.startingPoint = 0;
            } else {
                this.startingPoint++;
            }

            this.hold("clearWritten");
        } else if (this.repeat == false) {
            if (this.startingPoint != this.dataLen - 1) {
                this.startingPoint++;
                this.hold("clearWritten");
            }
        }
    },
    cursor : {
      elementHTML : '<span class="blinkingCursor blink">O</span>',
      element : null,
      show : function () {
        if(window[typeName].cursor != false) {
          window[typeName].eleParent.insertAdjacentHTML("beforeend",this.elementHTML);
          this.element = document.querySelector(".blinkingCursor");
        }

      },
      addBlink : function (){
        this.element.classList.add("blink");
      },
      removeBlink : function() {
        this.element.classList.remove("blink");
      }


    },

}
