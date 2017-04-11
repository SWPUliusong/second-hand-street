module.exports = [
    function () {
        this.scrollTo = function (position, ms = 300) {
            if (ms === 0) {
                document.body.scrollTop = 0;
                return
            }

            // 时间间隔
            let dur = 1000 / 60;
            let top = document.body.scrollTop;

            // 移动距离
            let step = top / ms * dur

            move();

            function move() {
                let top = document.body.scrollTop;
                if (top > position) {
                    if (top - position >= step) top -= step;
                    else top = position
                }
                else if (top < position) {
                    if (top + position <= step) top += step;
                    else top = position
                } else {
                    return
                }

                document.body.scrollTop = top
                setTimeout(move, dur)
            }

        }

    }
]