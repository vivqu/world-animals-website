function animateCSS() {
    const node = document.getElementsByClassName('handTapContainer hidden')[0];
    node.className = "handTapContainer animated fadeIn delay-1s";

    function handleAnimationEnd() {
        node.className = "handTapContainer";
        node.removeEventListener('animationend', handleAnimationEnd)
        node.className = "handTapContainer animated infinite pulse delay-1s";
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
animateCSS();