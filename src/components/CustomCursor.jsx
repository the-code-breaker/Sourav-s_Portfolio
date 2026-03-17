import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const trails = useRef(
    Array.from({ length: 5 }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleDown = () => {
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(0.8)";
    };
    const handleUp = () => {
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    const handleEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "50px";
        ringRef.current.style.height = "50px";
        ringRef.current.style.borderColor = "#00cea8";
      }
    };
    const handleLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "35px";
        ringRef.current.style.height = "35px";
        ringRef.current.style.borderColor = "rgba(145,94,255,0.5)";
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // Hover on interactive elements
    const addLinkListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", handleEnterLink);
        el.addEventListener("mouseleave", handleLeaveLink);
      });
    };

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addLinkListeners();

    // Animation loop
    let raf;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top = `${pos.current.y}px`;
      }

      // Trail particles
      trails.current.forEach((trail, i) => {
        const speed = 0.08 - i * 0.012;
        trail.x += (mouse.current.x - trail.x) * speed;
        trail.y += (mouse.current.y - trail.y) * speed;
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.left = `${trail.x}px`;
          trailRefs.current[i].style.top = `${trail.y}px`;
        }
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    // Hide default cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button").forEach((el) => {
      el.style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      observer.disconnect();
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {trails.current.map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${4 - i * 0.5}px`,
            height: `${4 - i * 0.5}px`,
            borderRadius: "50%",
            background: `rgba(145, 94, 255, ${0.3 - i * 0.05})`,
            transition: "none",
          }}
        />
      ))}

      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #915EFF, #00cea8)",
          boxShadow: "0 0 10px rgba(145,94,255,0.6), 0 0 20px rgba(145,94,255,0.3)",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          border: "1.5px solid rgba(145,94,255,0.5)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, transform 0.15s",
        }}
      />
    </>
  );
}
