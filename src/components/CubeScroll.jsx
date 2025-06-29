import React, { useRef, useEffect } from "react";
import "./cubeScroll.css";

const faces = [
  { name: "front", content: <h1>Front</h1> },
  { name: "right", content: <h1>Right</h1> },
  { name: "back", content: <h1>Back</h1> },
  { name: "left", content: <h1>Left</h1> },
];

function CubeScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      const angle = idx * 90;
      const cube = container.querySelector(".cube");
      cube.style.transform = `translateZ(-250px) rotateX(${angle}deg)`;
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="wrapper">
      <div className="cube">
        {faces.map((f) => (
          <div key={f.name} className={`face face-${f.name}`}>
            <div className="inner">{f.content}</div>
          </div>
        ))}
      </div>
      {/* Snap anchors for scrolling */}
      {faces.map((_, i) => (
        <div key={i} className="snap-point" />
      ))}
    </div>
  );
}

export default CubeScroll;
