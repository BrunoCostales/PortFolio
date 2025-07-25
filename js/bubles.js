export function moveBubbles(){


    const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach((bubble, i) => {
  let goingOut = true;

  const animate = () => {
    const maxMove = 400;
    const x = (Math.random() - 0.5) * maxMove;
    const y = (Math.random() - 0.5) * maxMove;

    bubble.style.transition = 'transform 3s ease-in-out';
    bubble.style.transform = goingOut ? `translate(${x}px, ${y}px)` : 'translate(0, 0)';
    goingOut = !goingOut;
    setTimeout(animate, 2000);
  };

  setTimeout(animate, i * 1000);
});
}