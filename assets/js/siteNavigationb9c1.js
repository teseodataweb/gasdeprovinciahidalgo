(function (n, t, i) {
  function e(n) {
    let t;
    return (
      n.hasClass(".dropdown-toggle") ||
        (t = n.hasClass(".dropdown")
          ? n.find(".dropdown-toggle").first()
          : n.closest(".dropdown").find(".dropdown-toggle").first()),
      t
    );
  }
  function u(n) {
    e(n).dropdown("toggle");
  }
  function o(t) {
    t.on("mouseenter mouseleave", function (t) {
      const e = t.type,
        f = i(t.currentTarget);
      if (n.innerWidth >= r)
        switch (e) {
          case "mouseenter":
            f.find(".dropdown-toggle").hasClass("show") ||
              (u(f.find(".dropdown-toggle")), f.blur().find("a").blur());
            break;
          case "mouseleave":
            f.find(".dropdown-toggle").hasClass("show") &&
              (u(f.find(".dropdown-toggle")), f.blur().find("a").blur());
        }
    });
  }
  function s(t, r) {
    const u = i(t.currentTarget);
    let f;
    r.on("keyup", function (n) {
      f = n.keyCode;
    });
    setTimeout(function () {
      if (f !== 27) {
        let t = "";
        u.hasClass("dropdown-toggle") &&
          ((t = u.focus().attr("href")), (n.location.href = t));
      } else t.preventDefault();
    }, 250);
  }
  function h(n, t) {
    const r = i(n.currentTarget);
    switch (t) {
      case 27:
        r.hasClass("show") && (u(r), r.focus());
        break;
      case 9:
        r.hasClass("show") || u(r);
        break;
      case 32:
        r.click();
    }
  }
  function c(t, r) {
    const f = i(t.currentTarget);
    if (f.hasClass("show")) {
      t.preventDefault();
      t.stopPropagation();
      let i = "";
      i = f.is("a")
        ? f.focus().attr("href")
        : f.hasClass("link-text") || f.closest("a").hasClass("arrow-link")
        ? f.closest("a").focus().attr("href")
        : f.find("a").first().focus().attr("href");
      n.location.href = i;
    } else if (f.data("bs-toggle") === "dropdown")
      t.preventDefault(),
        t.stopPropagation(),
        r.find(".dropdown-toggle.show").each(function () {
          u(i(this));
        }),
        u(f);
    else return;
  }
  function l(t, u) {
    t.on("touchstart click keyup", function (t) {
      if (n.innerWidth >= r) {
        const n = t.keyCode || t.which,
          r = t.type;
        switch (r) {
          case "keyup":
            h(t, n);
            break;
          case "click":
            s(t, i(this));
            break;
          case "touchstart":
            c(t, u);
        }
      }
    });
  }
  function a(t) {
    t.find(
      ".hamburger-mobile .secondary-link, .search-mobile .secondary-link"
    ).on("keydown", function (t) {
      if (n.innerWidth < r) {
        const i = t.keyCode || t.which,
          n = t.currentTarget;
        i === 32 &&
          (t.preventDefault(),
          n.classList.contains("secondary-link") && n.click());
      }
    });
  }
  const r = 768,
    f = function () {
      if (n.innerWidth >= r) {
        const u = i(".navbar-dotcom .navbar-nav").width(),
          f = i(".navbar-dotcom .navbar-nav .hamburger").width(),
          e = i(".navbar-dotcom .navbar-nav .dropdown-hallmark").outerWidth(!0);
        let n = 0,
          t = 0,
          r = 0;
        i(".navbar-dotcom .navbar-nav .dropdown-named-items").each(function () {
          r++;
          r <= 3 && (n += i(this).outerWidth(!0));
        });
        t = u / 2 - n - f - e / 2;
        i(".navbar-dotcom .navbar-nav .hamburger").css("margin-right", t);
      } else i(".navbar-dotcom .navbar-nav .hamburger").css("margin-right", "");
    };
  i(t).ready(function () {
    const t = i(".navbar-dotcom");
    let e = n.innerWidth;
    t.find(".dropdown-large.dropdown-named-items > .dropdown-menu").on(
      "click touchstart",
      function (n) {
        n.stopPropagation();
      }
    );
    t.find(".dropdown.search > .dropdown-toggle").on(
      "hide.bs.dropdown",
      function () {
        i(this).focus();
      }
    );
    const s = t.find(".nav :not(.hamburger, .search).dropdown-named-items");
    o(s);
    const h = t.find(
      ".nav :not(.hamburger, .search).dropdown-named-items > .dropdown-toggle"
    );
    l(h, t);
    t.find(".mobile-nav-container .bottom-divider").on(
      "click touchstart",
      function (n) {
        n.stopPropagation();
      }
    );
    a(t);
    t.find("[data-toggle=offcanvas]").on("click", function (t) {
      n.innerWidth < r &&
        (i(t.target).hasClass("offcanvas") ||
          i(t.target).hasClass("offcanvas-link") ||
          i(t.target).parent().parent().hasClass("offcanvas-dropdown") ||
          i(t.target).parent().hasClass("offcanvas-link")) &&
        (t.stopPropagation(),
        t.preventDefault(),
        i(this)
          .find(".sidebar-offcanvas .sub-menu")
          .css("min-height", i(".mobile-nav-container").height() + "px"),
        i(this)
          .find(".row-offcanvas")
          .toggleClass("active")
          .animate({ right: "100%" }, 100));
    });
    t.find("[data-toggle=offcanvas-hide]").on("click", function (t) {
      if (n.innerWidth < r) {
        t.stopPropagation();
        t.preventDefault();
        const n = i(this).closest(".row-offcanvas");
        n.animate({ right: "-15px" }, 100, function () {
          setTimeout(function () {
            n.toggleClass("active");
          }, 250);
        });
      }
    });
    f();
    i(n).resize(function () {
      n.innerWidth > e && n.innerWidth >= r
        ? u(
            t.find(
              ".hamburger-mobile >  .dropdown-toggle.show, .search-mobile >  .dropdown-toggle.show"
            )
          )
        : n.innerWidth < e &&
          n.innerWidth < r &&
          u(
            t.find(
              ".dropdown-named-items > .dropdown-toggle.show, .dropdown-large.search > .dropdown-toggle.show"
            )
          );
      e = n.innerWidth;
      f();
    });
  });
})(window, document, jQuery),
  (function (n, t) {
    function g() {
      const i = t.querySelectorAll(
        "#main-content .module-looper > :is(div, section, dialog)"
      );
      let n = !1;
      i.forEach((t) => {
        t.dataset.cvxFirstModuleExclude ||
          n ||
          t.offsetTop !== 0 ||
          ((n = !0),
          globalNamespace.setBodyColorTheme(t.classList),
          t.dataset.cvxFirstModuleNoAdjustment
            ? t.classList.add("nav-first-module-no-adjustment")
            : t.classList.add("nav-first-module-adjustment"));
      });
    }
    function i(n) {
      const t = n.Title ? n.Title : "";
      return n.Link && n.Link.Text ? n.Link.Text : t;
    }
    function f(n) {
      if (!n.Link) return "";
      return n.Link.Url ? n.Link.Url : "";
    }
    function o(n) {
      const e = [];
      let r, u;
      return (
        n.Link && n.Link.Url
          ? ((u = t.createElement("a")),
            (u.href = f(n)),
            n.Target && (u.target = n.Target),
            n.Title && (u.title = n.Title),
            u.classList.add(
              "nav-2023-link",
              "type-navigation",
              "text-elevated"
            ),
            (u.innerHTML = i(n)))
          : ((r = t.createElement("button")),
            r.classList.add(
              "nav-2023-link",
              "type-navigation",
              "text-elevated"
            ),
            (r.innerHTML = i(n))),
        n.ChildLinks &&
          n.ChildLinks.length > 0 &&
          (r ||
            ((r = t.createElement("button")),
            r.classList.add(
              "nav-2023-link",
              "type-navigation",
              "text-elevated"
            ),
            (r.innerHTML = i(n))),
          u &&
            (r.classList.add("d-lg-none"),
            u.classList.add("d-none", "d-lg-block"))),
        r && e.push(r),
        u && e.push(u),
        e
      );
    }
    function nt(n) {
      n.child.ChildLinks.length > 0 &&
        (n.childListItemAnchorAndButtons.forEach((n) =>
          n.classList.add("nav-2023-toggler")
        ),
        n.childListItem.appendChild(s(n.child, n.level + 1)));
    }
    function tt(n) {
      const r = t.createElement("li");
      r.classList.add("nav-2023-mobile-back", "d-lg-none");
      r.innerHTML = `<div class="nav-2023-back-button-container">
                                    <button class="nav-2023-back-button nav-2023-button" type="button" data-bs-dismiss="offcanvas">
                                        <span class="glyphicon glyphicon-2023-arrow-left" aria-hidden="true"></span>
                                        <span class="visually-hidden">back to previous menu</span>
                                    </button>
                                    <p class="button-text link-text type-navigation text-base">
                                        ${i(n)}
                                    </p>
                                    <button class="nav-2023-back-button nav-2023-button close-button" type="button">
                                        <span class="glyphicon glyphicon-2023-close" aria-hidden="true"></span>
                                        <span class="visually-hidden">close menu</span>
                                    </button>
                                </div>`;
      const u = t.createElement("li");
      u.classList.add("nav-2023-offcanvas-item", "overview-item", "d-lg-none");
      const e = { Link: { Text: "", Url: f(n) } },
        s = o(e);
      return (
        s.forEach((n) => {
          u.appendChild(n);
        }),
        [r, u]
      );
    }
    function it(n) {
      const r = [];
      return (
        n.PromoCards.forEach((n) => {
          if (n.Link) {
            const e = t.createElement("li");
            e.classList.add(
              "nav-2023-offcanvas-item",
              "nav-2023-offcanvas-promo-item"
            );
            const u = t.createElement("a");
            if (
              (u.classList.add(
                "nav-2023-promo-link",
                "cta-link",
                "type-body",
                "text-base"
              ),
              (u.href = f(n.Link)),
              n.Link.Target && (childListItemAnchor.target = n.Link.Target),
              n.Link.Title && (childListItemAnchor.title = n.Link.Title),
              e.appendChild(u),
              n.Image && n.Image.Src)
            ) {
              const i = t.createElement("span");
              i.classList.add("nav-2023-promo-image");
              i.style.backgroundImage = `url('${n.Image.Src}')`;
              u.appendChild(i);
            }
            const o = t.createElement("span");
            o.classList.add("cta-link-item");
            o.innerHTML = `<span class="cta-underline">${i(n)}</span>
                                    <span class="cta-glyphicon">
                                        <span class="animate glyphicon glyphicon-2023-arrow-right" aria-hidden="true"></span>
                                    </span>`;
            u.appendChild(o);
            r.push(e);
          }
        }),
        r
      );
    }
    function rt(n) {
      const i = t.createElement("li");
      i.classList.add("nav-2023-offcanvas-item");
      const r = o(n.child);
      return (
        r.forEach((n) => {
          i.appendChild(n);
        }),
        nt({
          child: n.child,
          level: n.level,
          childListItemAnchorAndButtons: r,
          childListItem: i,
        }),
        i
      );
    }
    function s(n, i = 0) {
      let r;
      if (
        n.ChildLinks.length > 0 &&
        ((r = t.createElement("ul")),
        r.classList.add("nav-2023-offcanvas-list", "nav-2023-list-level-" + i),
        n.ChildLinks.forEach((t, u) => {
          if (u === 0) {
            const t = tt(n);
            t.forEach((n) => {
              r.appendChild(n);
            });
          }
          const f = rt({ child: t, level: i, childList: r });
          r.appendChild(f);
        }),
        n.PromoCards.length > 0)
      ) {
        const t = it(n);
        t.forEach((n) => {
          r.appendChild(n);
        });
      }
      return (
        i > 3 &&
          (r.classList.add(
            "offcanvas",
            "offcanvas-start",
            "background-color-dark-blue"
          ),
          (r.dataset.bsDelay = '{"show":0,"hide":0}'),
          (r.dataset.bsBackdrop = "false"),
          (r.dataset.bsScroll = "true"),
          r.setAttribute("aria-label", "offcanvas menu")),
        r
      );
    }
    function ut(n) {
      const t = nav2023Obj.LeftLinks,
        i = n.querySelector("#nav-2023-offcanvas");
      t.forEach((n) => {
        let t = s(n, 3);
        t && i.appendChild(t);
      });
    }
    function e(n, t) {
      const i = t.querySelectorAll(
        ".nav-2023-offcanvas-list.nav-2023-list-level-3"
      );
      i.forEach((n) => {
        n.classList.remove("show");
      });
      i[n] && i[n].classList.add("show");
    }
    function r(n) {
      const t = n.querySelector("#nav-2023-offcanvas"),
        i = bootstrap.Offcanvas.getOrCreateInstance(t);
      i.hide();
      n.querySelector("#nav-2023-level-2 .nav-2023-hallmark").focus();
    }
    function ft(n) {
      const t = n.closest(".nav-2023-desktop-offcanvas").children,
        i = n.closest(".nav-2023-offcanvas-list");
      return [].indexOf.call([...t], i);
    }
    function u(n) {
      const t = n.querySelectorAll(".offcanvas.show");
      t.forEach((n) => {
        const t = bootstrap.Offcanvas.getOrCreateInstance(n);
        t.hide();
      });
    }
    function et(n) {
      n.closest(".nav-2023").classList.add("menu-open");
      n.closest(".nav-2023-list")
        .querySelectorAll(".nav-2023-item")
        .forEach((n) => n.classList.remove("offcanvas-open"));
      n.closest(".nav-2023-item").classList.add("offcanvas-open");
    }
    function ot(n) {
      const t = n.keyCode,
        i = n.currentTarget;
      t == 32 && (n.preventDefault(), i.click());
    }
    function h(n) {
      const t = n.currentTarget,
        u = t.closest(".nav-2023-nav"),
        i = u.querySelector("#nav-2023-offcanvas"),
        r = bootstrap.Offcanvas.getOrCreateInstance(i),
        f = parseInt(t.dataset.cvxIndex, 10);
      r._isShown || r.show();
      et(t);
      e(f, i);
    }
    function c(n) {
      const t = n.currentTarget.closest(".nav-2023-nav"),
        i = t.querySelector("#nav-2023-offcanvas"),
        r = bootstrap.Offcanvas.getOrCreateInstance(i);
      (n.relatedTarget === null ||
        n.relatedTarget.classList.contains("offcanvas-backdrop")) &&
        r.hide();
    }
    function l(n) {
      const t = n.currentTarget.closest(".nav-2023-nav");
      t.closest("header").classList.remove("menu-open");
      t.querySelectorAll(".nav-2023-item").forEach((n) =>
        n.classList.remove("offcanvas-open")
      );
    }
    function a(n) {
      const e = n.keyCode,
        o = n.shiftKey ? n.shiftKey : !1,
        t = n.currentTarget,
        i = t.closest(".nav-2023-nav"),
        s = i.querySelector("#nav-2023-offcanvas"),
        h = bootstrap.Offcanvas.getOrCreateInstance(s),
        u = parseInt(t.dataset.cvxIndex, 10),
        f = i.querySelectorAll("#nav-2023-offcanvas .nav-2023-list-level-3");
      switch (e) {
        case 9:
          if (o) {
            if (
              t.closest(".nav-2023-item").previousElementSibling !== null &&
              !t
                .closest(".nav-2023-item")
                .previousElementSibling.classList.contains(
                  "nav-2023-close-item"
                )
            ) {
              n.preventDefault();
              t.closest(".nav-2023-item")
                .previousElementSibling.querySelector(".nav-2023-link")
                .focus();
              return;
            }
            h.hide();
            return;
          }
          if (f[u]) {
            n.preventDefault();
            f[u]
              .querySelector(
                ".nav-2023-offcanvas-item:not(.overview-item) .nav-2023-link"
              )
              .focus();
            return;
          }
          n.preventDefault();
          r(i);
          break;
        case 27:
          n.preventDefault();
          r(i);
          break;
        case 37:
          t.closest(".nav-2023-item").previousElementSibling === null ||
            t
              .closest(".nav-2023-item")
              .previousElementSibling.classList.contains(
                "nav-2023-close-item"
              ) ||
            t
              .closest(".nav-2023-item")
              .previousElementSibling.querySelector(".nav-2023-toggler")
              .focus();
          break;
        case 39:
          t.closest(".nav-2023-item").nextElementSibling !== null &&
            t
              .closest(".nav-2023-item")
              .nextElementSibling.querySelector(".nav-2023-toggler")
              .focus();
      }
    }
    function v(n) {
      const f = n.keyCode,
        e = n.shiftKey ? n.shiftKey : !1,
        i = n.currentTarget,
        t = i.closest(".nav-2023-nav"),
        o = t.querySelectorAll(".nav-2023-list-level-2 .nav-2023-toggler"),
        u = ft(i);
      switch (f) {
        case 9:
          if (e) {
            i
              .closest(".nav-2023-offcanvas-item")
              .previousElementSibling.classList.contains("overview-item") &&
              (n.preventDefault(),
              t
                .querySelector(
                  `#nav-2023-level-2 .nav-2023-toggler[data-cvx-index="${u}"]`
                )
                .focus());
            return;
          }
          i.closest(".nav-2023-offcanvas-item").nextElementSibling === null &&
            (n.preventDefault(),
            u < o.length - 1
              ? t
                  .querySelector(
                    `#nav-2023-level-2 .nav-2023-toggler[data-cvx-index="${
                      u + 1
                    }"]`
                  )
                  .focus()
              : r(t));
          break;
        case 27:
          n.preventDefault();
          r(t);
      }
    }
    function y(n) {
      const t = n.currentTarget,
        i = n.keyCode,
        r = n.shiftKey ? n.shiftKey : !1;
      if (n.type === "click") {
        const n = t.closest(".nav-2023-offcanvas-list");
        if (n.classList.contains("nav-2023-list-level-3")) {
          n.closest(".nav-2023-nav")
            .querySelector("#nav-2023-level-2 .nav-2023-close")
            .focus();
          return;
        }
        n.parentElement
          .closest(".nav-2023-offcanvas-list")
          .querySelector(".nav-2023-back-button")
          .focus();
      }
      switch (i) {
        case 9:
          r &&
            n.currentTarget.classList.contains("nav-2023-back-button") &&
            n.preventDefault();
          break;
        case 13:
        case 32:
          n.preventDefault();
          const i = t.closest(".nav-2023-offcanvas-list");
          if (i.classList.contains("nav-2023-list-level-3")) {
            const n = bootstrap.Offcanvas.getOrCreateInstance(
              i.closest("#nav-2023-offcanvas")
            );
            i.classList.remove("show");
            n.hide();
            i.closest(".nav-2023-nav")
              .querySelector("#nav-2023-level-2 .nav-2023-close")
              .focus();
            return;
          }
          const f = bootstrap.Offcanvas.getOrCreateInstance(i);
          f.hide();
          i.parentElement
            .closest(".nav-2023-offcanvas-list")
            .querySelector(".nav-2023-back-button")
            .focus();
          break;
        case 27:
          n.preventDefault();
          u(t.closest(".nav-2023-nav"));
      }
    }
    function p(n) {
      const t = n.currentTarget.closest(".nav-2023-nav");
      n.type === "click" && u(t);
    }
    function w(n) {
      if (n.type !== "click") {
        const i = n.keyCode,
          r = n.shiftKey ? n.shiftKey : !1,
          t = n.currentTarget;
        if (i === 9) {
          if (r) {
            t.classList.contains("nav-2023-close") && n.preventDefault();
            return;
          }
          if (
            t
              .closest(".nav-2023-list-level-2")
              .classList.contains("nav-2023-list-right") &&
            t
              .closest(".nav-2023-item")
              .nextElementSibling.classList.contains("search")
          ) {
            n.preventDefault();
            return;
          }
        }
      }
    }
    function b(n) {
      const r = n.currentTarget.closest(".nav-2023-nav"),
        t = r.querySelector("#nav-2023-level-2");
      n.type === "click" &&
        t.querySelector(".nav-2023-item .nav-2023-close").focus();
      const i = n.keyCode;
      n.type === "keydown" &&
        (i === 13 || i === 32) &&
        t.querySelector(".nav-2023-item .nav-2023-close").focus();
    }
    function k(n) {
      const f = n.currentTarget,
        o = f.closest(".nav-2023-nav"),
        i = o.querySelector("#nav-2023-offcanvas"),
        s = bootstrap.Offcanvas.getOrCreateInstance(i),
        t = parseInt(f.dataset.cvxIndex, 10),
        r = i.querySelectorAll(".nav-2023-list-level-3");
      if (n.type === "click") {
        n.preventDefault();
        s.show();
        e(t, i);
        r[t].querySelector(".nav-2023-back-button").focus();
        return;
      }
      const h = n.keyCode;
      switch (h) {
        case 13:
        case 32:
          if (r[t]) {
            n.preventDefault();
            s.show();
            e(t, i);
            r[t].querySelector(".nav-2023-back-button").focus();
            return;
          }
          break;
        case 27:
          n.preventDefault();
          u(o);
      }
    }
    function d(n) {
      const t = n.currentTarget;
      if (n.type === "click" && t.classList.contains("nav-2023-toggler")) {
        n.preventDefault();
        const i = t.parentElement.querySelector(".nav-2023-offcanvas-list"),
          r = bootstrap.Offcanvas.getOrCreateInstance(i);
        r.show();
        i.querySelector(".nav-2023-back-button").focus();
        return;
      }
      const i = n.keyCode,
        r = n.shiftKey ? n.shiftKey : !1,
        f = t.closest(".nav-2023-nav");
      switch (i) {
        case 9:
          if (r) {
            t.classList.contains("nav-2023-back-button") && n.preventDefault();
            return;
          }
          t.closest(".nav-2023-offcanvas-item").nextElementSibling === null &&
            n.preventDefault();
          break;
        case 27:
          n.preventDefault();
          u(f);
      }
    }
    t.querySelectorAll(".nav-2023 .nav-2023-nav").forEach(() => {
      g();
    });
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".nav-2023 .nav-2023-nav").forEach((i) => {
        function nt() {
          if (
            (r.forEach((n, t) => {
              n.dataset.cvxIndex = t;
            }),
            tt.forEach((n) => {
              n.addEventListener("keydown", ot);
            }),
            n.innerWidth >= 992)
          ) {
            r.forEach((n) => {
              n.addEventListener("keydown", a);
            });
            f.forEach((n) => {
              n.addEventListener("keydown", v);
            });
            r.forEach((n) => {
              ["mouseenter", "focus", "touchstart"].forEach(function (t) {
                n.addEventListener(t, h);
              });
            });
            u.addEventListener("mouseleave", c);
            u.addEventListener("hide.bs.offcanvas", l);
            return;
          }
          ["click", "keydown"].forEach(function (n) {
            o.addEventListener(n, b);
            s.forEach((t) => {
              t.addEventListener(n, p);
            });
            g.forEach((t) => {
              t.addEventListener(n, y);
            });
            r.forEach((t) => {
              t.addEventListener(n, k);
            });
            e.forEach((t) => {
              t.addEventListener(n, w);
            });
            f.forEach((t) => {
              t.addEventListener(n, d);
            });
          });
        }
        function it() {
          if (n.innerWidth >= 992) {
            ["click", "keydown"].forEach(function (n) {
              o.removeEventListener(n, b);
              s.forEach((t) => {
                t.removeEventListener(n, p);
              });
              g.forEach((t) => {
                t.removeEventListener(n, y);
              });
              r.forEach((t) => {
                t.removeEventListener(n, k);
              });
              e.forEach((t) => {
                t.removeEventListener(n, w);
              });
              f.forEach((t) => {
                t.removeEventListener(n, d);
              });
            });
            return;
          }
          r.forEach((n) => {
            n.removeEventListener("keydown", a);
          });
          f.forEach((n) => {
            n.removeEventListener("keydown", v);
          });
          r.forEach((n) => {
            ["mouseenter", "focus", "touchstart"].forEach(function (t) {
              n.removeEventListener(t, h);
            });
          });
          u.removeEventListener("mouseleave", c);
          u.removeEventListener("hidden.bs.offcanvas", l);
        }
        ut(i);
        const u = i.querySelector("#nav-2023-offcanvas"),
          r = i.querySelectorAll(".nav-2023-list-level-2 .nav-2023-toggler"),
          e = i.querySelectorAll(
            ".nav-2023-list-level-2 :is(.nav-2023-button, .nav-2023-link)"
          ),
          f = i.querySelectorAll(
            ".nav-2023-list-level-3 .nav-2023-link, .nav-2023-list-level-3 .nav-2023-promo-link"
          ),
          tt = i.querySelectorAll(".nav-2023-link, .nav-2023-back-button"),
          o = i.querySelector("#nav-2023-mobile-hamburger"),
          s = i.querySelectorAll(".nav-2023-button.close-button"),
          g = i.querySelectorAll(
            ".nav-2023-button.nav-2023-back-button:not(.close-button)"
          );
        let rt = new ResizeObserver(function () {
          it();
          nt();
        });
        rt.observe(t.body);
        nt();
      });
    });
  })(window, document);
