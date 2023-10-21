window.addEventListener('DOMContentLoaded', () => {
    let startButton = document.querySelector('.start'),
        stopButton = document.querySelector('.start, .stop'),
        setButton = document.querySelector('.settings'),
        setButtonImg = document.querySelector('.settings').childNodes[1],
        checkButton = document.querySelector('.settings, .set'),
        ring = document.querySelector('.ring'),
        secondInterval,
        flag = true;

    function toggleInput() {
        var inputItems = document.querySelectorAll('input[type="text"]');
        for (var i = 0; i < inputItems.length; i++) {
            inputItems[i].disabled = !inputItems[i].disabled;
        }
    }

    setButton.addEventListener('click', setTimer);

    function setTimer() {
        flag = true;
        if (stopButton.classList.contains('stop')) {
            stopTimer();
            flag = false;
        }
        toggleInput();
        setButtonImg.src = 'images/check.svg';
        setButton.classList.add('set');
        setButton.removeEventListener('click', setTimer);
        checkButton.addEventListener('click', checkTimer);
        startButton.removeEventListener('click', startTimer);
    }

    function checkTimer() {
        let minutes = getMinutes(),
            seconds = getSeconds();
        if (minutes >= 99 || minutes === '') {
            alert("max minutes = 98, max seconds = 99");
            return setTimer(),
                toggleInput();
        }
        if (seconds >= 100 || seconds === '') {
            alert("max minutes = 98, max seconds = 99");
            return setTimer(),
                toggleInput();
        }
        if (seconds > 59) {
            setMinutes(Number(minutes) + 1);
            setSeconds(Number(seconds) - 60);
        }
        setMinutes(Number(minutes));
        setSeconds(Number(seconds));
        toggleInput();
        setButtonImg.src = 'images/gear.svg';
        checkButton.removeEventListener('click', checkTimer);
        setButton.addEventListener('click', setTimer);
        if (!flag) {
            startTimer();
        }

        if (!startButton.addEventListener('click', startTimer)) {
            startButton.addEventListener('click', startTimer);
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;

        } else {
            return num;
        }
    }

    startButton.addEventListener('click', startTimer);

    function startTimer() {
        if (getMinutes() == 0 && getSeconds() == 0) {
            return;
        }
        startButton.innerHTML = 'stop';
        startButton.classList.add('stop');
        startButton.removeEventListener('click', startTimer);
        secondInterval = setInterval(updateSeconds, 1000);
        updateSeconds();
        stopButton.addEventListener('click', stopTimer);
    }

    function cler() {
        clearInterval(secondInterval);
    }

    function updateSeconds() {

        let t = getSeconds();
        let a = getMinutes();
        t--;
        if (t < 0) {
            t = 59;
            a -= 1;
            setMinutes(a);
        }
        if (t <= 0 && a <= 0) {
            cler();
            ring.classList.add('ending');
            let al = () => {
                alert('Wake the f*** up, Samurai! We have a city to burn!');
            };
            setTimeout(al, 500);
        }
        setSeconds(t);
    }

    function stopTimer() {
        cler();
        stopButton.removeEventListener('click', stopTimer);
        if (startButton.classList.contains('stop')) {
            startButton.classList.toggle('stop');
        }
        if (ring.classList.contains('ending')) {
            ring.classList.remove('ending');
        }
        startButton.innerHTML = 'start';
        startButton.addEventListener('click', startTimer);
    }

    function setMinutes(a) {
        let minutes = document.querySelector('.minutes').childNodes[1];
        minutes.value = getZero(a);
    }

    function setSeconds(a) {
        let seconds = document.querySelector('.seconds').childNodes[1];
        seconds.value = getZero(a);
    }

    function getMinutes() {
        let minutes = document.querySelector('.minutes').childNodes[1];
        return minutes.value;
    }

    function getSeconds() {
        let seconds = document.querySelector('.seconds').childNodes[1];
        return seconds.value;
    }
});