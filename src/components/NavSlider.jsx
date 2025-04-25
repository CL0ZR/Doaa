import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavSlider({ items }) {
  const containerRef = useRef(null);
  const sliderRef    = useRef(null);
  const { pathname } = useLocation();

  const updateSlider = (target) => {
    if (!target || !sliderRef.current) return;
    const slider = sliderRef.current;

    // إزالة كلاس animate وأي مستمعات سابقة
    slider.classList.remove("animate");
    slider.removeEventListener("transitionend", onTransitionEnd);
    slider.removeEventListener("animationend", onAnimationEnd);

    // إعداد المستمع لإنهاء انتقال التنقل
    function onTransitionEnd(e) {
      // نتأكد أن التحول كان للـ transform (أو width/height حسب حاجتك)
      if (e.propertyName !== "transform") return;
      slider.removeEventListener("transitionend", onTransitionEnd);
      // بعد الانتهاء: نضيف كلاس الفقاعة
      slider.classList.add("animate");
    }

    // إعداد المستمع لإنهاء حركة الفقاعة
    function onAnimationEnd() {
      slider.classList.remove("animate");
      slider.removeEventListener("animationend", onAnimationEnd);
    }

    // ربط المستمعات
    slider.addEventListener("transitionend", onTransitionEnd);
    slider.addEventListener("animationend", onAnimationEnd);

    // نقل الشريط إلى العنصر الجديد
    const { offsetLeft: x, offsetWidth: w, offsetHeight: h } = target;
    slider.style.setProperty("--tx", `${x}px`);
    slider.style.width  = `${w}px`;
    slider.style.height = `${h}px`;
  };

  useEffect(() => {
    const container = containerRef.current;
    const links     = container.querySelectorAll(".nav-link");
    const active    = Array.from(links).find(
      (l) => l.getAttribute("href") === pathname
    );
    updateSlider(active);

    const onResize = () => {
      const curr = container.querySelector(`.nav-link[href="${pathname}"]`);
      updateSlider(curr);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  return (
    <nav>
      <div ref={containerRef} className="container nav-container">
        <div ref={sliderRef} className="nav-slider"></div>
        {items.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className="nav-link"
            end
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
