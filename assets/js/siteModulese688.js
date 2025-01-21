"use strict";
function YT_findById(n) {
  for (const t in YT_players) if (YT_players[t].vid === n) return YT_players[t];
}
function YT_registerPlayers() {
  const n = jQuery;
  n("div[data-toggle='youtube']").each(function (t) {
    const u = n(this).attr("data-id"),
      i = "YT_" + t;
    n(this).attr("id", i);
    const r = new YT.Player(i, {
      videoId: u,
      wmode: "opaque",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        wmode: "opaque",
        t: new Date().getTime(),
      },
      events: {
        onStateChange: function (n) {
          if (n.data === -1 || n.data === 1)
            for (const n in YT_players)
              YT_players[n].vid !== i &&
                YT_players[n].pauseVideo &&
                YT_players[n].getPlayerState() === 1 &&
                YT_players[n].pauseVideo();
        },
      },
    });
    r.vid = i;
    YT_players.push(r);
  });
}
function onYouTubeIframeAPIReady() {
  YT_registerPlayers();
}
const socialService = function () {
  const n = navigator.userAgent,
    t = n.toLowerCase().match(/(iphone|ipod|ipad|android)/);
  this.showPopup = function (n, i) {
    const r = 575,
      u = 400,
      e = ($(window).width() - r) / 2,
      o = ($(window).height() - u) / 2;
    let f = n;
    const s =
      "status=1,width=" + r + ",height=" + u + ",top=" + o + ",left=" + e;
    if (t)
      $(i).attr("href", f.replace("p[url]", "u")),
        $(i).attr("target", "_blank");
    else return window.open(f, "socialPopup", s), !1;
  };
  this.showEmail = function (n) {
    const t = $("meta[name=title]").attr("content");
    let i = window.location;
    window.location.href.split("?")[0] !== null &&
      (i = window.location.href.split("?")[0]);
    const r =
      i +
      "?ss=t%26utm_campaign=page_social_share%26utm_source=email%26utm_medium=social";
    return (
      (window.location.href =
        n === undefined
          ? "mailto:?subject=Check%20out%20this%20page%20on%20" +
            location.hostname +
            "&body=" +
            t +
            "%0A%0A" +
            r
          : "mailto:?subject=Check%20out%20this%20page%20on%20" +
            location.hostname +
            "&body=" +
            t +
            "%0A%0A" +
            r +
            "%23" +
            n),
      !1
    );
  };
};
(window.SocialService = new socialService()),
  (function (n, t) {
    t.carouselMoveTrack = function (n, i) {
      const r = t("#" + n + " .slider").slick("slickGetOption", "slidesToShow"),
        u = 1 + Math.ceil(i / r);
      t("#" + n + " .indicator-active").css(
        "left",
        t("#" + n + " .indicator-active").width() * (u - 1)
      );
    };
    t.carouselInitTrack = function (n) {
      const u = t("#" + n + " .slider .item").length,
        f = t("#" + n + " .slider").slick("slickGetOption", "slidesToShow"),
        i = Math.ceil(u / f),
        e = t("#" + n + " .indicator-track").width(),
        r = Math.floor(e / i);
      if (i > 1) {
        t("#" + n + " .control").removeClass("hidden");
        t("#" + n + " .indicator-track").html("");
        t("#" + n + " .indicator-active").css("width", r);
        let u;
        for (u = 1; u <= i; u++)
          t("#" + n + " .indicator-track").append(
            '<li class="indicator-track-item" data-indicator="' +
              u +
              '" style="width: ' +
              r +
              'px"></li > '
          );
      } else t("#" + n + " .control").addClass("hidden");
    };
    t(n).ready(function () {
      t(".carousel").on("slide.bs.carousel", function () {
        if (YT_players)
          for (const n in YT_players)
            t(this).find("#" + YT_players[n].vid).length === 1 &&
              YT_players[n].getPlayerState &&
              YT_players[n].getPlayerState() === 1 &&
              YT_players[n].pauseVideo();
      });
    });
  })(document, jQuery),
  (function (n, t) {
    t.OpenDialog = function (t) {
      const i = n.getElementById(t),
        r = n.getElementById("main-wrapper");
      i.addEventListener("show.bs.modal", () => {
        n.querySelectorAll(".dialog-module.show").forEach((n) => {
          const t = bootstrap.Modal.getInstance(n);
          t.hide();
        });
        try {
          r.setAttribute("aria-hidden", !0);
        } catch (t) {
          console.log(t);
        }
      });
      i.addEventListener("hide.bs.modal", () => {
        try {
          i.removeAttribute("open");
          r.setAttribute("aria-hidden", !1);
        } catch (n) {
          console.log(n);
        }
      });
      const u = new bootstrap.Modal(i);
      u.show();
    };
    n.addEventListener("DOMContentLoaded", function () {
      const t = n.querySelectorAll(".dialog-module");
      t.forEach((t) => {
        n.querySelector("body").append(t);
        const i = new URLSearchParams(window.location.search);
        if (i.get("sc_mode") === "preview") {
          const r = i.get("sc_itemid"),
            u = t.id;
          let f;
          if (
            (r && r !== null && (f = r.indexOf(u.split("_")[1].toUpperCase())),
            f > -1)
          ) {
            const i = n.createElement("a");
            i.setAttribute("data-bs-toggle", "modal");
            i.href = `#${u}`;
            i.innerText = "Click here to preview the Dialog";
            const r = n.createDocumentFragment();
            r.appendChild(
              n
                .createElement("p")
                .appendChild(
                  document.createTextNode(
                    "Copy the text below and paste into JavaScript link field"
                  )
                ).parentNode
            );
            r.appendChild(
              n
                .createElement("p")
                .appendChild(
                  document.createTextNode(`javascript:OpenDialog('${u}')`)
                ).parentNode
            );
            r.appendChild(i);
            t.after(r);
          }
        }
      });
    });
  })(document, window),
  (function (n) {
    function t(n) {
      fetch("https://get.geojs.io/v1/ip/geo.json")
        .then((t) => {
          t.ok &&
            t.json().then((t) => {
              const i = n.querySelector(
                  ".social-row ul.global-links li.geo-link"
                ),
                r = i.getAttribute("data-cvx-countries");
              if (r !== "") {
                const u = JSON.parse(r),
                  n = u.countrylinks.find(
                    (n) =>
                      n.countrycode.trim().toLowerCase() ===
                      t.country_code.trim().toLowerCase()
                  );
                if (n) {
                  const t = i.querySelector(".cta-link");
                  t.setAttribute("href", n.link);
                  const r = t.querySelector(".cta-underline");
                  r.innerHTML = n.countryname;
                }
              }
            });
        })
        .catch((n) => console.log(n));
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".footer-2023").forEach((n) => {
        t(n);
      });
    });
  })(document),
  (function (n, t) {
    t(n).ready(function () {
      t(".general-filter:not(.tab-filter-bar) .dropdown").each(function (n, i) {
        let r = t(i);
        r.find(".dropdown-button .selected-text").text(
          r.find(".dropdown-menu .active .option-text").text()
        );
        r.find(".dropdown-menu .filter-link")
          .on("click", function (n) {
            let i = t(this);
            i.hasClass("prevent-default-click") && n.preventDefault();
            r.find(".dropdown-button")
              .attr("aria-activedescendant", i.attr("id"))
              .find(".selected-text")
              .text(i.find(".option-text").text());
            r.find(".dropdown-menu a")
              .attr("aria-selected", !1)
              .removeClass("active");
            i.attr("aria-selected", !0).addClass("active");
          })
          .on("keydown", function (n) {
            let t = n.keyCode || n.which;
            t === 32 && (n.preventDefault(), n.target.click());
          });
      });
    });
  })(document, jQuery);
const iframeOrigins = (function () {
  function t(t) {
    n.push(t);
  }
  function i() {
    return n;
  }
  let n = [
    "https://chevron.az1.qualtrics.com",
    "https://chevroncorp.gcs-web.com",
    document.location.origin,
  ];
  return { setOrigin: t, getOrigin: i };
})();
(function (n, t, i) {
  function r(n, t) {
    t.data.type === "height" &&
      n.contentWindow === t.source &&
      t.data.height &&
      i(n).height(t.data.height);
    t.data.type === "submit" &&
      n.contentWindow === t.source &&
      t.data.height &&
      i(n).height(t.data.height);
    t.data.type === "paging" &&
      n.contentWindow === t.source &&
      t.data.paging &&
      t.data.src &&
      t.data.src.indexOf("page=") > 0 &&
      n.scrollIntoView();
  }
  i(t).ready(function () {
    n.onbeforeprint = function () {
      i(".iframe").each(function () {
        const n = i(this).closest(".iframe-parent"),
          t = i(
            '<style id="' +
              n.attr("id") +
              '-stylesheet" type="text/css">@media print { #' +
              n.attr("id") +
              " .iframe { height:" +
              i(this).height() * 1.25 +
              "px !important; }}</style>"
          );
        n.prepend(t);
      });
    };
    n.onafterprint = function () {
      i(".iframe").each(function () {
        const n = i(this).closest(".iframe-parent");
        i("#" + n.attr("id") + "-stylesheet").remove();
      });
    };
    const t = window.addEventListener ? "addEventListener" : "attachEvent",
      u = window[t],
      f = t === "attachEvent" ? "onmessage" : "message";
    u(
      f,
      function (n) {
        try {
          const t = n.origin || n.originalEvent.origin;
          iframeOrigins.getOrigin().indexOf(t) >= 0 &&
            i("iframe").each(function () {
              r(this, n);
            });
        } catch (t) {
          console.log(t);
        }
      },
      !1
    );
  });
})(window, document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      t(".col-tiles .col, .facts-bar .col, .text-only .col").matchHeight({
        byRow: !0,
      });
    });
  })(document, jQuery),
  (function (n, t) {
    function i(n, t, i, r) {
      const e = t.querySelectorAll("[required]"),
        u = n.target,
        f = t.querySelectorAll(":invalid"),
        o = function (n) {
          n.classList.add("error");
          n.setAttribute("aria-invalid", "true");
          n.setAttribute("aria-describedby", r);
          i.querySelector("#" + r + " .error").innerHTML = n.validationMessage;
          i.querySelector("#" + r).classList.remove("hide");
        },
        s = function () {
          i.classList.add("hide");
          e.forEach(function (n) {
            n.classList.remove("error");
          });
        };
      switch (n.type) {
        case "input":
          u.checkValidity() || u.value === ""
            ? (u.classList.remove("error"),
              u.removeAttribute("aria-invalid"),
              u.removeAttribute("aria-describedby"),
              i.querySelector("#" + r).classList.add("hide"),
              t.querySelectorAll("[required].error").length === 0 && s())
            : (i.classList.remove("hide"), o(u));
          break;
        case "click":
        case "submit":
          f.length > 0 &&
            (e.forEach(function (n) {
              n.removeAttribute("aria-invalid");
              n.removeAttribute("aria-describedby");
            }),
            f.forEach(function (n) {
              o(n);
            }),
            i.classList.remove("hide"),
            f[0].focus());
      }
      if (n.type === "input") return !1;
    }
    function u(t) {
      const r = n.createElement("ul"),
        f = t.querySelector(".search-input"),
        u = f.id + "-search-error";
      r.setAttribute("class", "error-messages body-xs hide");
      const e =
        "<li id ='" +
        u +
        "'><a class='medium-red' href='#" +
        f.id +
        "'><span class='error'></span></a></li>";
      r.innerHTML = e;
      t.insertAdjacentElement("afterend", r);
      t.addEventListener(
        "invalid",
        function (n) {
          n.preventDefault();
        },
        !0
      );
      t.addEventListener("submit", function (n) {
        this.checkValidity() || (n.preventDefault(), i(n, t, r, u));
      });
      t.querySelector("button[type=submit]").addEventListener(
        "click",
        function (n) {
          i(n, t, r, u);
        }
      );
      t.querySelectorAll("[required]").forEach(function (n) {
        n.addEventListener("input", function (n) {
          i(n, t, r, u);
        });
      });
    }
    function r(n) {
      const t = n.parent().find(".placeholder");
      n.val().length > 0
        ? t.addClass("placeholder-state-hidden")
        : t.removeClass("placeholder-state-hidden");
    }
    function f(n) {
      u(n.querySelector(".search-bar-container"));
      t(n)
        .find(".search-input")
        .each(function () {
          r(t(this));
          t(this)
            .bind("input", function () {
              r(t(this));
            })
            .on("keyup", function (n) {
              n.key !== "" && t(this).val() !== ""
                ? t(".search-query-clear").show()
                : t(".search-query-clear").hide();
            })
            .on("blur", function () {
              t(this).val() !== ""
                ? t(".search-query-clear").show()
                : t(".search-query-clear").hide();
            });
        });
      t(n)
        .find(".clear-search-link")
        .on("click", function () {
          t(this).parent().find(".search-input").val("").focus();
          t(this).hide();
        });
    }
    t(n).ready(function () {
      const i = n.querySelectorAll(".search-bar");
      i.forEach(function (n) {
        f(n);
      });
      t(".dropdown-large.search").each(function () {
        t(this).on("shown.bs.dropdown", function (n) {
          n.stopPropagation();
          n.preventDefault();
          t(this).find(".search-input").focus();
        });
      });
      t(".dropdown-menu .search-bar, .body-home .search-bar").each(function () {
        t(this).click(function (n) {
          const i = t(this),
            r = t(n.target);
          n.stopPropagation();
          i.closest("body").hasClass("body-search") ||
            ((r.hasClass("clear-button") ||
              r.closest("a").hasClass("clear-button")) &&
              i.parent().find(".search-input").val("").focus());
        });
      });
    });
  })(document, jQuery),
  (function (n, t, i) {
    i(t).ready(function () {
      function r() {
        i(t).scroll(function () {
          const r = i(this).scrollTop();
          let t = i(n).height() * 1;
          n.innerWidth < 768 && (t = i(n).height() * 2);
          r > t
            ? i(".social-container")
                .closest("body")
                .addClass("social-container-shown")
            : i(".social-container")
                .closest("body")
                .removeClass("social-container-shown");
        });
      }
      i(".social-container").length &&
        (i("body").addClass("has-social-container"),
        r(),
        i(n).resize(function () {
          r();
        }),
        i(".social-container .social-icons-images img").each(function () {
          i(this)
            .mouseover(function () {
              const n = i(this).attr("src").replace(".png", "-selected.png");
              i(this).attr("src", n);
            })
            .mouseout(function () {
              const n = i(this).attr("src").replace("-selected.png", ".png");
              i(this).attr("src", n);
            });
        }));
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    i(t).ready(function () {
      function t() {
        const n = i("body").width();
        n <= 767 &&
          i(".table-container table").each(function () {
            i(this).find("caption.caption").width(n);
          });
      }
      t();
      i(n).resize(t);
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    i(t).ready(function () {
      i(".media-container .row > .match-height").matchHeight({ byRow: !0 });
      i(".modal").on("hidden.bs.modal", function () {
        if (i(this).find("iframe[data-toggle='youtube']").length) {
          const t = i(this).find("iframe[data-toggle='youtube']")[0].id,
            n = YT_findById(t);
          n !== undefined && n.pauseVideo && n.pauseVideo();
        }
      });
    });
    i(n).on("load", function () {
      (function () {
        let n = document.createElement("script");
        n.src = "https://www.youtube.com/iframe_api";
        const t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(n, t);
      })();
    });
  })(window, document, jQuery);
const YT_players = [];
const mediaCommonNamespace = (function (n) {
  function t(n) {
    return n.closest(".media-container").querySelector(".play-pause-button");
  }
  function r(n, i = null) {
    if ((i || (i = t(n)), n.paused)) {
      i.classList.add("paused");
      return;
    }
    i.classList.remove("paused");
  }
  function i(n, t) {
    return n.querySelector("source").getAttribute("src") !== t;
  }
  function u(t, r = 768) {
    const f = t.dataset.cvxMediaDesktop
        ? t.dataset.cvxMediaDesktop
        : t.dataset.cvxMediaMobile,
      u = t.dataset.cvxMediaMobile ? t.dataset.cvxMediaMobile : "";
    if (n.innerWidth < r && u) {
      i(t, u) && ((t.querySelector("source").src = u), t.load());
      return;
    }
    i(t, f) && ((t.querySelector("source").src = f), t.load());
  }
  function f(n) {
    n.dispatchEvent(new CustomEvent("media-start", { bubbles: !0 }));
  }
  function e(n, i = null) {
    i || (i = t(n));
    ["play", "pause", "ended"].forEach(function (t) {
      n.addEventListener(t, () => {
        i && r(n, i);
      });
    });
    i &&
      i.addEventListener("click", () => {
        o(n);
      });
  }
  function o(n) {
    if (n.paused) {
      n.play();
      return;
    }
    n.pause();
  }
  return {
    setMedia: u,
    setMediaEventListenters: e,
    dispatchMediaStartEvent: f,
  };
})(window);
(function (n, t, i) {
  function r() {
    i(".video-modal:not(.c18c) .background").each(function () {
      const t = i(this);
      let n = t.css("background");
      if (
        ((n === null || n === undefined || n === "" || n === "none") &&
          (n = t.css("background-image")),
        n !== null && n !== "none")
      ) {
        n = n.split("url(")[1].split(")")[0].replace(/["']/g, "");
        const r = new Image();
        i(r).on("load", function () {
          t.height(r.height);
          t.closest(".background-container").height(r.height);
          t.parent(".video-modal").height(r.height);
          const n = t.find(".bottom");
          n.css("bottom", n.height + "px");
        });
        r.src = n;
      }
    });
  }
  i(t).ready(function () {
    r();
    i(n).resize(function () {
      r();
    });
    i(".modal").on("hidden.bs.modal", function () {
      if (YT_players)
        for (const n in YT_players)
          i(this).find("#" + YT_players[n].vid).length === 1 &&
            YT_players[n].getPlayerState &&
            YT_players[n].getPlayerState() === 1 &&
            YT_players[n].pauseVideo();
    });
  });
})(window, document, jQuery),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".a01-video .media-wrapper").forEach((n) => {
        const t = n.querySelector("[data-toggle='youtube']"),
          i = t.dataset.playButton;
        i &&
          i === "true" &&
          n.querySelector(".video-link").addEventListener("click", (i) => {
            if (window.innerWidth >= 768) {
              i.preventDefault();
              const r = t.id,
                u = YT_findById(r);
              n.classList.add("show");
              u.playVideo();
            }
          });
      });
    });
  })(document),
  (function (n, t, i) {
    function c(n) {
      i("#" + n + " .slider")
        .find(".slick-slide")
        .removeClass("show-content");
      i("#" + n + " .slider").slick("unslick");
      o(n);
    }
    function o(n) {
      i("#" + n + " .slider").on("init reInit", function () {
        i(this).find(".slick-list").removeAttr("aria-live");
        i(this)
          .closest(".slider-container")
          .find(".arrow-container")
          .css("right", s() + 12 + "px");
        i(this).closest(".carousel").hasClass("a03b") ||
          e(i(this), i(this).find(".slick-active").data("color"));
        i(this).find(".slick-active").addClass("show-content");
      });
      i("#" + n + " .slider")
        .slick({
          slide: "#" + n + " .slider .item",
          accessibility: !0,
          cvxAccessibilityOverride: !0,
          focusOnChange: !0,
          centerMode: !0,
          centerPadding: s() + "px",
          slidesToShow: 1,
          slidesToScroll: 1,
          focusOnSelect: !0,
          dots: !0,
          autoplay: !1,
          infinite: !0,
          arrows: !0,
          appendDots: "#" + n + " .dots-container",
          nextArrow: "#" + n + " .slick-next",
          prevArrow: "#" + n + " .slick-prev",
        })
        .on("beforeChange", function (n, t, r, u) {
          i(this).closest(".carousel").hasClass("a03b") ||
            e(i(this), i(this).find(`[data-slick-index=${u}]`).data("color"));
          i(this).find(`[data-slick-index=${r}]`).removeClass("show-content");
        })
        .on("afterChange", function (n, t, r) {
          i(this).find(`[data-slick-index=${r}]`).addClass("show-content");
        });
    }
    function u() {
      h = f;
      i(".a03").each(function () {
        const n = i(this).attr("id");
        c(n);
      });
    }
    const e = (n, t) => {
      t || (t = "dark-blue");
      const i = n[0].closest(".a03");
      i.classList.forEach(function (n) {
        n.startsWith("bg-") && i.classList.remove(n);
      });
      i.classList.add("bg-" + t);
    };
    const s = function () {
      const r = [767, 991, 1199],
        i = n.innerWidth,
        f = t.body.clientWidth;
      let u = 792;
      return (
        i > 0 && i <= r[0] ? (u = 288) : i > r[0] && i <= r[1] && (u = 528),
        (f - u - 24) / 2
      );
    };
    i(t).ready(function () {
      i(".a03").each(function () {
        const n = i(this).attr("id");
        o(n);
      });
    });
    let r,
      f,
      h = n.innerWidth;
    i(n).on("resize orientationchange", function (t) {
      if (
        ((f = n.innerWidth),
        clearTimeout(r),
        (r = setTimeout(u, 500)),
        t.type === "orientationchange") ||
        (i.isMobile() && f !== h)
      )
        return clearTimeout(r), (r = setTimeout(u, 500)), !1;
      i.isMobile() || (clearTimeout(r), (r = setTimeout(u, 500)));
    });
  })(window, document, jQuery),
  (function (n) {
    function t(n) {
      n.querySelector(".dropdown-toggle .filter-by").innerHTML =
        n.querySelector(".dropdown-menu .active .filter-text").innerHTML;
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".a04").forEach((n) => {
        t(n),
          n
            .querySelector(".nav-tabs")
            .addEventListener("shown.bs.tab", function () {
              t(n);
            });
      });
    });
  })(document),
  (function (n, t) {
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".a08").forEach((i) => {
        function f(n) {
          const t =
            document.querySelector("body").scrollHeight - window.innerHeight;
          i.querySelector(".indicator-active").style.width =
            (n / t) * 100 + "%";
        }
        function e(n) {
          n.querySelectorAll(".dropdown-toggle.show").forEach((n) => {
            bootstrap.Dropdown.getInstance(n).hide();
          });
        }
        function o(n = false) {
          if (n) {
            i.classList.add("scroll-down");
            e(i);
            return;
          }
          i.classList.remove("scroll-down");
        }
        let r = 0,
          u = !1;
        t.addEventListener("scroll", function () {
          n.scrollY > r ? o(!0) : o(!1);
          r = n.scrollY;
          u ||
            (n.requestAnimationFrame(function () {
              f(r);
              u = !1;
            }),
            (u = !0));
        });
        n.addEventListener("resize", function () {
          e(i);
        });
        f(window.scrollY);
      });
    });
  })(window, document),
  (function (n, t, i) {
    function u(n, t, r, u) {
      t.classList.remove(r);
      p();
      i.ajax({
        cache: !0,
        type: "get",
        url: "/api/sitecore/newsroom/archive",
        data: n,
        success: function (n) {
          try {
            typeof n == "string" && n.startsWith("{") && (n = JSON.parse(n));
          } catch (i) {
            console.log(i);
          }
          try {
            u(n);
          } catch (i) {
            console.log(i);
            l(t, r);
          }
        },
        error: function () {
          l(t, r);
        },
      });
    }
    function o(n) {
      const t = {},
        i = new URLSearchParams(window.location.search);
      s(n);
      i.forEach((i, r) => {
        if (r === "topic" || r === "contenttype" || r === "year")
          try {
            n.querySelector(
              `.radio-button[name="${r}"][value="${i}"]`
            ).checked = !0;
            t[r] = i;
          } catch (u) {
            console.log(u);
            n.querySelector(
              `.radio-button[name="${r}"][id="all-${r}"]`
            ).checked = !0;
          }
        else r === "page" ? (t[r] = i) : r === "tags" && (t[r] = i);
      });
      u(t, n, "content-loaded", function (t) {
        f(n, t);
      });
    }
    function s(n) {
      const t = n.querySelectorAll(".newsroom-filter .radio-button"),
        i = n.querySelectorAll(".newsroom-filter .radio-button-all");
      t.forEach((n) => {
        n.checked = !1;
      });
      i.forEach((n) => {
        n.checked = !0;
      });
    }
    function h(n) {
      if ("URLSearchParams" in window) {
        const t = new URLSearchParams(window.location.search);
        t.delete("page");
        t.delete("topic");
        t.delete("contenttype");
        t.delete("year");
        n &&
          Object.keys(n).length !== 0 &&
          Object.keys(n).forEach((i) => {
            t.set(i, n[i]);
          });
        const i =
          window.location.pathname + (t.toString() ? "?" + t.toString() : "");
        c(window.location.href, i);
        history.pushState(null, "", i);
      }
    }
    function c(n, t) {
      try {
        PARSELY.beacon &&
          PARSELY.beacon.trackPageView({
            url: location.origin + t,
            urlref: n,
            js: 1,
          });
      } catch (i) {
        console.log(i);
      }
    }
    function l(
      n,
      t,
      i = "<p>An error has occured. Please refresh the browser and try again.</p>"
    ) {
      n.classList.remove(t);
      n.querySelector(".error-content").innerHTML = "";
      const r = document.createElement("p");
      r.innerHTML = `${i}`;
      n.querySelector(".error-content").appendChild(r);
      n.classList.add(t);
    }
    function p() {
      window.scrollTo({ top: 0, left: 0 });
    }
    function w(t, i) {
      if ("URLSearchParams" in window) {
        const o = {},
          e = new URLSearchParams(window.location.search);
        e.set("page", i);
        const s = n.location.pathname + "?" + e.toString();
        c(window.location.href, s);
        history.pushState(null, "", s);
        for (const [n, t] of e.entries())
          (n === "topic" ||
            n === "contenttype" ||
            n === "year" ||
            n === "page" ||
            n === "tags") &&
            (o[n] = t);
        u(o, t, r, function (n) {
          f(t, n);
        });
      }
    }
    function e(n, t, i, r) {
      const u = n
        .querySelector(".page-item-template")
        .content.firstElementChild.cloneNode(!0);
      u.querySelector(".page-number").innerHTML = t;
      u.querySelector(".page-link").dataset.cvxPage = t;
      u.querySelector(".total-pages").innerHTML = ` of ${i}`;
      t === r && u.classList.add("active");
      n.querySelector(".pagination").appendChild(u);
    }
    function b(n, t, i, r) {
      for (let u = 2; u <= r - 1; u++) {
        let o = (i - 1) / 2,
          f = (i - 1) / 2;
        t < i
          ? ((o = t - 1), (f = i - o))
          : t >= r - f && ((f = r - t), (o = i - f));
        u >= t - o && u <= t + f && e(n, u, r, t);
      }
    }
    function a(n, t, i, r, u, f) {
      switch (f) {
        case "before":
          t > (i >= 768 ? r - 1 : r) && v(n);
          break;
        case "after":
          (i >= 768 ? t + r - 1 : t + r) <= u && v(n);
      }
    }
    function v(n) {
      const t = n
        .querySelector(".ellipses-template")
        .content.firstElementChild.cloneNode(!0);
      n.querySelector(".pagination").appendChild(t);
    }
    function k(n, t, i, r) {
      const f = parseInt(
        i.querySelector(".active > .page-link").dataset.cvxPage
      );
      let u = t.dataset.cvxPage;
      u === "next" && f < r && (u = f + 1);
      u === "prev" && f > 1 && (u = f - 1);
      w(n, u);
    }
    function y(n, t) {
      const i = n.querySelector(".pagination-container"),
        r = window.innerWidth,
        u = r >= 768 ? 5 : 3;
      i.querySelector(".pagination").innerHTML = "";
      const f = parseInt(t.info.count, 10),
        o = parseInt(t.info.pagesize ? t.info.pagesize : 8, 10);
      if (f > o) {
        const s = Math.ceil(f / o),
          h = parseInt(t.info.page, 10),
          l = i
            .querySelector(".skip-to-previous-template")
            .content.firstElementChild.cloneNode(!0);
        h === 1 && l.classList.add("disabled");
        i.querySelector(".pagination").appendChild(l);
        e(i, 1, s, h);
        a(i, h, r, u, s, "before");
        b(i, h, u, s);
        a(i, h, r, u, s, "after");
        e(i, s, s, h);
        const c = i
          .querySelector(".skip-to-next-template")
          .content.firstElementChild.cloneNode(!0);
        h === s &&
          (c.classList.add("disabled"),
          (c.querySelector(".page-link").disabled = !0));
        i.querySelector(".pagination").appendChild(c);
        i.querySelectorAll(".page-link").forEach((t) => {
          t.addEventListener("click", function (r) {
            r.preventDefault();
            k(n, t, i, s);
          });
        });
      }
    }
    function d(n, i) {
      let r = new ResizeObserver(function () {
        y(n, i);
      });
      r.observe(t.body);
      y(n, i);
    }
    function g(n, t, i) {
      if (i.articles && i.articles.length > 0) {
        const r = n
          .querySelector(".list-template")
          .content.firstElementChild.cloneNode(!0);
        i.articles.forEach((t) => {
          const i = n
            .querySelector(".list-item-template")
            .content.firstElementChild.cloneNode(!0);
          i.querySelector(".secondary-link").href = t.link.url;
          t.isexternalarticle &&
            (i.querySelector(".secondary-link").target = "_blank");
          i.querySelector(".news-text").innerHTML = t.link.text;
          i.querySelector(".date").innerHTML = t.date;
          t.image.src !== null &&
            t.image.src !== "" &&
            (i.querySelector(
              ".image-container"
            ).style.backgroundImage = `url('${t.image.src}')`);
          t.contenttype === "event" ||
          t.topic === null ||
          t.topic === "" ||
          t.hidetopic
            ? i.querySelector(".category").remove()
            : (i.querySelector(".category").innerHTML = t.topic);
          r.appendChild(i);
        });
        t.appendChild(r);
      }
    }
    function nt(n, t, i) {
      i.groups &&
        i.groups.length > 0 &&
        i.groups.forEach((i) => {
          if (i.date) {
            const r = n
              .querySelector(".header-template")
              .content.firstElementChild.cloneNode(!0);
            r.innerHTML = i.date;
            t.appendChild(r);
          }
          g(n, t, i);
        });
    }
    function f(n, t) {
      const u = n.querySelector(".pagination-container");
      u.querySelector(".pagination").innerHTML = "";
      const i = n.querySelector(".content-container");
      i.innerHTML = "";
      t.info.count && t.info.count > 0
        ? (d(n, t), nt(n, i, t))
        : (i.innerHTML = `<p>${t.info.message}</p>`);
      n.classList.add(r);
    }
    const r = "content-loaded";
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".a11").forEach((t) => {
        n.addEventListener("popstate", () => {
          o(t);
        });
        o(t);
        const i = t.querySelectorAll(".radio-button");
        i.forEach((n) => {
          n.addEventListener("change", function () {
            const n = Array.from(
                t.querySelectorAll(".radio-button:checked")
              ).reduce(function (n, t) {
                return (
                  t.value !== null && t.value !== "" && (n[t.name] = t.value), n
                );
              }, {}),
              i = new URLSearchParams(window.location.search);
            i.has("tags") && (n.tags = i.get("tags"));
            u(n, t, r, function (i) {
              h(n);
              f(t, i);
            });
          });
        });
        t.querySelector(".reset-all").addEventListener("click", function (n) {
          n.preventDefault();
          const i = {},
            e = new URLSearchParams(window.location.search);
          e.has("tags") && (i.tags = e.get("tags"));
          u(i, t, r, function (n) {
            h();
            s(t);
            f(t, n);
          });
        });
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    const i = "a13Cookie",
      r = n.cookie && n.cookie.indexOf(i) >= 0,
      u = function () {
        const t = new Date();
        t.setMonth(t.getMonth() + 1);
        n.cookie = i + "=true; expires=" + t.toUTCString() + "; path=/";
      };
    t(n).ready(function () {
      t(".a13").each(function () {
        const n = t(this);
        if (!r) {
          n.on("hidden.bs.toast", function () {
            u();
          });
          n.find(".primary-link .link").on("click", function () {
            n.toast("hide");
          });
          setTimeout(function () {
            n.toast("show");
          }, 4e3);
        }
      });
    });
  })(document, jQuery),
  (function (n, t, i) {
    function r(n) {
      const i = n.find(".hero-content").height(),
        t =
          n.find(".primary .header").height() +
          n.find(".primary .focus-link-container").height();
      n.find(".secondary-container").css("top", t + (i - t) / 2 + 10 + "px");
    }
    i(t).ready(function () {
      i(".c01a.has-bg-img").each(function () {
        const n = i(this);
        r(n);
        setTimeout(function () {
          n.find(".inner-container").addClass("animation-complete");
        }, 1e3);
      });
      i(n).resize(function () {
        i(".c01a.has-bg-img").each(function () {
          r(i(this));
        });
      });
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    function o(n) {
      i("#" + n + " .slider").slick("unslick");
      i("#" + n + " .slider-bg").slick("unslick");
      e(n);
    }
    function e(n) {
      i("#" + n + " .slider").slick({
        slide: "#" + n + " .slider .item",
        accessibility: !0,
        focusOnChange: !0,
        nextArrow:
          '<button type="button" data-role="none" class="slick-next" aria-label="next"><span class="glyphicon glyphicon-chevron-caret-right" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>',
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev" aria-label="previous"><span class="glyphicon glyphicon-chevron-caret-left" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>',
        slidesPerRow: r,
        slidesToScroll: u,
        slidesToShow: f,
        infinite: !1,
        speed: 450,
        asNavFor: i("#" + n + " .slider-bg"),
      });
      i("#" + n + " .slider-bg").slick({
        slide: "#" + n + " .slider-bg .item",
        accessibility: !0,
        focusOnChange: !0,
        arrows: !1,
        slidesPerRow: r,
        slidesToScroll: u,
        slidesToShow: f,
        infinite: !1,
        speed: 850,
        dots: !1,
        centerMode: !1,
        asNavFor: i("#" + n + " .slider"),
      });
    }
    let r = 1,
      u = 1,
      f = 1;
    i(t).ready(function () {
      function u() {
        f = r;
        i(".c01c").each(function () {
          const n = i(this).attr("id");
          o(n);
          i.carouselInitTrack(n);
          i.carouselMoveTrack(n, 0);
        });
      }
      i(".c01c").each(function () {
        const n = i(this).attr("id");
        e(n);
        i.carouselInitTrack(n);
      });
      i(".c01c .slider").on("beforeChange", function (n, t, r, u) {
        i.carouselMoveTrack(i(n.currentTarget).closest(".c01c").attr("id"), u);
      });
      let t,
        r,
        f = n.innerWidth;
      i(n).on("resize orientationchange", function (e) {
        if (
          ((r = n.innerWidth), e.type === "orientationchange") ||
          (i.isMobile() && r !== f)
        )
          return clearTimeout(t), (t = setTimeout(u, 500)), !1;
        i.isMobile() || (clearTimeout(t), (t = setTimeout(u, 500)));
      });
    });
  })(window, document, jQuery),
  (function (n) {
    function t(n, t) {
      if (t.paused) {
        n.classList.add("paused");
        return;
      }
      n.classList.remove("paused");
    }
    function r(n, i) {
      if (i.paused) {
        i.play();
        t(n, i);
        return;
      }
      i.pause();
      t(n, i);
    }
    const i = new IntersectionObserver(
      function (n) {
        n.forEach((n) => {
          if (n.isIntersecting) {
            const t = n.target;
            t.classList.add("in");
            i.unobserve(t);
          }
        });
      },
      { rootMargin: "0% 0px 0% 0px", threshold: [0] }
    );
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c01f").forEach((n) => {
        const u = n.querySelector(".video"),
          f = n.querySelector(".play-pause-button");
        u &&
          (f.addEventListener("click", function () {
            r(this, u);
          }),
          u.addEventListener("ended", function () {
            t(f, this);
          }));
        i.observe(n);
      });
    });
  })(document),
  (function (n, t, i) {
    function u(n) {
      i("#" + n + " .slider")
        .on("init", function () {
          i(this).css("height", "auto").css("overflow", "visible");
        })
        .slick({
          slide: "#" + n + " .slider > .item",
          accessibility: !1,
          arrows: !0,
          appendArrows: "#" + n + " .arrows",
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="next"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>',
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="previous"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>',
          slidesPerRow: 1,
          slidesToScroll: 1,
          slidesToShow: 1,
        });
    }
    function r(n) {
      const t = i("#" + n + " .item:not(.slick-cloned)").length,
        r = i("#" + n + " .slider").slick("slickCurrentSlide"),
        u = 1 + r;
      t > 1
        ? i("#" + n + " .paging")
            .html(
              '<span class="slide-count num dark-gray">' +
                u +
                " of " +
                t +
                "</span>"
            )
            .closest(".control")
            .removeClass("hidden")
        : i("#" + n + " .paging")
            .find(".slide-count")
            .remove()
            .closest(".control")
            .addClass("hidden");
    }
    function f(t) {
      if (
        "IntersectionObserver" in n &&
        "IntersectionObserverEntry" in n &&
        "intersectionRatio" in n.IntersectionObserverEntry.prototype
      ) {
        const n = new IntersectionObserver(
          function (n) {
            n[0].isIntersecting === !0 && t.addClass("animate-in");
          },
          { threshold: [0] }
        );
        n.observe(t.closest(".c11")[0]);
      } else t.addClass("animate-in");
    }
    i(t).ready(function () {
      let t = 0;
      i(".c11").each(function () {
        const r = i(this).find(".modal-carousel-content");
        if (r.length) {
          const u = i(this).attr("id"),
            e = i(this).children("h1, h2, h3, h4, h5, h6").text()
              ? i(this).children("h1, h2, h3, h4, h5, h6").text()
              : u,
            f = i(
              i.parseHTML(
                '<div class="modal-container">  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">      <div class="modal-dialog">          <div class="modal-content">              <div class="modal-header">                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>               </div>               <div class="modal-body">                   <div id="modal-carousel" class="modal-carousel carousel-common numbering">                       <div class="row slider">                       </div>                       <div class="control centered simple-arrows hidden">                           <div class="arrows"></div>                           <div class="paging vertical-align"></div>                       </div>                   </div>               </div>           </div>       </div>   </div></div>'
              )
            );
          f.find(".modal")
            .attr("id", "modal-" + u)
            .attr("aria-label", e)
            .find(".modal-carousel")
            .attr("id", "modal-carousel-" + u);
          r.each(function () {
            i(this)
              .closest(".card-carousel-item")
              .find(".card-item-content .link > a")
              .attr("href", "#modal-" + u)
              .attr("data-item-index", t)
              .click(function (t) {
                t.preventDefault();
                i("#modal-" + u).css("height", "0");
                i("#modal-" + u)
                  .modal("show")
                  .find(".modal-carousel .slider")
                  .slick("slickGoTo", parseInt(i(this).data("item-index")));
                setTimeout(function () {
                  i(n).trigger("resize");
                  i("#modal-" + u).css("height", "auto");
                }, 250);
              });
            t++;
            f.find(".modal-body .slider").append(i(this));
          });
          i(this).append(f);
        }
      });
      i(".modal-carousel .slider").on("afterChange", function (n) {
        r(n.currentTarget.parentElement.id);
      });
      i(".modal-carousel").each(function () {
        const n = i(this).attr("id");
        u(n);
        r(n);
      });
      i(".c11 .linked-card-item").each(function () {
        f(i(this));
      });
      i(".c11 .linked-card-item .match-height").matchHeight({ byRow: !0 });
    });
  })(window, document, jQuery),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c12 .scroll-container").forEach((n) => {
        try {
          new PerfectScrollbar(n, { wheelSpeed: 0.5, wheelPropagation: !1 });
        } catch (t) {}
      });
    });
  })(document),
  (function (n, t) {
    function r(n) {
      n.forEach((n) => {
        const t = n
          .closest(".video-container")
          .querySelector(`.play-pause-button`);
        mediaCommonNamespace.setMedia(n);
        mediaCommonNamespace.setMediaEventListenters(n, t);
      });
    }
    function i(n, t) {
      const i = n.querySelectorAll(".video");
      i && t
        ? i.forEach((n) => {
            n.play();
          })
        : i &&
          !t &&
          i.forEach((n) => {
            n.pause();
          });
    }
    let u = new IntersectionObserver((n) => {
      n.forEach((n) => {
        n.isIntersecting === !0 ? i(n.target, !0) : i(n.target, !1);
      });
    });
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c17e").forEach((n) => {
        const t = n.querySelectorAll(".video");
        t != null && r(t);
        u.observe(n);
      });
    });
  })(window, document),
  (function (n, t, i) {
    i(t).ready(function () {
      function r() {
        n.innerWidth >= t
          ? i(".c18b").each(function () {
              const n =
                i(this)
                  .find(".col-content .active .match-thumb-container-height")
                  .height() - 30;
              i(this).find(".col-thumbs").css("max-height", n);
            })
          : i(".c18b").each(function () {
              i(this).find(".col-thumbs").css("max-height", "");
            });
      }
      const t = 992;
      i(".c18b .video-link").click(function (r) {
        r.preventDefault();
        r.stopPropagation();
        const f = i(this).closest(".thumb-container").data("item-index"),
          u = i(this).closest(".c18b");
        u.find(".active").removeClass("active");
        u.find(".col-content .content-" + f).addClass("active");
        u.find(".col-thumbs .thumb-" + f).addClass("active");
        n.innerWidth >= t &&
          u
            .find(".col-thumbs")
            .scrollTo(i(this).closest(".thumb-container"), 800, { axis: "y" });
      });
      r();
      i(n).resize(function () {
        r();
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      function n(n) {
        return (
          n
            ? ((n = n.split("/").pop()),
              (n = n === "jpeg" ? "jpg" : n),
              (n = "/" + n))
            : (n = ""),
          n
        );
      }
      t(".c26.box").each(function () {
        const r = t(this).attr("id"),
          i = t("#" + r);
        i.hasClass("modal-body-content") &&
          i.closest(".modal-container").addClass("c26-container");
        i.find("button.btn-secondary").each(function () {
          const r = t(this),
            f = r.attr("data-url"),
            u = t.ajax({
              type: "HEAD",
              url: f,
              success: function () {
                let t = u.getResponseHeader("Content-Length"),
                  f = n(u.getResponseHeader("Content-Type"));
                r.attr(
                  "data-size",
                  r.attr("data-size") +
                    " (" +
                    (t / 1024).toFixed(0) +
                    " KB" +
                    f +
                    ")"
                );
                i.find("button.btn-secondary").first().click();
              },
            });
        });
        i.find("button.btn-secondary").click(this, function () {
          t(this).parent().find(".btn-secondary").removeClass("active");
          t(this).addClass("active");
          i.find("div.file-info").text(t(this).attr("data-size"));
          t(this)
            .parents(".form")
            .find("a.download-link")
            .attr(
              "href",
              t(this)
                .parents(".form")
                .find("button.btn-secondary.active")
                .attr("data-url")
            );
        });
      });
    });
  })(document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      t(".c27 .match-height").matchHeight({ byRow: !0 });
    });
  })(document, jQuery),
  (function (n, t) {
    function i(n, t = 300) {
      let i = null;
      return (...r) => {
        window.clearTimeout(i),
          (i = window.setTimeout(() => {
            n.apply(this, r);
          }, t));
      };
    }
    function r(n) {
      n.click();
    }
    const u = i(r, 250);
    t(n).ready(function () {
      t(".c28").each(function () {
        const n = t(this);
        n.find(".collapse-link")
          .on("keydown", function (n) {
            const i = n.keyCode || n.which,
              r = t(n.target);
            i === 32 && (n.preventDefault(), r.click());
          })
          .on("mouseenter focusin", function () {
            u(this);
          });
      });
    });
  })(document, jQuery),
  (function (n, t, i) {
    function r() {
      i(".c39").each(function () {
        const n = i(this);
        n.find(".main-container").css("max-width", "");
        let t = 0;
        n.find(".image-container img").each(function () {
          t = Math.max(t, i(this).width());
        });
        n.find(".main-container").css("max-width", t + "px");
      });
    }
    i(t).ready(function () {
      i(".c39 .slider").on("input change", function () {
        const n = i(this).closest(".c39");
        n.find(".image-top, .text-top").css("opacity", 1 - i(this).val() / 100);
      });
      r();
      i(n).resize(function () {
        r();
      });
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    function e(n, t, e) {
      if (
        this.parent.scrollTrigger !== null &&
        this.parent.scrollTrigger !== undefined
      ) {
        let o = this.parent.scrollTrigger;
        if (n > 0 && t === 0) {
          if (o.direction === 1) {
            gsap.fromTo(
              i(".circle-clear div:nth-child(" + n + ") .content-item", e),
              { y: 0, opacity: 1 },
              {
                y: -o.direction * f,
                opacity: 0,
                stagger: r,
                ease: Expo.easeOut,
                duration: u,
              }
            );
            return;
          }
          gsap.fromTo(
            i(".circle-clear div:nth-child(" + n + ") .content-item", e),
            { y: o.direction * f, opacity: 0 },
            { y: 0, opacity: 1, stagger: r, ease: Expo.easeOut, duration: u }
          );
        } else if (t > 0 && n === 0) {
          if (o.direction === 1) {
            gsap.fromTo(
              i(".circle-clear div:nth-child(" + t + ") .content-item", e),
              { y: o.direction * f, opacity: 1 },
              { y: 0, opacity: 1, stagger: r, ease: Expo.easeOut, duration: u }
            );
            return;
          }
          gsap.fromTo(
            i(".circle-clear div:nth-child(" + t + ") .content-item", e),
            { y: 0, opacity: 1 },
            {
              y: -o.direction * f,
              opacity: 0,
              stagger: r,
              ease: Expo.easeOut,
              duration: u,
            }
          );
        } else if (n > 0 && n === t)
          gsap.to(
            i(".circle-clear div:nth-child(" + n + ") .content-item", e),
            { y: 0, opacity: 1, stagger: r, ease: Expo.easeOut, duration: u }
          );
        else {
          if (o.direction === 1) {
            gsap.fromTo(
              i(".circle-clear div:nth-child(" + n + ") .content-item", e),
              { y: 0, opacity: 1 },
              {
                y: -o.direction * f,
                opacity: 0,
                stagger: r,
                ease: Expo.easeOut,
                duration: u,
              }
            );
            gsap.fromTo(
              i(".circle-clear div:nth-child(" + t + ") .content-item", e),
              { y: o.direction * f, opacity: 0 },
              { y: 0, opacity: 1, stagger: r, ease: Expo.easeOut, duration: u }
            );
            return;
          }
          gsap.fromTo(
            i(".circle-clear div:nth-child(" + n + ") .content-item", e),
            { y: o.direction * f, opacity: 0 },
            { y: 0, opacity: 1, stagger: r, ease: Expo.easeOut, duration: u }
          );
          gsap.fromTo(
            i(".circle-clear div:nth-child(" + t + ") .content-item", e),
            { y: 0, opacity: 1 },
            {
              y: -o.direction * f,
              opacity: 0,
              stagger: r,
              ease: Expo.easeOut,
              duration: u,
            }
          );
        }
      }
    }
    function o(n) {
      const t = i(n).find(".circle-animation")[0];
      t !== undefined &&
        (gsap.to(i(".circle-clear .content-item", n), {
          y: 0,
          opacity: 0,
          stagger: r,
          ease: Expo.easeOut,
          duration: 0.01,
        }),
        gsap.to(i(".circle-clear", n), {
          translateX: getComputedStyle(t).getPropertyValue(
            "--circle-clear-init-x"
          ),
          translateY: getComputedStyle(t).getPropertyValue(
            "--circle-clear-init-y"
          ),
          duration: 0.5,
        }),
        gsap.to(i(".circle-solid", n), {
          translateX: getComputedStyle(t).getPropertyValue(
            "--circle-solid-init-x"
          ),
          translateY: getComputedStyle(t).getPropertyValue(
            "--circle-solid-init-y"
          ),
          duration: 0.5,
        }),
        gsap.to(i(".circle-empty", n), {
          translateX: getComputedStyle(t).getPropertyValue(
            "--circle-empty-init-x"
          ),
          translateY: getComputedStyle(t).getPropertyValue(
            "--circle-empty-init-y"
          ),
          duration: 0.5,
        }));
    }
    function s(n) {
      let r = undefined;
      gsap.registerPlugin(ScrollTrigger);
      r !== undefined &&
        (o(n),
        r.pause(0),
        ScrollTrigger.getById("circle-animation-" + n.id).kill(!0));
      const u = gsap.matchMedia();
      u.add("(min-width: 992px)", function () {
        r = gsap.timeline({
          scrollTrigger: {
            id: "circle-animation-" + n.id,
            trigger: i(".circle-wrapper", n),
            scrub: 0.5,
            start: "top top",
            end: "+=400%",
            pin: !0,
            markers: !1,
            invalidateOnRefresh: !0,
            anticipatePin: 1,
          },
        });
        const t = i(".circle-clear .content", n).length;
        r.addLabel("start")
          .to(i(".circle-clear", n), { duration: 0.01 })
          .call(e, [1, 1, n]);
        for (let u = 1; u <= t; u++)
          r.to(i(".circle-clear", n), { duration: 1 }),
            u !== t ? r.call(e, [u, u + 1, n]) : r.call(e, [u, 0, n]);
        r.to(i(".circle-clear", n), { duration: 0.01 });
      });
      u.add("(max-width: 991px)", function () {
        o();
        r = gsap.timeline({
          scrollTrigger: {
            id: "circle-animation-" + n.id,
            trigger: i(".circle-wrapper", n),
            scrub: 1,
            start: "top top",
            end: "+=300%",
            pin: !0,
            anticipatePin: 1,
            invalidateOnRefresh: !0,
          },
        });
        const t = i(".circle-clear .content", n).length;
        r.addLabel("start")
          .to(i(".circle-clear", n), { duration: 0.01 })
          .call(e, [1, 1]);
        for (let u = 1; u <= t; u++)
          r.to(i(".circle-clear", n), { duration: 1 }),
            u !== t ? r.call(e, [u, u + 1]) : r.call(e, [u, 0]);
        r.to(i(".circle-clear", n), { duration: 0.01 });
      });
      let f = new ResizeObserver(function () {
        o(n);
      });
      f.observe(t.body);
    }
    const r = 0.2,
      u = 0.8,
      f = 60;
    i(t).ready(function () {
      i(n).on("load", function () {
        t.querySelectorAll(".c40").forEach((n) => {
          s(n);
        });
      });
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    i(t).ready(function () {
      i(n).on("load", function () {
        n.requestAnimationFrame(function () {
          i(".c41").each(function () {
            function h() {
              f = setInterval(function () {
                r.html(
                  '<span class="opaque">' +
                    t.slice(0, u + 1) +
                    '</span><span class="transparent">' +
                    t.slice(u + 1, t.length) +
                    "</span>"
                );
                u++;
                u > t.length && (clearInterval(f), e());
              }, o);
            }
            function e() {
              r.find("span.transparent")
                .removeClass("transparent")
                .addClass("opaque");
              n.find(".stop-animation").hide();
              n.addClass("animation-paused");
              clearInterval(f);
            }
            const n = i(this),
              r = n.find(".quote-text");
            let t = r.text(),
              u = 0;
            const o = 50;
            let f = 0;
            const s = function () {
              r.html('<span class="transparent">' + t + "</span>");
            };
            n.find(".stop-animation").on("click", function () {
              e();
            });
            s();
            const c = function (n) {
              const t = new IntersectionObserver(
                function (i) {
                  i.forEach((i) => {
                    i.isIntersecting && (h(), t.unobserve(n));
                  });
                },
                { rootMargin: "50% 0px 50% 0px", threshold: [0.25] }
              );
              t.observe(n);
            };
            c(n.find("blockquote")[0]);
          });
        });
      });
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    function r(t, i) {
      const o = t.closest(".c44").querySelector(".slider"),
        r = i.length;
      let u = r > 3 ? r - 3 : r;
      const f = n.innerWidth;
      let e = r > 3 ? r * 33.33 : 100;
      f < 768
        ? ((u = r > 1 ? r - 1 : r), (e = r > 1 ? r * 100 : 100))
        : f >= 768 &&
          f < 992 &&
          ((u = r > 2 ? r - 2 : r), (e = r > 2 ? r * 50 : 100));
      t.style.width = e + "%";
      o.max = u;
      o.style.setProperty("--c44SlideThumbWidth", 100 / (u + 1) + "%");
    }
    t.addEventListener("DOMContentLoaded", function () {
      i(".c44 .c44-flip-card .match-height").matchHeight({ byRow: !0 });
      t.querySelectorAll(".c44").forEach((n) => {
        const t = n.querySelector(".slide-scroll .slide-scroll-container");
        globalNamespace.makeHorizontalSliderDraggable(t);
        n.querySelectorAll(".c44-container").forEach((n) => {
          const i = n.querySelectorAll(".c44-flip-card");
          let u = new ResizeObserver(function () {
            r(n, i);
            globalNamespace.initSlider(t, !1);
          });
          u.observe(n.closest(".c44"));
          r(n, i);
          globalNamespace.initSlider(t);
          i.forEach((n, t) => {
            (n.querySelector(".item").innerHTML = t + 1),
              (n.querySelector(".total").innerHTML = i.length),
              n.querySelectorAll(".flip-action").forEach((t) => {
                t.addEventListener("click", (t) => {
                  t.preventDefault(), n.classList.toggle("flipped");
                });
              });
          });
        });
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    const i = function (n) {
        let t = n.querySelector(".sequence");
        const i = n.dataset.classname;
        t.classList.contains(i) || t.classList.add(i);
      },
      r = function (n) {
        const t = new IntersectionObserver(
          function (r) {
            r.forEach((r) => {
              r.isIntersecting && (i(n), t.unobserve(n));
            });
          },
          { rootMargin: "0% 0px 0% 0px", threshold: [0.85] }
        );
        t.observe(n);
      };
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c48 .animation").forEach((i) => {
        const u = i.dataset.format.trim(),
          o = i.dataset.sequenceValues.split("|");
        n.requestAnimationFrame(function () {
          r(i);
        });
        const s = i.querySelector(".prefix"),
          f = i.querySelector(".postfix"),
          h = i.querySelector(".sequence"),
          e = "{x}";
        if (u.includes(e)) {
          const n = u.split(e);
          s.innerHTML = n[0];
          f.innerHTML = n[1];
        } else f.innerHTML = u;
        o.forEach((n) => {
          let i = t.createElement("div");
          i.innerHTML = n;
          h.appendChild(i);
        });
      });
    });
  })(window, document),
  (function (n, t) {
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c51").forEach((t) => {
        globalNamespace.makeHorizontalSliderDraggable(
          t.querySelector(".table-responsive")
        );
        const i = t.querySelectorAll(".accord-item");
        t.querySelectorAll(".collapse").forEach((n, i) => {
          n.addEventListener("show.bs.collapse", () => {
            const n = t.querySelectorAll(".image-container .img-fluid");
            n.forEach((n) => {
              n.classList.remove("show");
            });
            n[i].classList.add("show");
          });
        });
        const r = new ResizeObserver(function () {
          if (n.innerWidth >= 768)
            return (
              i.forEach((n) => {
                const t = n.querySelector(".accord-button");
                n.removeAttribute("role");
                n.removeAttribute("tabindex");
                n.classList.remove("show");
                n.classList.remove("active");
                t.removeAttribute("disabled");
                t.removeAttribute("tabindex");
              }),
              !1
            );
          const r = t
            .querySelector(".tab-link.active")
            .getAttribute("aria-controls");
          t.querySelector(`#${r}`).classList.add("show", "active");
          i.forEach((n) => {
            const t = n.querySelector(".accord-button");
            n.setAttribute("role", "tabpanel");
            n.setAttribute("tabindex", "0");
            t.setAttribute("disabled", "disabled");
            t.setAttribute("tabindex", "-1");
          });
        });
        r.observe(t);
      });
    });
  })(window, document),
  (function (n, t, i) {
    function a(n) {
      i("#" + n + " .slider").slick("unslick");
      c();
      h(n);
    }
    function h(n) {
      i("#" + n + " .slider")
        .slick({
          slide: "#" + n + " .slider .item",
          accessibility: !0,
          cvxAccessibilityOverride: !0,
          focusOnChange: !0,
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="next"><span class="glyphicon glyphicon-chevron-caret-right" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>',
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="previous"><span class="glyphicon glyphicon-chevron-caret-left" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>',
          slidesPerRow: u,
          slidesToScroll: f,
          slidesToShow: e,
          infinite: !1,
          responsive: [
            {
              breakpoint: 1200,
              settings: { slidesToShow: 3, slidesToScroll: 3, slidesPerRow: 1 },
            },
            {
              breakpoint: 992,
              settings: { slidesToShow: 3, slidesToScroll: 3, slidesPerRow: 1 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1, slidesToScroll: 1, slidesPerRow: 1 },
            },
          ],
        })
        .on("beforeChange", function (n, t, r, u) {
          i.carouselMoveTrack(i(n.currentTarget).closest(".n03").attr("id"), u);
        });
    }
    function c() {
      const t = n.innerWidth;
      t > 0 && t <= [767, 991, 1199][0]
        ? ((u = 1), (f = 1), (e = 1))
        : ((u = 1), (f = 3), (e = 3));
    }
    function s() {
      l = o;
      i(".n03").each(function () {
        const n = i(this).attr("id");
        a(n);
        i.carouselInitTrack(n);
        i.carouselMoveTrack(n, 0);
      });
    }
    let u = 1,
      f = 1,
      e = 1;
    i(t).ready(function () {
      i(".n03").each(function () {
        const n = i(this).attr("id");
        c();
        h(n);
        i.carouselInitTrack(n);
      });
    });
    let r,
      o,
      l = n.innerWidth;
    i(n).on("resize orientationchange", function (t) {
      if (
        ((o = n.innerWidth), t.type === "orientationchange") ||
        (i.isMobile() && o !== l)
      )
        return clearTimeout(r), (r = setTimeout(s, 500)), !1;
      i.isMobile() || (clearTimeout(r), (r = setTimeout(s, 500)));
    });
  })(window, document, jQuery),
  (function (n, t) {
    function r(t, i) {
      n.cookie = t + "=" + i + "; expires=0";
    }
    function u(t) {
      return n.cookie.indexOf(t + "=") >= 0
        ? new RegExp(t + "=([^ ;]+)", "gi").exec(n.cookie)[1]
        : "";
    }
    function i(n) {
      n === "list"
        ? (t("body, .s06-view").removeClass("grid").addClass("list"),
          t(".s06-filter-bar .toggle-grid-view-grid").removeClass("selected"),
          t(".s06-filter-bar .toggle-grid-view-list").addClass("selected"))
        : n === "grid" &&
          (t("body, .s06-view").removeClass("list").addClass("grid"),
          t(".s06-filter-bar .toggle-grid-view-list").removeClass("selected"),
          t(".s06-filter-bar .toggle-grid-view-grid").addClass("selected"));
    }
    t(n).ready(function () {
      const n = "stories-view";
      if (t(".s06-filter-bar .toggle-grid-view-grid").length === 1) {
        let t = "grid";
        u(n) === "list" && (t = "list");
        i(t);
        r(n, t);
      } else i("grid");
      t(".s06-filter-bar .toggle-grid-view-grid").click(function (t) {
        t.preventDefault();
        i("grid");
        r(n, "grid");
      });
      t(".s06-filter-bar .toggle-grid-view-list").click(function (t) {
        t.preventDefault();
        i("list");
        r(n, "list");
      });
    });
  })(document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      t(".s07 .match-height").matchHeight({ byRow: !0 });
    });
  })(document, jQuery),
  (function (n, t, i) {
    function o(n) {
      i("#" + n + " .slider .description").each(function () {
        i(this).hasClass("see-more-active") &&
          i(this).trunk8("revert").removeClass("see-more-active");
      });
      i("#" + n + " .slider").slick("unslick");
      r(n);
    }
    function r(n) {
      i("#" + n + " .slider")
        .slick({
          slide: "#" + n + " .slider .item",
          accessibility: !0,
          cvxAccessibilityOverride: !0,
          focusOnChange: !0,
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="next"><span class="glyphicon glyphicon-chevron-caret-right" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>',
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="previous"><span class="glyphicon glyphicon-chevron-caret-left" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>',
          slidesPerRow: u,
          slidesToScroll: f,
          slidesToShow: e,
          infinite: !1,
        })
        .on("beforeChange", function (n, t, r, u) {
          i.carouselMoveTrack(i(n.currentTarget).closest(".x01").attr("id"), u);
        });
    }
    function s() {
      function u() {
        f = r;
        i(".x01").each(function () {
          const n = i(this).attr("id");
          o(n);
          i.carouselInitTrack(n);
          i.carouselMoveTrack(n, 0);
        });
      }
      let t,
        r,
        f = n.innerWidth;
      i(n).on("resize orientationchange", function (e) {
        if (
          ((r = n.innerWidth), e.type === "orientationchange") ||
          (i.isMobile() && r !== f)
        )
          return clearTimeout(t), (t = setTimeout(u, 500)), !1;
        i.isMobile() || (clearTimeout(t), (t = setTimeout(u, 500)));
      });
    }
    let u = 1,
      f = 1,
      e = 1;
    i(t).ready(function () {
      i(".x01").each(function () {
        const n = i(this).attr("id");
        i("#" + n + " .slider").on("init", function () {
          i(this)
            .find(".text-container .description")
            .each(function () {
              const n = i(this),
                t = n.height(),
                r = n.prop("scrollHeight"),
                u = parseInt(n.css("line-height"), 10),
                f = Math.floor(t / u);
              r > t &&
                n
                  .trunk8({
                    lines: f,
                    parseHTML: !0,
                    fill: '<a href="#" class="see-more-link black body-2 bg-white"> &hellip; (see more)</a>',
                    tooltip: !1,
                  })
                  .addClass("see-more-active");
            });
        });
        r(n);
        i.carouselInitTrack(n);
      });
      i(".x01")
        .on("click", ".see-more-link", function (n) {
          n.preventDefault();
          const t = i(this).closest(".description");
          t.trunk8("revert").removeClass("see-more-active");
          try {
            new PerfectScrollbar(t[0], {
              wheelSpeed: 0.5,
              wheelPropagation: !1,
            });
          } catch (r) {}
        })
        .on("keydown", ".see-more-link", function (n) {
          const t = n.keyCode || n.which,
            r = i(n.target);
          t === 32 && (n.preventDefault(), r.click());
        });
      i(".x01 .chapter-slide-link").click(function (n) {
        n.preventDefault();
        const t = i(this).data("slide");
        i(this).closest(".slider").slick("slickGoTo", t);
      });
      s();
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    i(t).ready(function () {
      if (n.location.hash) {
        const t = decodeURIComponent(n.location.hash.replace("#", ""));
        i(".x03 .panel a.collapsed[data-bs-toggle=collapse]").each(function () {
          i(this).find("h4").text().trim().toLowerCase() ===
            t.trim().toLowerCase() &&
            (i(this).click(),
            i("html, body").animate(
              { scrollTop: i(this).offset().top - 150 },
              2e3
            ));
        });
      }
      i(".x03").each(function () {
        i(this)
          .find(".panel-heading > a")
          .on("keydown", function (n) {
            const t = n.keyCode || n.which,
              r = i(n.target);
            t === 32 && (n.preventDefault(), r.click());
          });
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      t(".x06b .social-icons-images a").each(function () {
        t(this).on("keydown", function (n) {
          const i = n.keyCode || n.which,
            r = t(n.target);
          i === 32 && (n.preventDefault(), r[0].click());
        });
      });
    });
  })(document, jQuery),
  (function (n, t, i) {
    function r(n) {
      n.find('a[data-bs-toggle="tab"]')
        .on("shown.bs.tab", function () {
          i(this).attr("aria-expanded", "").attr("aria-selected", "true");
        })
        .on("hidden.bs.tab", function () {
          i(this).attr("aria-expanded", "").attr("aria-selected", "false");
        });
      n.find(".nav .secondary-link")
        .on("keydown", function (n) {
          const r = n.keyCode || n.which,
            t = i(n.target);
          switch (r) {
            case 37:
              n.preventDefault();
              n.stopPropagation();
              t.closest(".nav").find(".secondary-link").attr("tabindex", "-1");
              t.closest("li").is(":first-child")
                ? t
                    .closest(".nav")
                    .find("li")
                    .last()
                    .find(".secondary-link")
                    .attr("tabindex", "0")
                    .focus()
                    .click()
                : t
                    .closest("li")
                    .prev()
                    .find(".secondary-link")
                    .attr("tabindex", "0")
                    .focus()
                    .click();
              break;
            case 39:
              n.preventDefault();
              n.stopPropagation();
              t.closest(".nav").find(".secondary-link").attr("tabindex", "-1");
              t.closest("li").is(":last-child")
                ? t
                    .closest(".nav")
                    .find("li")
                    .first()
                    .find(".secondary-link")
                    .attr("tabindex", "0")
                    .focus()
                    .click()
                : t
                    .closest("li")
                    .next()
                    .find(".secondary-link")
                    .attr("tabindex", "0")
                    .focus()
                    .click();
          }
        })
        .on("click", function (n) {
          const r = i(n.target);
          let t = i(n.target);
          t.hasClass("secondary-link") || (t = r.closest(".secondary-link"));
          t.parent().children().attr("tabindex", "-1");
          t.attr("tabindex", "0");
        });
    }
    i(t).ready(function () {
      if (n.location.hash) {
        const t = n.location.hash.replace("#", "");
        i('[data-bs-toggle="tab"]').each(function () {
          i(this).text().toLowerCase() === t.toLowerCase() &&
            (i(this).tab("show"),
            i("html, body").animate({ scrollTop: i(this).offset().top }, 2e3));
        });
      }
      i(".x09").each(function () {
        r(i(this));
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    function i(n) {
      n.querySelector(".offcanvas-button .filter-by").innerHTML =
        n.querySelector(".offcanvas .cta-link.active .cta-underline").innerHTML;
    }
    function u(n) {
      const t = n.querySelectorAll(".nav-link");
      t.forEach((t) => {
        t.addEventListener("shown.bs.tab", () => {
          i(n), r(n);
        });
      });
    }
    function r(n) {
      const t = n.querySelector(".offcanvas.show");
      t && bootstrap.Offcanvas.getOrCreateInstance(t).hide();
    }
    function f(t) {
      if (n.location.hash) {
        const i = n.location.hash.replace("#", ""),
          r = t.querySelectorAll(".nav-link");
        r.forEach((n) => {
          n.querySelector(".cta-underline").textContent.toLowerCase() ===
            i.toLowerCase() &&
            (bootstrap.Tab.getOrCreateInstance(n).show(), t.scrollIntoView());
        });
      }
    }
    function e(n) {
      const t = n.querySelector(".offcanvas");
      t &&
        (t.addEventListener("show.bs.offcanvas", () => {
          n.classList.add("show");
        }),
        t.addEventListener("hidden.bs.offcanvas", () => {
          n.classList.remove("show");
        }));
    }
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".x09r").forEach((t) => {
        f(t),
          i(t),
          u(t),
          e(t),
          n.addEventListener("resize", function () {
            r(t);
          });
      });
    });
  })(window, document);
(window.PDFREPORT === null || window.PDFREPORT === undefined) &&
  (window.PDFREPORT = {
    SetFormAction: function (n, t) {
      let i = "";
      t(n)
        .find(".downloads-card.checked")
        .each(function () {
          i += t(this).data("value");
        });
      const r =
        "~/Reports/" + t(n).find("input[name=c]").val() + "/PDFReport.ashx";
      t(n).find("input[name=p]").val(btoa(i));
      t(n).attr("action", r);
      n.submit();
    },
  }),
  (function (n, t, i) {
    function u(n) {
      const t = n.find(".checkbox-header-custom");
      n.find(".checkbox-item-custom").length ===
      n.find(".checkbox-item-custom.checked").length
        ? t.addClass("checked").attr("aria-checked", !0)
        : t.removeClass("checked").attr("aria-checked", !1);
    }
    function f(n) {
      const t = n.find(".select-all");
      n.find(".checkbox-custom").length ===
      n.find(".checkbox-custom.checked").length
        ? t.addClass("clear-all").text("clear all")
        : t.removeClass("clear-all").text("select all");
    }
    function e() {
      i(".x101 .download-desc").each(function () {
        const n = i(this),
          u = n.closest(".text-container").height(),
          f = u - n.closest(".text-container").find(".checkbox").height(),
          e = parseInt(n.css("line-height"), 10);
        let t = Math.floor(f / e),
          r = !1;
        n.removeClass("truncate").removeClass("buffer");
        t === 1 && (r = !0);
        n.children().length >= 1 && (t += 1);
        n.trunk8({
          lines: t,
          parseHTML: !0,
          fill: "&hellip;",
          tooltip: !1,
          onTruncate: function () {
            n.addClass("truncate");
            r && n.addClass("buffer");
          },
        });
      });
    }
    function o(n) {
      n.click(function (n) {
        if ((n.preventDefault(), i(this).hasClass("disabled"))) return !1;
        i(this).hasClass("checked") || i(this).hasClass("disabled")
          ? i(this).removeClass("checked").attr("aria-checked", !1)
          : i(this).addClass("checked").attr("aria-checked", !0);
        try {
          u(i(this).closest(".dl-row"));
          f(i(this).closest(".downloads-view"));
          r();
        } catch (t) {
          console.log(t);
        }
      });
    }
    const r = function () {
      let t = 0,
        n = 0;
      i(".x101 .checkbox-item-custom.checked").each(function () {
        n += 1;
        const r = parseFloat(
          i(this).data("filesize").toLowerCase().replace("mb", "")
        );
        t += r;
      });
      n === 1
        ? i(".x101 .file-items").text("item")
        : i(".x101 .file-items").text("items");
      n > 0
        ? (i(".x101 .report-details").addClass("dl-sticky"),
          i(".x101").closest("body").addClass("x101-page"),
          i(".x101 .download-btn").prop("disabled", !1))
        : (i(".x101 .report-details").removeClass("dl-sticky"),
          i(".x101").closest("body").removeClass("x101-page"),
          i(".x101 .download-btn").prop("disabled", !0));
      i(".x101 .filesize").text(t.toFixed(2));
      i(".x101 .filecount").text(n);
    };
    i(t).ready(function () {
      e();
      i(n).resize(function () {
        e();
      });
      i(".x101 .checkbox-custom").on("keydown", function (n) {
        const t = n.keyCode || n.which,
          r = i(n.target);
        t === 32 && (n.preventDefault(), r.click());
      });
      o(i(".x101 .checkbox-item-custom"));
      i(".x101 .checkbox-header-custom").click(function (n) {
        n.preventDefault();
        i(this).hasClass("checked") || i(this).hasClass("disabled")
          ? (i(this).removeClass("checked").attr("aria-checked", !1),
            i(this)
              .closest(".dl-row")
              .find(".downloads-list .checkbox-item-custom")
              .each(function () {
                i(this).removeClass("checked").attr("aria-checked", !1);
              }))
          : (i(this).addClass("checked").attr("aria-checked", !0),
            i(this)
              .closest(".dl-row")
              .find(".downloads-list .checkbox-item-custom")
              .each(function () {
                i(this).addClass("checked").attr("aria-checked", !0);
              }));
        try {
          u(i(this).closest(".dl-row"));
          f(i(this).closest(".downloads-view"));
          r();
        } catch (t) {
          console.log(t);
        }
      });
      i(".x101 .select-all").click(function (n) {
        n.preventDefault();
        i(this).hasClass("clear-all")
          ? i(".x101 .checkbox-custom")
              .removeClass("checked")
              .attr("aria-checked", !1)
          : i(".x101 .checkbox-custom")
              .addClass("checked")
              .attr("aria-checked", !0);
        try {
          u(i(this).closest(".dl-row"));
          f(i(this).closest(".downloads-view"));
          r();
        } catch (t) {
          console.log(t);
        }
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    function i() {
      let n;
      const t = {},
        i = window.location.href
          .slice(window.location.href.indexOf("?") + 1)
          .split("&");
      for (const r in i) (n = i[r].split("=")), (t[n[0]] = n[1]);
      return t;
    }
    function r(n) {
      return n
        ? '<div class="modal-container video-modal">  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">      <div class="modal-dialog">          <div>              <div class="modal-header">                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="visually-hidden">close</span></button>               </div>          <div class="modal-body">       </div></div></div></div></div>'
        : '<div class="modal-container">  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">      <div class="modal-dialog">          <div class="modal-content">              <div class="modal-header">                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>               </div>          <div class="modal-body">       </div></div></div></div></div>';
    }
    const u = window.location.search.indexOf("sc_mode=preview");
    t(".modal-body-content").each(function () {
      const f = i().sc_itemid,
        n = t(this).prop("id");
      let s = t(this).hasClass("video-modal-style"),
        e;
      f && f !== null && (e = f.indexOf(n.split("_")[1].toUpperCase()));
      const h = "'" + n + "'";
      if (u > -1 && e > -1) {
        let i =
          "<p>Copy the text below and paste into JavaScript link field <p>";
        i +=
          "<p>javascript:OpenModal(" +
          h +
          ')</p><a data-bs-toggle="modal" href="#' +
          n +
          '-modal">Click here to preview the Modal display</a>';
        t(this).after(i);
      }
      const o = t(t.parseHTML(r(s)));
      o.find(".modal")
        .attr("id", n + "-modal")
        .find(".modal-body")
        .append(t(this));
      t("body").append(o);
    });
    n.OpenModal = function (n) {
      t("#" + n + "-modal").modal("show");
    };
  })(window, jQuery),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      const t = (n) => {
        const t = new IntersectionObserver(
          function (t) {
            t.forEach((t) => {
              t.isIntersecting && n.classList.add("show");
            });
          },
          { threshold: [0.5] }
        );
        t.observe(n);
      };
      n.querySelectorAll(".body-newsroom .newsroom-image-fade").forEach((n) => {
        t(n);
      });
    });
  })(document),
  (function (n) {
    n.addEventListener("DOMContentLoaded", () => {
      function i(n) {
        n.classList.add("fade-in");
      }
      function r(n) {
        n.forEach((n) => {
          (n.style.display = "none"), n.classList.remove("fade-in");
        });
      }
      function u(n) {
        n.style.display = "initial";
      }
      let t = n.querySelectorAll(".c53 .accordion");
      t.forEach((n) => {
        n.addEventListener("show.bs.collapse", function (t) {
          const f = t.target.dataset.itemIndex,
            e = t.target.parentNode;
          if (
            (n.querySelectorAll("button.accordion-button").forEach((n) => {
              n.disabled = !1;
            }),
            (e.querySelector("button.accordion-button").disabled = !0),
            !n.parentNode.classList.contains("standalone"))
          ) {
            let t = n.parentNode.querySelectorAll(".accordion-img"),
              e = t[f];
            r(t);
            u(e);
            i(e);
          }
        }),
          n.addEventListener("hide.bs.collapse", function (n) {
            const t = n.target.parentNode;
            t.querySelector("button.accordion-button").disabled &&
              n.preventDefault();
          });
      });
    });
  })(document),
  (function (n, t) {
    function i(n, t) {
      const i = gsap.matchMedia();
      i.add(
        {
          isDesktop: "(min-width: 768px)",
          isTabletOrMobile: "(max-width: 767.99px)",
        },
        () => {
          const i = gsap.timeline();
          i.fromTo(
            n.querySelector(".background"),
            { scale: t === "zoom-in" ? 1 : 1.1 },
            { scale: t === "zoom-in" ? 1.1 : 1, duration: 1 },
            "openingImage"
          );
          ScrollTrigger.create({
            trigger: n,
            start: "top 120px",
            end: "100%",
            scrub: 1,
            animation: i,
            invalidateOnRefresh: !0,
          });
        }
      );
    }
    function u(n) {
      const t = n.classList.contains("has-image"),
        r = function () {
          if (!t) {
            const t = n.querySelector(".type-header");
            let i = new SplitText(t, { type: "lines" });
            gsap
              .timeline()
              .to(t, { opacity: 1 }, "fade")
              .fromTo(
                i.lines,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, ease: "in", stagger: 0.3 },
                "fade"
              );
          }
        },
        i = new IntersectionObserver(
          function (n) {
            n.forEach((n) => {
              if (n.isIntersecting) {
                const t = n.target;
                t.classList.contains("has-image") && t.classList.add("in");
                r();
                i.unobserve(t);
              }
            });
          },
          {
            rootMargin: t ? "0% 0px 0% 0px" : "-50% 0% -50% 0%",
            threshold: [0],
          }
        );
      i.observe(n);
    }
    function f(n) {
      mediaCommonNamespace.setMedia(n);
      mediaCommonNamespace.setMediaEventListenters(n);
      const t = new IntersectionObserver(
        function (n) {
          n.forEach((n) => {
            if (n.isIntersecting) {
              const i = n.target;
              i.play();
              t.unobserve(i);
            }
          });
        },
        { rootMargin: "0% 0px 0% 0px", threshold: [0.1] }
      );
      t.observe(n);
    }
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
    const r = new IntersectionObserver(
      function (n) {
        n.forEach((n) => {
          if (n.isIntersecting) {
            const t = n.target;
            splitText(t);
            r.unobserve(t);
          }
        });
      },
      { rootMargin: "-50% 0% -50% 0%", threshold: [0] }
    );
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c54").forEach((t) => {
        function o(n, t = 300) {
          let i;
          return (...r) => {
            clearTimeout(i),
              (i = setTimeout(() => {
                n.apply(this, r);
              }, t));
          };
        }
        u(t);
        n.requestAnimationFrame(function () {
          const n = t.dataset.chevAnimation;
          n !== "" && i(t, n);
        });
        const r = t.querySelector(".video");
        r != null && f(r);
        let e = n.innerWidth;
        n.addEventListener(
          "resize",
          o(() => {
            const t = n.innerWidth;
            t !== e && (r != null && mediaCommonNamespace.setMedia(r), (e = t));
          })
        );
      });
    });
  })(window, document),
  (function (n) {
    function t(n, t) {
      let i = t.dataset.backgroundColor;
      n &&
        n.slide.dataset.backgroundColor &&
        (i = n.slide.dataset.backgroundColor);
      const r = Array.from(t.classList).find((n) =>
        n.startsWith("background-color-")
      );
      `background-color-${i}` !== r &&
        (t.classList.remove(r), t.classList.add(`background-color-${i}`));
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c56").forEach((i) => {
        function e(n) {
          if (((n = n || window.event), n.keyCode == "37"))
            r.go(r.Components.Controller.getPrev());
          else if (n.keyCode == "39") {
            const n = r.Components.Controller.getNext();
            n != -1 && r.go(n);
          }
        }
        const u = i.querySelector(".splide"),
          f = u.querySelectorAll(".splide__slide");
        f.length > 1 && u.querySelector(".control").classList.add("show");
        const r = new Splide(u, {
          start: 0,
          perPage: 1,
          perMove: 1,
          autoWidth: !1,
          focus: "center",
          padding: "6%",
          trimSpace: !1,
          mediaQuery: "min",
          updateOnMove: !0,
          breakpoints: {
            768: { padding: "16%" },
            992: { perPage: 3, padding: "12%" },
            1200: { padding: "16%" },
            1400: { padding: "20%" },
            1600: { padding: "24%" },
          },
        });
        r.on("ready", () => {
          t(r.Components.Slides.getAt(0), i), r.refresh();
        });
        r.mount();
        r.on("active", (n) => {
          t(n, i);
        });
        f.forEach((n, t) => {
          n.addEventListener("focus", () => {
            n.classList.contains("is-active") || r.go(t);
          });
        });
        n.onkeydown = e;
      });
    });
  })(document),
  (function (n, t) {
    function r(n) {
      t.addEventListener("media-start", function (t) {
        n !== t.target && n.pause();
      });
    }
    function u(n, t) {
      n.length &&
        n.forEach((n) => {
          const u = n.querySelector(".audio");
          if (
            (n.addEventListener("click", function (n) {
              n.preventDefault();
            }),
            u)
          ) {
            t.on("move", () => {
              u.pause();
            });
            mediaCommonNamespace.setMediaEventListenters(u, n);
            const f = i(n.querySelectorAll(".button-progress-bar"));
            ["play", "pause", "ended"].forEach(function (n) {
              u.addEventListener(n, () => {
                n === "play"
                  ? (mediaCommonNamespace.dispatchMediaStartEvent(u), f.start())
                  : f.stop();
              });
            });
            r(u);
          }
        });
    }
    const i = function (n) {
      function i(n, t) {
        return (
          (n = Math.ceil(n)),
          (t = Math.floor(t)),
          Math.floor(Math.random() * (t - n + 1)) + n
        );
      }
      function r(n, t) {
        const u = Math.round(n.length * t),
          r = [];
        while (r.length < u) {
          const t = i(0, n.length - 1);
          r.includes(t) || r.push(t);
        }
        return r.map((t) => n[t]);
      }
      function u(n, t) {
        const u = 3,
          f = 20,
          e = r(n, t);
        e.forEach((n) => {
          const t = i(u, f);
          n.style.height = `${t}px`;
        });
      }
      function f() {
        if (!t) {
          const i = 0.6;
          t = setInterval(() => u(n, i), 100);
        }
      }
      function e() {
        t && (clearInterval(t), (t = null));
      }
      let t = null;
      return { start: f, stop: e };
    };
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c57").forEach((n) => {
        const i = n.querySelector(".splide"),
          r = n.querySelector(".events"),
          f = i.querySelectorAll(".splide__slide"),
          h = n.querySelectorAll(".audio-card");
        f.length > 1 && i.querySelector(".control").classList.add("show");
        let e = "center",
          o = !1,
          s = {
            768: { padding: "16%" },
            992: { perPage: 3, padding: "12%" },
            1200: { padding: "16%" },
            1400: { padding: "20%" },
            1600: { padding: "24%" },
          };
        r &&
          ((e = "left"),
          (o = !0),
          (s = { 375: { padding: "3.73%" }, 768: { padding: "11.75%" } }));
        const t = new Splide(i, {
          start: 0,
          perPage: 1,
          perMove: 1,
          autoWidth: !1,
          slideFocus: !0,
          keyboard: !0,
          focus: e,
          padding: "6%",
          trimSpace: o,
          mediaQuery: "min",
          updateOnMove: !0,
          flickPower: 300,
          dragMinThreshold: { mouse: 0, touch: 10 },
          breakpoints: s,
        });
        t.on("ready", () => {
          t.refresh();
        });
        t.mount();
        t.on("move", () => {
          if (t.index >= 1 && !r) {
            n.querySelector(".opening-content").classList.add("hide");
            return;
          }
          r || n.querySelector(".opening-content").classList.remove("hide");
        });
        f.forEach((n, i) => {
          n.addEventListener("focus", () => {
            n.classList.contains("is-active") || t.go(i);
          });
        });
        u(h, t);
      });
    });
  })(document, window),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c58").forEach((n) => {
        const i = n.querySelector(".splide"),
          r = i.querySelectorAll(".splide__slide");
        r.length > 1 && i.querySelector(".control").classList.add("show");
        const t = [...r].some((n) => n.classList.contains("timeline-slide")),
          u = new Splide(i, {
            perPage: 1,
            gap: 16,
            perMove: 1,
            focus: "center",
            padding: t ? 0 : "6%",
            trimSpace: !1,
            start: 0,
            mediaQuery: "min",
            breakpoints: {
              768: { gap: 24, padding: t ? "14%" : "16%" },
              992: { padding: t ? "16%" : "12%" },
              1200: { padding: t ? "20%" : "16%" },
              1400: { padding: t ? "22%" : "20%" },
              1600: { padding: t ? "25%" : "24%" },
            },
          });
        u.mount();
      });
    });
  })(document),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c61").forEach((n) => {
        const t = n.querySelector("[data-toggle='youtube']");
        n.querySelector(".video-link").addEventListener("click", (i) => {
          if (window.innerWidth >= 768) {
            i.preventDefault();
            const r = t.id,
              u = YT_findById(r);
            n.classList.add("show");
            n.querySelector(".video-link").classList.add("fade-out");
            u.playVideo();
          }
        });
      });
    });
  })(document),
  (function (n, t) {
    function r(n) {
      const t = gsap.matchMedia();
      t.add(
        {
          isDesktop: `(min-width: 992px)`,
          isMobile: `(max-width: 767.99px)`,
          isTablet: `(min-width:768px) and (max-width: 991.99px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (t) => {
          let { isMobile: i, reduceMotion: r } = t.conditions,
            u = i ? 0.5 : 0.18;
          return (
            r ||
              (n.quoteAnimationTl &&
                n.quoteAnimationTl.scrollTrigger &&
                (n.quoteAnimationTl.scrollTrigger.kill(),
                n.quoteSplit.revert()),
              (n.quoteSplit = new SplitText(n.querySelector(".quote p"), {
                type: "lines",
              })),
              (n.quoteAnimationTl = gsap.timeline({
                scrollTrigger: {
                  trigger: n,
                  start: "top center",
                  end: "90% center",
                  scrub: 1,
                  invalidateOnRefresh: !0,
                },
              })),
              n.quoteAnimationTl
                .set(n.querySelector(".quote"), { opacity: 1 })
                .set(n.quoteSplit.lines, { opacity: 0 })
                .to(n.querySelector("img"), { scale: u }, "start")
                .fromTo(
                  n.quoteSplit.lines,
                  { y: 50, opacity: 0 },
                  { opacity: 1, y: 0, stagger: 0.3 },
                  "start+=0.2"
                )
                .fromTo(
                  n.querySelector(".name-position p"),
                  { y: 50, opacity: 0 },
                  { opacity: 1, y: 0, stagger: 0.3 },
                  "-=0.2"
                )),
            () => {}
          );
        }
      );
    }
    function u(n, t = 300) {
      let i;
      return (...r) => {
        clearTimeout(i),
          (i = setTimeout(() => {
            n.apply(this, r);
          }, t));
      };
    }
    function i() {
      t.requestAnimationFrame(function () {
        let t;
        n.querySelectorAll(".c62").forEach((n) => {
          n.querySelector(".animated") && r(n, t);
        });
      });
    }
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
    t.addEventListener(
      "resize",
      u(() => {
        i();
      })
    );
    n.addEventListener("DOMContentLoaded", function () {
      i();
    });
  })(document, window),
  (function (n) {
    const t = new IntersectionObserver(
      function (n) {
        n.forEach((n) => {
          if (n.isIntersecting) {
            const i = n.target;
            i.classList.add("in");
            setTimeout(() => {
              i.classList.remove("opening-animation");
            }, 4e3);
            t.unobserve(i);
          }
        });
      },
      { rootMargin: "0% 0px -90% 0px", threshold: [0] }
    );
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c64").forEach((n) => {
        t.observe(n);
      });
    });
  })(document),
  (function (n) {
    function t(n) {
      return fetch("/api/sitecore/StockQuote/GetStockQuoteData", {
        method: "GET",
      }).then((t) => {
        t.ok &&
          t.json().then((t) => {
            if (!t.Error) {
              const u = parseFloat(
                  t.Response["Global Quote"]["05. price"]
                ).toFixed(2),
                i = parseFloat(
                  t.Response["Global Quote"]["09. change"]
                ).toFixed(2),
                r = i > 0 ? "+" : "",
                f = parseFloat(
                  t.Response["Global Quote"]["10. change percent"]
                ).toFixed(2),
                e = t.Response["Global Quote"]["01. symbol"];
              n.querySelector(".stock").innerHTML = "$" + u;
              n.querySelector(".change").innerHTML = `${r}${i} (${r}${f}%)`;
              n.querySelector(
                ".timestamp"
              ).innerHTML = `${e} as of ${t.TimeStamp}`;
              return;
            }
            n.querySelector(".timestamp").innerHTML = t.Error;
          });
      });
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c67").forEach((n) => {
        const i = () => {
          setInterval(function () {
            t(n);
          }, 3e5);
        };
        t(n);
        i();
      });
    });
  })(document),
  (function (n) {
    function i([t, i]) {
      const r = n.createElement("p");
      return (
        r.classList.add("stock-info"),
        (r.innerHTML = `<span class="left">${t}</span>
                        <span class="right">${i}</span>`),
        r
      );
    }
    function t(t) {
      return fetch("/api/sitecore/StockQuote/GetStockQuoteInfo", {
        method: "GET",
      }).then((r) => {
        r.ok &&
          r.json().then((r) => {
            if (!r.Error) {
              const h = parseFloat(r.Response.lastTrade).toFixed(2),
                f = parseFloat(r.Response.changeNumber).toFixed(2),
                e = f > 0 ? "+" : "",
                c = parseFloat(r.Response.changePercent).toFixed(2),
                o = r.Response.symbol,
                l = t.querySelector(".stock-info-container"),
                u = [];
              u.push(["NYSE", o]);
              u.push(["Current", `$${h}`]);
              u.push(["Change", `${e}${f} (${e}${c}%)`]);
              const s = n.createDocumentFragment();
              u.forEach((n) => {
                s.appendChild(i(n));
              });
              l.replaceChildren(s);
              t.querySelector(
                ".timestamp"
              ).innerHTML = `${o} as of ${r.Response.timeStamp}`;
              return;
            }
            t.querySelector(".timestamp").innerHTML = r.Error;
          });
      });
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c67a").forEach((n) => {
        const i = () => {
          setInterval(function () {
            t(n);
          }, 3e5);
        };
        t(n);
        i();
      });
    });
  })(document),
  (function (n, t) {
    function r(t, i, r) {
      if (r) {
        i.forEach((n, i) => {
          if (i < t) {
            n.classList.add("prev");
            return;
          }
          n.classList.remove("prev");
        });
        return;
      }
      i.forEach((i, r) => {
        r >= t &&
          n.setTimeout(() => {
            i.classList.remove("prev");
          }, "750");
      });
    }
    function o(n) {
      n.forEach((n) => {
        const t = n.closest(".c70").querySelector(`.play-pause-button`);
        mediaCommonNamespace.setMedia(n);
        mediaCommonNamespace.setMediaEventListenters(n, t);
      });
    }
    function s(n, t) {
      const i = n.root.querySelectorAll(".content-container .list-item"),
        u = n.Components.Controller.getIndex(!0);
      t > u ? r(t, i, !0) : r(t, i, !1);
      i.forEach((n) => n.classList.remove("active"));
      i[t].classList.add("active");
    }
    function i(n, t = true) {
      if (n !== null) {
        const i = n.querySelector(".video");
        i && t ? i.play() : i && (i.pause(), (i.currentTime = 0));
      }
    }
    function u(n, t = 0) {
      if (n !== null) {
        const { Controller: r } = n.Components,
          { Autoplay: u } = n.Components,
          { Pagination: f } = n.Components,
          i = "animate-progress";
        if (u.isPaused()) {
          n.root.classList.remove(i);
          return;
        }
        n.root.classList.add(i);
        const e = r.getIndex(),
          o = t * 100;
        f
          .getAt(e)
          .button.querySelector(
            ".button-progress-bar"
          ).style.backgroundSize = `${o}% 100%`;
      }
    }
    function f(n, t) {
      const r = n.querySelector(".control");
      let i = Array.from(t).find((n) => n.startsWith("background-color-dark-"));
      if (i) {
        i = i.split("background-color-dark-")[1];
        const n = Array.from(r.classList).find((n) =>
          n.startsWith("control-color-")
        );
        r.classList.remove(n);
        r.classList.add(`control-color-${i}`);
      }
    }
    function e(n, t) {
      (n.classList.contains("nav-first-module-no-adjustment") ||
        n.classList.contains("nav-first-module-adjustment")) &&
        globalNamespace.setBodyColorTheme(t);
    }
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c70").forEach((t) => {
        function w(n, t = 300) {
          let i;
          return (...r) => {
            clearTimeout(i),
              (i = setTimeout(() => {
                n.apply(this, r);
              }, t));
          };
        }
        const l = t.querySelectorAll(".video");
        o(l);
        const h = t.querySelector(".splide"),
          a = h.querySelectorAll(".splide__slide");
        a.length > 1
          ? h.querySelector(".control").classList.add("show")
          : a.length === 1 &&
            a[0].firstElementChild.classList.contains("video-container") &&
            h
              .querySelector(".control")
              .classList.add("show-play-pause-button-only");
        const r = new Splide(h, {
          type: "loop",
          arrows: !1,
          focus: "center",
          trimSpace: !1,
          start: 0,
          autoplay: !0,
          pauseOnHover: !1,
          resetProgress: !1,
          interval: 6e3,
          intersection: { inView: { autoplay: !0 }, outView: { autoplay: !1 } },
        });
        r.on("ready", function () {
          const { Controller: o } = r.Components,
            { Elements: n } = r.Components,
            u = o.getIndex();
          f(t, n.slides[u].classList);
          e(t, n.slides[u].classList);
          i(n.slides[u], !0);
        });
        r.on("intersection:in", function () {
          setTimeout(() => {
            t.classList.add("intersected");
          }, 1e3);
        });
        r.on("pagination:mounted", function (n) {
          n.items.forEach(function (n) {
            n.button.innerHTML = `<span class="button-progress-bar"></span>`;
          });
        });
        r.on("autoplay:playing", function (n) {
          u(r, n);
        });
        r.mount(window.splide.Extensions);
        const { Controller: c } = r.Components,
          { Elements: y } = r.Components,
          { Autoplay: v } = r.Components;
        r.on("autoplay:pause", function () {
          const n = c.getIndex();
          i(y.slides[n], !1);
        });
        r.on("visible", function (n) {
          i(n.slide, !0);
          e(t, n.slide.classList);
        });
        r.on("move", function (n) {
          s(r, n);
          f(t, y.slides[n].classList);
          u(r);
        });
        r.on("hidden", function (n) {
          i(n.slide, !1);
        });
        t.querySelectorAll(".splide__pagination__page").forEach((n) => {
          n.addEventListener("click", () => {
            v.pause();
          });
        });
        t.querySelector(".splide__toggle").addEventListener("click", () => {
          v.isPaused() || c.getIndex() !== c.getEnd() || (c.go(0), v.play());
        });
        let p = n.innerWidth;
        n.addEventListener(
          "resize",
          w(() => {
            const t = n.innerWidth;
            t !== p &&
              (l != null &&
                l.forEach((n) => {
                  mediaCommonNamespace.setMedia(n);
                }),
              (p = t));
          })
        );
      });
    });
  })(window, document),
  (function (n) {
    function t(n) {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const t = gsap.matchMedia();
      t.add(
        {
          isDesktop: "(min-width: 768px)",
          isTabletOrMobile: "(max-width: 767.99px)",
        },
        (t) => {
          const { isDesktop: u } = t.conditions,
            f = new SplitText(n.querySelector(".header .type-display"), {
              type: "lines",
              linesClass: "lines",
            }),
            e = gsap
              .timeline()
              .fromTo(
                f.lines,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.1 }
              );
          gsap.set(n.querySelector(".header"), { zIndex: -2 });
          ScrollTrigger.create({
            trigger: n.querySelector(".header"),
            start: "top top",
            scrub: !0,
            pin: !0,
            pinSpacing: !1,
            invalidateOnRefresh: !0,
          });
          ScrollTrigger.create({
            trigger: n.querySelector(".header .header-text"),
            start: "top 70%",
            end: "top 20%",
            animation: e,
            scrub: !0,
            invalidateOnRefresh: !0,
          });
          const i = n.querySelectorAll(".panels section"),
            r = n.querySelectorAll(".dialog-text .dialog-item"),
            o = u ? 64 : 28;
          ScrollTrigger.create({
            trigger: n.querySelector(".dialog"),
            start: () => `bottom ${i[0].offsetHeight - o}`,
            endTrigger: i[i.length - 1],
            end: "top top",
            pin: !0,
            pinSpacing: !1,
            scrub: !0,
            invalidateOnRefresh: !0,
          });
          i.forEach((t, u) => {
            function f() {
              n.querySelector(".dialog .cta-link-parent").href =
                t.bg.dataset.linkUrl;
              n.querySelector(".dialog .cta-link-parent").target =
                t.bg.dataset.linkTarget;
              const i = n.querySelector(".dialog .background").classList;
              i.forEach((n) => {
                n.includes("background-color-") &&
                  i.replace(n, t.bg.dataset.backgroundColor);
              });
            }
            if (
              ((t.bg = t.querySelector(".bg")),
              u !== i.length - 1 &&
                gsap.fromTo(
                  t.bg,
                  { y: 0 },
                  {
                    y: () => window.innerHeight * 0.5,
                    ease: "none",
                    scrollTrigger: {
                      trigger: t,
                      start: "top top",
                      end: "bottom top",
                      scrub: !0,
                      invalidateOnRefresh: !0,
                    },
                  }
                ),
              ScrollTrigger.create({
                trigger: t,
                start: "top center",
                onEnter: f,
                invalidateOnRefresh: !0,
              }),
              ScrollTrigger.create({
                trigger: t,
                start: "bottom bottom",
                onLeaveBack: f,
                invalidateOnRefresh: !0,
              }),
              u >= 1)
            ) {
              const i = gsap.timeline({
                scrollTrigger: {
                  trigger: t,
                  start: () => "top bottom",
                  end: "top top",
                  scrub: !0,
                },
              });
              i.to(
                n.querySelector(".dialog .dialog-text"),
                { y: () => u * -r[0].offsetHeight, duration: 0.5 },
                "fade"
              )
                .to(r[u - 1], { opacity: 0, duration: 0.5 }, "fade")
                .to(r[u], { opacity: 1, duration: 0.5 }, "fade");
            }
          });
        }
      );
      const r = n.querySelectorAll(".video");
      i(r);
    }
    function i(n) {
      n.forEach((n) => {
        const t = n.closest(".c71").querySelector(`.play-pause-button`);
        mediaCommonNamespace.setMedia(n);
        mediaCommonNamespace.setMediaEventListenters(n, t);
      });
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c71").forEach((n) => {
        setTimeout(() => t(n), 1);
      });
    });
  })(document),
  (function (n, t) {
    function r(n) {
      n.forEach((n) => {
        const t = n
          .closest(".video-container")
          .querySelector(`.play-pause-button`);
        mediaCommonNamespace.setMedia(n);
        mediaCommonNamespace.setMediaEventListenters(n, t);
      });
    }
    function i(n, t) {
      const i = n.querySelectorAll(".video");
      i && t
        ? i.forEach((n) => {
            n.play();
          })
        : i &&
          !t &&
          i.forEach((n) => {
            n.pause();
          });
    }
    let u = new IntersectionObserver((n) => {
      n.forEach((n) => {
        n.isIntersecting === !0 ? i(n.target, !0) : i(n.target, !1);
      });
    });
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c72").forEach((n) => {
        const t = n.querySelectorAll(".video");
        t != null && r(t);
        u.observe(n);
      });
    });
  })(window, document),
  (function (n) {
    function t(n) {
      gsap.registerPlugin(ScrollTrigger);
      const t = n.querySelector(".heading-container");
      t &&
        ScrollTrigger.create({
          trigger: t,
          start: "top",
          end: "100%",
          scrub: !0,
          pin: !0,
          pinSpacing: !1,
          invalidateOnRefresh: !0,
        });
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c73").forEach((n) => {
        t(n);
      });
    });
  })(document),
  (function (n, t) {
    function i(n) {
      mediaCommonNamespace.setMedia(n);
      mediaCommonNamespace.setMediaEventListenters(
        n,
        n.closest(".inner-container").querySelector(".play-pause-button")
      );
      n.play();
    }
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c74").forEach((n) => {
        function f(n, t = 300) {
          let i;
          return (...r) => {
            clearTimeout(i),
              (i = setTimeout(() => {
                n.apply(this, r);
              }, t));
          };
        }
        (n.classList.contains("nav-first-module-no-adjustment") ||
          n.classList.contains("nav-first-module-adjustment")) &&
          globalNamespace.setBodyColorTheme(n.classList);
        const r = n.querySelector(".video");
        r != null && i(r);
        let u = t.innerWidth;
        t.addEventListener(
          "resize",
          f(() => {
            const n = t.innerWidth;
            n !== u && (r != null && mediaCommonNamespace.setMedia(r), (u = n));
          })
        );
      });
    });
  })(document, window),
  (function (n, t) {
    function i(t) {
      const i = t.querySelector(".card-container"),
        r = i.querySelector(".card-list");
      if (window.innerWidth < 768) {
        r.style.height = "";
        return;
      }
      const u = i.querySelectorAll(".card-item"),
        f = 24,
        e = function (t) {
          return parseInt(n.getComputedStyle(t).marginTop, 10);
        },
        o = Array.from(u).reduce(
          (n, t, i) => (i % 2 == 0 ? n + t.offsetHeight + f : n),
          0
        ),
        s = Array.from(u).reduce((n, t, i) => {
          if (Math.abs(i % 2) === 1) {
            const r = i === 1 ? e(t) : 0;
            return n + t.offsetHeight + f + r;
          }
          return n;
        }, 0);
      r.style.height = Math.max(o, s) + "px";
    }
    function u(t) {
      gsap.registerPlugin(ScrollTrigger);
      const i = gsap.matchMedia();
      i.add("(min-width: 768px)", function () {
        const e = t.querySelector(".animation-container"),
          i = e.querySelector(".card-container"),
          s = e.querySelector(".cta-container"),
          r = () => n.innerHeight,
          o = () => r() - s.offsetTop,
          u = () => (i.offsetHeight < r() ? r() : i.offsetHeight),
          f = gsap.timeline();
        f.fromTo(
          s,
          { y: () => u() + o() },
          { y: 0, ease: "in", duration: 1 },
          "start"
        );
        f.fromTo(
          i,
          { y: 0 },
          { y: () => -(u() + o()), ease: "in", duration: 1 },
          "start"
        );
        f.fromTo(
          i,
          { y: () => -(u() + o()) },
          { y: () => -(u() + r()), ease: "in", duration: 1 }
        );
        ScrollTrigger.create({
          trigger: e,
          start: "top",
          end: "200%",
          scrub: !0,
          pin: !0,
          pinSpacing: !0,
          animation: f,
          invalidateOnRefresh: !0,
        });
      });
    }
    function f(n) {
      n.forEach((n) => {
        const t = n
          .closest(".video-container")
          .querySelector(`.play-pause-button`);
        mediaCommonNamespace.setMedia(n);
        mediaCommonNamespace.setMediaEventListenters(n, t);
      });
    }
    function r(n, t) {
      const i = n.querySelectorAll(".video");
      i && t
        ? i.forEach((n) => {
            n.play();
          })
        : i &&
          !t &&
          i.forEach((n) => {
            n.pause();
          });
    }
    let e = new IntersectionObserver((n) => {
      n.forEach((n) => {
        n.isIntersecting === !0 ? r(n.target, !0) : r(n.target, !1);
      });
    });
    n.addEventListener("load", function () {
      t.querySelectorAll(".c75").forEach((t) => {
        i(t), n.dispatchEvent(new Event("resize"));
      });
    });
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c75").forEach((n) => {
        n.classList.contains("scroll-animation") && u(n);
        ScrollTrigger.addEventListener("refreshInit", () => {
          i(n);
        });
        const t = n.querySelectorAll(".video");
        t != null && f(t);
        e.observe(n);
      });
    });
  })(window, document),
  (function (n, t) {
    function i(n) {
      const t = (n - (n % 3600)) / 3600,
        i = ((n - (n % 60)) / 60) % 60,
        r = n % 60;
      return (
        (t ? t + ":" : "") +
        (i ? i + ":" : "0:") +
        (r ? Math.floor(r).toString().padStart(2, "0") : "00")
      );
    }
    function f(n) {
      const t = n.offsetWidth;
      return Math.floor(t / 14);
    }
    function u(t, i, r) {
      t.innerHTML = "";
      const u = f(t),
        e = r.slice(0, u);
      e.forEach((r, u) => {
        const e = n.createElement("li");
        e.classList.add("audio-progress-item");
        const f = n.createElement("button");
        f.classList.add("btn", "button-progress");
        f.type = "button";
        f.dataset.cvxWaveIndex = u;
        const o = n.createElement("span");
        o.classList.add("button-progress-bar");
        o.style.height = `${r}px`;
        f.appendChild(o);
        e.appendChild(f);
        t.appendChild(e);
        f.addEventListener("click", () => {
          const n = t.querySelectorAll(".audio-progress-item").length;
          i.currentTime = i.duration * (u / n);
        });
      });
    }
    let r = [
      20, 30, 40, 50, 40, 60, 80, 50, 40, 60, 70, 60, 50, 40, 30, 50, 60, 40,
      50, 60, 50, 70, 80, 60, 40, 30, 20, 40, 50, 60, 40, 70, 80, 60, 50, 30,
      40, 50, 40, 60, 80, 60, 40, 60, 80, 60, 30, 40, 20, 30, 60, 40, 50, 60,
      50, 70, 80, 60, 40, 30, 40, 30, 50, 60, 40, 70, 80, 60, 70, 80, 60, 40,
      30, 20, 40, 50, 60, 40, 30, 60,
    ];
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c76").forEach((n) => {
        function s(n, t = 300) {
          let i;
          return (...r) => {
            clearTimeout(i),
              (i = setTimeout(() => {
                n.apply(this, r);
              }, t));
          };
        }
        const f = n.querySelector(".audio");
        if (f) {
          const e = n.querySelector(".audio-progress");
          mediaCommonNamespace.setMediaEventListenters(
            f,
            n.querySelector(".play-pause-button")
          );
          f.addEventListener("play", function () {
            mediaCommonNamespace.dispatchMediaStartEvent(f);
          });
          t.addEventListener("media-start", function (n) {
            f !== n.target && f.pause();
          });
          f.addEventListener("timeupdate", () => {
            const r = e.querySelectorAll(".audio-progress-item"),
              u = f.currentTime,
              o = r.length * (u / f.duration),
              t = Math.floor(o);
            n.querySelector(".current-time").innerHTML = i(u);
            r.forEach((n, i) => {
              if (i < t) {
                n.querySelector(".button-progress").classList.add("active");
                n.querySelector(".button-progress-bar").style.backgroundSize =
                  "";
                return;
              }
              if (i === t) {
                n.querySelector(".button-progress").classList.add("active");
                n.querySelector(
                  ".button-progress-bar"
                ).style.backgroundSize = `${(o - t) * 100}% 100%`;
                return;
              }
              n.querySelector(".button-progress").classList.remove("active");
              n.querySelector(".button-progress-bar").style.backgroundSize = "";
            });
          });
          n.querySelector(".fast-forward-button").addEventListener(
            "click",
            () => {
              f.currentTime += 15;
            }
          );
          n.querySelector(".rewind-button").addEventListener("click", () => {
            f.currentTime -= 15;
          });
          u(e, f, r);
          f.addEventListener("loadeddata", () => {
            (n.querySelector(".current-time").innerHTML = i(f.currentTime)),
              (n.querySelector(".total-time").innerHTML = i(f.duration));
          });
          let o = t.innerWidth;
          t.addEventListener(
            "resize",
            s(() => {
              const n = t.innerWidth;
              n !== o && (u(e, f, r), (o = n));
            })
          );
        }
      });
    });
  })(document, window),
  (function (n, t) {
    function u(n, t, i, r) {
      t.classList.remove(i);
      l();
      let u =
        "?tags=" +
        n.tags +
        "&excludeLocalArticles=false&returnMatchingTagsOnly=true";
      n.page !== undefined && (u += "&page=" + n.page);
      const f = "/api/sitecore/newsroom/Archive" + u;
      fetch(f, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((n) => {
          n.ok && n.json().then((n) => r(n));
        })
        .catch((n) => {
          console.log(n), c(t, i);
        });
    }
    function f(n) {
      const t = {};
      let i = n.getAttribute("data-cvx-tags");
      t.tags = i;
      const r = new URLSearchParams(window.location.search);
      r.forEach((n, i) => {
        i === "page" && (t[i] = n);
      });
      u(t, n, "content-loaded", function (t) {
        h(n, t);
      });
    }
    function c(
      n,
      t,
      i = "<p>An error has occured. Please refresh the browser and try again.</p>"
    ) {
      n.classList.remove(t);
      n.querySelector(".error-content").innerHTML = "";
      const r = document.createElement("p");
      r.innerHTML = `${i}`;
      n.querySelector(".error-content").appendChild(r);
      n.classList.add(t);
    }
    function l() {
      window.scrollTo({ top: 0, left: 0 });
    }
    function a(t, i) {
      if ("URLSearchParams" in window) {
        const f = {},
          e = new URLSearchParams(window.location.search);
        e.set("page", i);
        const o = n.location.pathname + "?" + e.toString();
        history.pushState(null, "", o);
        let s = t.getAttribute("data-cvx-tags");
        f.tags = s;
        for (const [n, t] of e.entries()) n === "page" && (f[n] = t);
        u(f, t, r, function (n) {
          h(t, n);
        });
      }
    }
    function i(n, t, i, r) {
      const u = n
        .querySelector(".page-item-template")
        .content.firstElementChild.cloneNode(!0);
      u.querySelector(".page-number").innerHTML = t;
      u.querySelector(".page-link").dataset.cvxPage = t;
      u.querySelector(".total-pages").innerHTML = ` of ${i}`;
      t === r && u.classList.add("active");
      n.querySelector(".pagination").appendChild(u);
    }
    function v(n, t, r, u) {
      for (let f = 2; f <= u - 1; f++) {
        let o = (r - 1) / 2,
          e = (r - 1) / 2;
        t < r
          ? ((o = t - 1), (e = r - o))
          : t >= u - e && ((e = u - t), (o = r - e));
        f >= t - o && f <= t + e && i(n, f, u, t);
      }
    }
    function e(n, t, i, r, u, f) {
      switch (f) {
        case "before":
          t > (i >= 768 ? r - 1 : r) && o(n);
          break;
        case "after":
          (i >= 768 ? t + r - 1 : t + r) <= u && o(n);
      }
    }
    function o(n) {
      const t = n
        .querySelector(".ellipses-template")
        .content.firstElementChild.cloneNode(!0);
      n.querySelector(".pagination").appendChild(t);
    }
    function y(n, t, i, r) {
      const f = parseInt(
        i.querySelector(".active > .page-link").dataset.cvxPage
      );
      let u = t.dataset.cvxPage;
      u === "next" && f < r && (u = f + 1);
      u === "prev" && f > 1 && (u = f - 1);
      a(n, u);
    }
    function s(n, t) {
      const r = n.querySelector(".pagination-container"),
        u = window.innerWidth,
        f = u >= 768 ? 5 : 3;
      r.querySelector(".pagination").innerHTML = "";
      const o = parseInt(t.info.count, 10),
        s = parseInt(t.info.pagesize ? t.info.pagesize : 8, 10);
      if (o > s) {
        const h = Math.ceil(o / s),
          c = parseInt(t.info.page, 10),
          a = r
            .querySelector(".skip-to-previous-template")
            .content.firstElementChild.cloneNode(!0);
        c === 1 && a.classList.add("disabled");
        r.querySelector(".pagination").appendChild(a);
        i(r, 1, h, c);
        e(r, c, u, f, h, "before");
        v(r, c, f, h);
        e(r, c, u, f, h, "after");
        i(r, h, h, c);
        const l = r
          .querySelector(".skip-to-next-template")
          .content.firstElementChild.cloneNode(!0);
        c === h &&
          (l.classList.add("disabled"),
          (l.querySelector(".page-link").disabled = !0));
        r.querySelector(".pagination").appendChild(l);
        r.querySelectorAll(".page-link").forEach((t) => {
          t.addEventListener("click", function (i) {
            i.preventDefault();
            y(n, t, r, h);
          });
        });
      }
    }
    function p(n, i) {
      let r = new ResizeObserver(function () {
        s(n, i);
      });
      r.observe(t.body);
      s(n, i);
    }
    function w(n, t, i) {
      if (i.articles && i.articles.length > 0) {
        const r = n
          .querySelector(".list-template")
          .content.firstElementChild.cloneNode(!0);
        i.articles.forEach((t) => {
          const i = n
            .querySelector(".list-item-template")
            .content.firstElementChild.cloneNode(!0);
          i.querySelector(".secondary-link").href = t.link.url;
          t.isexternalarticle &&
            (i.querySelector(".secondary-link").target = "_blank");
          i.querySelector(".news-text").innerHTML = t.link.text;
          i.querySelector(".date").innerHTML = t.date;
          t.image.src !== null &&
            t.image.src !== "" &&
            (i.querySelector(
              ".image-container"
            ).style.backgroundImage = `url('${t.image.src}')`);
          t.contenttype === "event" ||
          t.topic === null ||
          t.topic === "" ||
          t.hidetopic
            ? i.querySelector(".category").remove()
            : (i.querySelector(".category").innerHTML = t.topic);
          r.appendChild(i);
        });
        t.appendChild(r);
      }
    }
    function b(n, t, i) {
      i.groups &&
        i.groups.length > 0 &&
        i.groups.forEach((i) => {
          if (i.date) {
            const r = n
              .querySelector(".header-template")
              .content.firstElementChild.cloneNode(!0);
            r.innerHTML = i.date;
            t.appendChild(r);
          }
          w(n, t, i);
        });
    }
    function h(n, t) {
      const u = n.querySelector(".pagination-container");
      u.querySelector(".pagination").innerHTML = "";
      const i = n.querySelector(".content-container");
      i.innerHTML = "";
      t.info.count && t.info.count > 0
        ? (p(n, t), b(n, i, t))
        : (i.innerHTML = `<p>${t.info.message}</p>`);
      n.classList.add(r);
    }
    const r = "content-loaded";
    t.addEventListener("DOMContentLoaded", function () {
      t.querySelectorAll(".c78").forEach((t) => {
        n.addEventListener("popstate", () => {
          f(t);
        }),
          f(t);
      });
    });
  })(window, document),
  (function (n, t) {
    function rt(n) {
      const r = n.querySelectorAll(`.${i}`),
        t = [];
      return (
        r.forEach((n) => {
          t.push(n.querySelector(`.${f}`).textContent.toLowerCase());
        }),
        t
      );
    }
    function ut(n, t) {
      const i = {},
        f = t.querySelectorAll(`.filter-button.${r}`),
        u = [];
      return (
        f.forEach((n) => {
          u.push(...n.dataset.cvxFilter);
        }),
        u.forEach((t) => {
          const r = t.toLowerCase();
          n.forEach((n, t) => {
            n.startsWith(r) &&
              (i[t] = { startingIndices: [0], matchedString: n.slice(0, 1) });
          });
        }),
        i
      );
    }
    function ft(n, t) {
      if (t) {
        const r = {},
          i = t.toLowerCase();
        return (
          n.forEach((n, t) => {
            const u = [];
            let f = n.indexOf(i, 0);
            while (f >= 0) u.push(f), (f = n.indexOf(i, f + 1));
            u.length > 0 &&
              (r[t] = {
                startingIndices: u,
                matchedString: n.slice(u[0], u[0] + i.length),
              });
          }),
          r
        );
      }
    }
    function et({ startingIndices: t, matchedString: n }, r) {
      const e = r.querySelector(`.${i} .${f}`).textContent;
      let o = "",
        s = 0,
        u = 0;
      t.forEach((t) => {
        (u = t + n.length),
          (o += `${e.substring(s, t)}<mark class="highlight">${e.substring(
            t,
            u
          )}</mark>`),
          (s = u);
      });
      o += e.substring(u);
      r.querySelector(`.${i} .${f}`).innerHTML = o;
    }
    function v(n) {
      n.forEach((n) => {
        const t = n.querySelector(`.${i} .${f}`);
        t.innerHTML = t.textContent;
      });
    }
    function y(n, t, i) {
      const u = t
        .closest(".accordion-container")
        .querySelector(".error-container");
      u.classList.add("d-none");
      u.innerHTML = "";
      const f = t.querySelectorAll(`.${s}`);
      if (
        (v(f),
        f.forEach((n) => n.classList.remove(r)),
        n && Object.entries(n).length > 0)
      ) {
        t.classList.add("filtered");
        Object.entries(n).forEach((n) => {
          const [t, i] = n;
          et(i, f[t]);
          f[t].classList.add(r);
        });
        return;
      }
      if (!i) {
        t.classList.remove("filtered");
        return;
      }
      u.innerHTML = `<p class="type-subhead text-base text-center">No results for '${i}'</p>`;
      u.classList.remove("d-none");
    }
    function p(n) {
      const t = n.querySelector(`.${o}`),
        i = t.querySelectorAll(`.${s}`);
      v(i);
      i.forEach((n) => n.classList.remove(r));
      t.classList.remove("filtered");
    }
    function ot(n) {
      const i = n.querySelector(".filter-search"),
        u = n.querySelectorAll(".filter-button"),
        f = n.querySelector(`.${o}`),
        e = rt(f);
      i.addEventListener("input", (n) => {
        u.forEach((n) => n.classList.remove(r)),
          y(ft(e, n.target.value), f, n.target.value);
      });
      i.addEventListener("keydown", (n) => {
        const i = n.keyCode;
        i === 27 && bootstrap.Collapse.getInstance(t).hide();
      });
      u.forEach((t) => {
        t.addEventListener("click", (t) => {
          if (
            (t.preventDefault(), (i.value = ""), t.target.classList.contains(r))
          ) {
            t.target.classList.remove(r);
            p(n);
            return;
          }
          u.forEach((n) => n.classList.remove(r));
          t.target.classList.add(r);
          y(ut(e, n), f);
        });
      });
      const t = n.querySelector(".filter-search-container");
      t.addEventListener("shown.bs.collapse", () => {
        t.querySelector(".filter-search").focus();
      });
      t.addEventListener("hide.bs.collapse", () => {
        p(n);
      });
    }
    function w(n, t) {
      const i = `?itemID=${t}`;
      return fetch(n + i, { method: "GET" }).then((n) => {
        if (n.ok) return n.json();
      });
    }
    function b(n, t) {
      const i = n.querySelector(`.section-nav a[href="#${t}"]`);
      i && i.classList.add("active");
    }
    function st(n) {
      let t = "";
      const r = n.querySelectorAll(".section-nav-link"),
        u = n.querySelectorAll(".topic-sections > .section-module"),
        i = n.querySelector(".topic-sections > *:first-child");
      i.classList.contains("section-module") && b(n, i.id);
      n.querySelector(".accordion-dialog-body").addEventListener(
        "scroll",
        () => {
          u.forEach((i) => {
            const r = i.id,
              u = i.offsetTop,
              f = Math.ceil(
                n.querySelector(".accordion-dialog-body").scrollTop
              );
            f >= u && (t = r);
          }),
            r.forEach((n) => n.classList.remove("active")),
            t && (b(n, t), (t = ""));
        }
      );
    }
    function ht(n, t) {
      const i = new DocumentFragment();
      if (t)
        return (
          t.forEach((t) => {
            const r = n
                .querySelector(".section-nav-item-template")
                .content.firstElementChild.cloneNode(!0),
              u = r.querySelector(".section-nav-link");
            u.href = `#${t.id}`;
            u.querySelector(".section-nav-text").innerText = t.dataset.cvxName
              ? t.dataset.cvxName
              : `${t.id.split(".")[1]}`;
            i.appendChild(r);
          }),
          i
        );
    }
    function ct(n, t) {
      return new Promise((i) => {
        t.classList.remove("error-loaded");
        const r = t.dataset.cvxItemid,
          f = t.classList.contains("content-loaded");
        r &&
          !f &&
          w("/api/sitecore/EsgTopics/GetTopicContent", r)
            .then((i) => {
              if (i.Error)
                console.log(i.Error),
                  t.classList.add("error-loaded"),
                  (t.querySelector(".accordion-collapse-content").innerHTML =
                    u);
              else {
                const f = i.Response,
                  r = n
                    .querySelector(".accordion-collapse-content-template")
                    .content.firstElementChild.cloneNode(!0);
                r.querySelector(".topic-sections").innerHTML = f;
                const u = r.querySelectorAll(".section-module");
                u.length > 0
                  ? r.querySelector(".section-nav-list").appendChild(ht(n, u))
                  : r.querySelector(".section-nav-container").remove();
                t.querySelector(".content-spinner").classList.add("d-none");
                t.querySelector(".accordion-collapse-content").appendChild(r);
                st(t);
                t.classList.add("content-loaded");
              }
            })
            .catch((n) => {
              console.log(n),
                t.classList.add("error-loaded"),
                (t.querySelector(".accordion-collapse-content").innerHTML = u);
            });
        i(t);
      });
    }
    function lt(n) {
      return new Promise((t) => {
        function o() {
          n.classList.remove("animating");
          n.classList.add("show");
          t(n);
        }
        if (!n.classList.contains("show")) {
          const r = n.closest(".accordion").getBoundingClientRect().top,
            u = n.getBoundingClientRect().top,
            e = n.offsetHeight;
          let i = n.offsetTop - n.closest(".accordion").offsetTop,
            f = i - u;
          r > 0 && ((i = u - r), (f = -r));
          n.style.top = `${i}px`;
          n.dataset.cvxStartingTop = i;
          n.nextElementSibling &&
            (n.nextElementSibling.style.marginTop = `${e}px`);
          setTimeout(function () {
            n.classList.add("animating-in");
            n.classList.add("animating");
            n.style.top = `${f}px`;
            setTimeout(function () {
              o();
            }, h);
          }, l);
        }
      });
    }
    function c(n) {
      return new Promise((t) => {
        function r() {
          n.nextElementSibling && (n.nextElementSibling.style.marginTop = "");
          n.classList.remove("animating");
          n.style.top = "";
          a.refresh();
          t(n);
        }
        n.classList.add("transition-pause");
        n.classList.remove("show");
        n.classList.add("animating");
        const i = n.dataset.cvxStartingTop;
        n.dataset.cvxStartingTop = "";
        setTimeout(function () {
          n.classList.remove("transition-pause");
          n.style.top = `${i}px`;
          setTimeout(function () {
            r();
          }, h);
        }, l);
      });
    }
    function k(n) {
      return new Promise((t) => {
        const i = bootstrap.Collapse.getOrCreateInstance(
          n.querySelector(".accordion-collapse")
        );
        i.show();
        t(n);
      });
    }
    function d(n) {
      return new Promise((t) => {
        const r = n.querySelector(".accordion-collapse"),
          u = n.querySelector(`.${i}`),
          f = bootstrap.Collapse.getOrCreateInstance(r);
        f.hide();
        r.addEventListener("hidden.bs.collapse", () => {
          u.classList.add("collapsed"),
            u.setAttribute("aria-expanded", !1),
            t(n);
        });
      });
    }
    function g(i = "") {
      const r = t.location;
      if ("pushState" in history)
        history.pushState(
          "",
          n.title,
          r.pathname + r.search + (i ? `#${i}` : "")
        );
      else {
        let t, u;
        t = n.body.scrollTop;
        u = n.body.scrollLeft;
        r.hash = i;
        n.body.scrollTop = t;
        n.body.scrollLeft = u;
      }
    }
    function nt(i) {
      const r = t.location.hash,
        u = i.querySelector(".accordion-dialog-body");
      if (r.split(".").length > 1) {
        const t = n.getElementById(r.replace("#", "")).offsetTop;
        u.scroll({ top: t });
        return;
      }
      u.scroll({ top: 0 });
    }
    function at(n) {
      const t = n.querySelectorAll(`.${s}`);
      t.forEach((t) => {
        const u = t.querySelector(".collapse"),
          r = t.querySelector(`.${i}`);
        r.addEventListener("click", (t) => {
          if (r.classList.contains("collapsed")) {
            g(t.target.closest(".accordion-item").id);
            e(`#${t.target.closest(".accordion-item").id}`, n);
            return;
          }
          g();
          e("", n);
        });
        u.addEventListener("show.bs.collapse", () => {
          r.classList.remove("collapsed"), r.setAttribute("aria-expanded", !0);
        });
        u.addEventListener("shown.bs.collapse", () => {
          nt(t);
        });
      });
    }
    function vt(n, t) {
      const r = t.Response,
        u = n.querySelector(`.${o}`);
      r.forEach((t) => {
        const r = n
            .querySelector(".accordion-item-template")
            .content.firstElementChild.cloneNode(!0),
          o = `${t.TopicID}-header`,
          e = `${t.TopicID}-collapse`;
        r.id = t.TopicID ? t.TopicID : "";
        r.dataset.cvxItemid = t.ItemID ? t.ItemID : "";
        r.querySelector(".accordion-header").id = o;
        r.querySelector(`.${i} .${f}`).innerText = t.Name;
        r.querySelector(`.${i}`).dataset.bsTarget = `#${e}`;
        r.querySelector(`.${i}`).setAttribute("aria-controls", `#${e}`);
        r.querySelector(".accordion-collapse").setAttribute(
          "aria-labelledby",
          `#${o}`
        );
        r.querySelector(".accordion-collapse").id = e;
        u.appendChild(r);
      });
      n.querySelector(".topic-spinner").classList.add("d-none");
      at(n);
    }
    function yt(n) {
      gsap.registerPlugin(ScrollTrigger);
      const t = n.querySelector(".topics-container");
      t &&
        (a = ScrollTrigger.create({
          trigger: t,
          start: "top",
          end: "bottom top",
          toggleClass: "pinned",
          scrub: !0,
          pin: n.querySelector(".topics-filter-form"),
          pinSpacing: !1,
          invalidateOnRefresh: !0,
        }));
    }
    function tt(t = false) {
      if (!t) {
        n.body.classList.add("modal-open");
        n.body.style.overflow = "hidden";
        return;
      }
      n.body.classList.remove("modal-open");
      n.body.style.overflow = "";
    }
    function it(n, t) {
      lt(n)
        .then((n) => {
          tt(),
            k(n).then(() => {
              if (t && n.id !== t.id) {
                d(t)
                  .then(() => {
                    c(t).then(() => {
                      n.classList.remove("animating-in");
                    });
                  })
                  .catch((i) => {
                    console.log(i),
                      c(t).then(() => {
                        n.classList.remove("animating-in");
                      });
                  });
                return;
              }
              n.classList.remove("animating-in");
            });
        })
        .catch((t) => {
          console.log(t), k(n);
        });
    }
    function pt(n, t, i = null) {
      try {
        const r = t.querySelector(n[0]);
        if (r && !r.classList.contains("show")) {
          if (!r.classList.contains("content-loaded")) {
            ct(t, r)
              .then((n) => {
                it(n, i);
              })
              .catch((n) => {
                console.log(n),
                  r.classList.add("error-loaded"),
                  (r.querySelector(".accordion-collapse-content").innerHTML =
                    u);
              });
            return;
          }
          it(r, i);
          return;
        }
        nt(r);
      } catch (r) {
        console.log(r);
      }
    }
    function e(n, t) {
      const i = t.querySelector(".accordion-item.show");
      if (n) {
        const r = n.split(".");
        pt(r, t, i);
        return;
      }
      i &&
        d(i).then(() => {
          tt(!0), c(i);
        });
    }
    const o = "accordion",
      s = "accordion-item",
      i = "accordion-button",
      f = "button-text",
      r = "filter-show",
      u = `<h2 class="type-subhead text-base padding-top-20">Content Unavailable</h2>`,
      l = 25;
    let h, a;
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c80").forEach((n) => {
        h = parseInt(
          t.getComputedStyle(n).getPropertyValue("--topic-transition-duration"),
          10
        );
        const r = n.dataset.cvxItemid,
          i = n.querySelector(".accordion-container .error-container");
        r
          ? w("/api/sitecore/EsgTopics/GetTopics", r)
              .then((r) => {
                r.Error
                  ? ((i.innerHTML = u),
                    i.classList.remove("d-none"),
                    console.log(r.Error))
                  : (vt(n, r), ot(n), yt(n), e(t.location.hash, n));
              })
              .catch(function (n) {
                console.log(n);
                i.innerHTML = u;
                i.classList.remove("d-none");
              })
          : (console.log("no main ItemID"),
            (i.innerHTML = u),
            i.classList.remove("d-none"));
        t.addEventListener(
          "popstate",
          function () {
            e(t.location.hash, n);
          },
          !1
        );
      });
    });
  })(document, window),
  (function (n) {
    function r(n) {
      return n.offsetWidth;
    }
    function t(n) {
      return n.offsetHeight;
    }
    function h(n, r) {
      n.forEach((u, f) => {
        f === 0 &&
          r.to(
            u,
            { y: () => -t(u.querySelector(i)), duration: 2 },
            `start-slide-${f}`
          ),
          r.fromTo(
            u.querySelector(s),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 5 },
            `start-slide-${f}+=4`
          ),
          r.to(
            u.querySelector(i),
            { fontSize: () => "36px", lineHeight: () => "40px", duration: 4 },
            `start-slide-${f}+=4`
          ),
          r.fromTo(
            u.querySelector(e),
            { y: () => -t(u.querySelector(".image-container")) },
            { y: 0, duration: 4 },
            `start-slide-${f}+=4`
          ),
          f < n.length &&
            r.to(
              n[f + 1],
              { y: () => -t(n[f + 1].querySelector(i)), duration: 1 },
              `start-slide-${f}+=6`
            ),
          r.addLabel(`slide-end-${f}`),
          f === n.length - 1 &&
            n.forEach((n) => {
              r.to(n, { y: () => -t(n), duration: 1 }, `slide-end-${f}`);
            });
      });
    }
    function c(n, i) {
      n.forEach((f, e) => {
        e === 0 &&
          i.to(
            f,
            { y: () => -t(f.querySelector(u)), duration: 2 },
            `start-slide-${e}`
          );
        e > 0 &&
          (i.fromTo(
            n[e - 1],
            { width: () => r(f.closest(".card-container")) },
            { width: () => r(f.closest(".card-container")) - 80, duration: 2 },
            `start-slide-${e}+=4`
          ),
          i.to(
            n[e - 1].querySelector(".upper-text-container"),
            { autoAlpha: 1, duration: 4 },
            `start-slide-${e}+=4`
          ));
        for (let r = 1; r < e + 1; r++)
          i.to(
            n[r - 1],
            { y: () => `-=${t(f.querySelector(u))} / 2`, duration: 4 },
            `start-slide-${e}+=4`
          );
        i.to(
          f.querySelector(".upper-text-container"),
          { autoAlpha: 0, duration: 4 },
          `start-slide-${e}+=4`
        );
        i.fromTo(
          f.querySelector(o),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 6 },
          `start-slide-${e}+=4`
        );
        e < n.length &&
          i.to(
            n[e + 1],
            { y: () => -t(n[e + 1].querySelector(u)), duration: 1 },
            `start-slide-${e}+=6`
          );
        i.addLabel(`slide-end-${e}`);
        e === n.length - 1 &&
          i.fromTo(
            n[e],
            { width: () => r(f.closest(".card-container")) },
            { width: () => r(f.closest(".card-container")) - 80, duration: 1 },
            `slide-end-${e}`
          );
      });
    }
    function f(n, i, r, u) {
      n.addEventListener("click", () => {
        gsap.to(window, {
          scrollTo: i.scrollTrigger.labelToScroll(`slide-end-${r}`),
          ease: "power2",
        });
      });
      n.querySelectorAll(".slide-button").forEach((n) => {
        n.addEventListener("click", () => {
          gsap.to(window, {
            scrollTo: i.scrollTrigger.labelToScroll(`slide-end-${r}`),
            ease: "power2",
          });
        });
      });
      i.to(
        n,
        { y: () => -t(n) + (u ? 0 : (r + 1) * 28), duration: 4 },
        `start-slide-${r}+=4`
      );
    }
    function l(n) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      const u = gsap.matchMedia(),
        r = n.querySelector(".card-container"),
        t = r.querySelectorAll(".card");
      ScrollTrigger.saveStyles(r.querySelectorAll(i));
      u.add(
        {
          isDesktop: "(min-width: 992px)",
          isMobileOrTablet: "(max-width: 991.99px)",
        },
        (i) => {
          const { isDesktop: e, isMobileOrTablet: s } = i.conditions,
            u = gsap.timeline(),
            o = () => `${t.length * 100}%`;
          s ? h(t, u) : c(t, u);
          t.forEach((n, t) => {
            const i = n.querySelector(".dotlottie");
            if (i) {
              const o = i.dataset.cvxMediaDesktop,
                r = new DotLottieWeb.DotLottie({
                  autoplay: !1,
                  loop: !1,
                  canvas: i,
                  src: o ? o : "",
                });
              f(n, u, t, e);
              r.addEventListener("load", () => {
                const n = { frame: 0 };
                u.to(
                  n,
                  {
                    frame: r.totalFrames - 1,
                    ease: "none",
                    onUpdate: () => r.setFrame(n.frame),
                    duration: 8,
                  },
                  `start-slide-${t}+=4`
                );
              });
            } else f(n, u, t, e);
          });
          ScrollTrigger.create({
            trigger: n,
            start: "bottom bottom",
            end: o,
            scrub: 1,
            pin: !0,
            pinSpacing: !0,
            invalidateOnRefresh: !0,
          });
          const l = e ? "top 60%" : "bottom bottom";
          ScrollTrigger.create({
            trigger: n,
            start: `${l}`,
            end: o,
            scrub: 1,
            pin: !1,
            pinSpacing: !0,
            animation: u,
            invalidateOnRefresh: !0,
          });
          ScrollTrigger.addEventListener("refresh", function () {
            gsap.to(r, { autoAlpha: 1 });
          });
        }
      );
    }
    const e = ".inner-card-container",
      u = ".upper-sub-header",
      o = ".sub-header",
      i = ".sub-header",
      s = ".description";
    window.addEventListener("load", function () {
      n.querySelectorAll(".c81").forEach((n) => {
        l(n);
      });
    });
  })(document),
  (function (n, t) {
    function u() {
      return t.matchMedia("screen and (min-width: 768px)").matches;
    }
    function r(n) {
      const r = n.querySelector(".text-container"),
        t = r.clientHeight,
        u = getComputedStyle(n);
      i || (i = parseInt(u.getPropertyValue("--container-height"), 10));
      t > i
        ? n.style.setProperty("--container-height", t + "px")
        : n.style.setProperty("--container-height", i + "px");
    }
    let i;
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c82").forEach((n) => {
        r(n);
        let i = t.innerWidth;
        t.addEventListener(
          "resize",
          globalNamespace.debounce(() => {
            const f = t.innerWidth;
            f !== i && u() && (r(n), (i = f));
          })
        );
      });
    });
  })(document, window),
  (function (n) {
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c84").forEach((n) => {
        const t = n.querySelector(".splide"),
          i = t.querySelectorAll(".splide__slide");
        i.length > 1 && t.querySelector(".control").classList.add("show");
        const r = new Splide(t, {
          perPage: 1,
          gap: 0,
          perMove: 1,
          focus: "center",
          padding: 0,
          trimSpace: !1,
          start: 0,
          pagination: !1,
        });
        r.mount();
      });
    });
  })(document),
  (function (n, t) {
    function u(n) {
      const t = document.createTreeWalker(n, NodeFilter.SHOW_TEXT, null),
        i = [];
      while (t.nextNode()) i.push(t.currentNode);
      return i;
    }
    function f(n) {
      const t = document.createRange(),
        f = [];
      let e = 0,
        o = null,
        i = "",
        r = null;
      return (
        u(n).forEach((n) => {
          let u = n.textContent;
          const c = u.length;
          let s = 0,
            h = 0;
          while (s <= c)
            t.setStart(n, s),
              s < c - 1 && t.setEnd(n, s + 1),
              (e = t.getBoundingClientRect().right),
              o === null
                ? (r = t.cloneRange())
                : e < o &&
                  ((i += u.slice(0, h)),
                  r.setEnd(t.endContainer, t.endOffset),
                  f.push(i),
                  (i = ""),
                  (u = u.slice(h)),
                  (h = 0),
                  (r = t.cloneRange())),
              s++,
              h++,
              (o = e);
          i += u;
        }),
        r.setEnd(t.endContainer, t.endOffset),
        f.push(i),
        f
      );
    }
    function e(n) {
      const i = 750,
        r = n.querySelectorAll(".line-animation"),
        t = new IntersectionObserver(
          function (u) {
            u.forEach((u) => {
              u.isIntersecting &&
                (r.forEach((n, t) => {
                  setTimeout(() => {
                    n.classList.add("fill");
                  }, t * i);
                }),
                t.unobserve(n));
            });
          },
          { rootMargin: "0% 0px -50% 0px", threshold: [0] }
        );
      t.observe(n);
    }
    function r(t) {
      i || (i = t.innerHTML);
      t.innerHTML = i;
      const r = f(t);
      r &&
        ((t.innerHTML = ""),
        r.forEach((i) => {
          const r = n.createElement("span");
          r.classList.add("line-animation");
          r.innerHTML = i;
          t.appendChild(r);
        }),
        e(t));
    }
    let i = null;
    n.addEventListener("DOMContentLoaded", function () {
      n.querySelectorAll(".c85").forEach((n) => {
        const i = n.querySelector(".description");
        r(i);
        let u = t.innerWidth;
        t.addEventListener(
          "resize",
          globalNamespace.debounce(() => {
            const n = t.innerWidth;
            n !== u && (r(i), (u = n));
          })
        );
      });
    });
  })(document, window),
  (function (n, t) {
    function i() {
      if (YT_players)
        for (let n in YT_players)
          t(this).find("#" + YT_players[n].vid).length === 1 &&
            YT_players[n].getPlayerState &&
            YT_players[n].getPlayerState() === 1 &&
            YT_players[n].pauseVideo();
    }
    function r(n) {
      n.find(".carousel-control").on("keydown", function (n) {
        const i = n.keyCode || n.which,
          r = t(n.target);
        i === 32 && (n.preventDefault(), r.click());
      });
      n.find(".carousel-indicators .slide-link").on("keydown", function (n) {
        const r = n.keyCode || n.which,
          i = t(n.target);
        switch (r) {
          case 37:
            if (
              (n.preventDefault(),
              n.stopPropagation(),
              i
                .closest(".carousel-indicators")
                .find(".slide-link")
                .attr("tabindex", "-1"),
              i.closest("li").is(":first-child"))
            ) {
              i.closest(".carousel-indicators")
                .find("li")
                .last()
                .find(".slide-link")
                .attr("tabindex", "0")
                .focus()
                .click();
              return;
            }
            i.closest("li")
              .prev()
              .find(".slide-link")
              .attr("tabindex", "0")
              .focus()
              .click();
            break;
          case 39:
            if (
              (n.preventDefault(),
              n.stopPropagation(),
              i
                .closest(".carousel-indicators")
                .find(".slide-link")
                .attr("tabindex", "-1"),
              i.closest("li").is(":last-child"))
            ) {
              i.closest(".carousel-indicators")
                .find("li")
                .first()
                .find(".slide-link")
                .attr("tabindex", "0")
                .focus()
                .click();
              return;
            }
            i.closest("li")
              .next()
              .find(".slide-link")
              .attr("tabindex", "0")
              .focus()
              .click();
        }
      });
    }
    function u(n) {
      n.find(".carousel-indicators .slide-link").on("click", function (n) {
        const r = t(n.target);
        let i = t(n.target);
        i.hasClass("slide-link") || (i = r.closest(".slide-link"));
        i.parent().children().attr("tabindex", "-1");
        i.attr("tabindex", "0");
      });
    }
    t(n).ready(function () {
      t(".carousel-common.match-height").each(function () {
        const n = "#" + t(this).attr("id");
        t(n + " .carousel-inner > .item").matchHeight({ byRow: !1 });
      });
      t(".carousel").on("slide.bs.carousel", function () {
        i();
      });
      t(".modal").on("hidden.bs.modal", function () {
        i();
      });
      t(".carousel-a, .carousel-b, .carousel-social").each(function () {
        r(t(this));
        u(t(this));
      });
      t(".carousel-common.numbering").each(function () {
        const n = "#" + t(this).find(".carousel").attr("id");
        let i = t(this).find(".item").length,
          r = t(n + " .item.active").index() + 1;
        t(n + " .num").text(r + " of " + i);
        t(n).on("slid.bs.carousel", function () {
          i = t(this).find(".item").length;
          r = t(n + " .item.active").index() + 1;
          t(n + " .num").text(r + " of " + i);
        });
      });
      t(".carousel-common.numbering").each(function () {
        const n = "#" + t(this).find(".carousel").attr("id");
        let i = t(this).find(".carousel-item").length,
          r = t(n + " .carousel-item.active").index() + 1;
        t(n + " .num").text(r + " of " + i);
        t(n).on("slid.bs.carousel", function () {
          i = t(this).find(".carousel-item").length;
          r = t(n + " .carousel-item.active").index() + 1;
          t(n + " .num").text(r + " of " + i);
        });
      });
      t(".carousel-common.nav-labels").each(function () {
        const n = "#" + t(this).find(".carousel").attr("id");
        let r = t(n + " .item").length,
          i = t(n + " .item.active").index() + 1;
        t(n + " .back").hide();
        t(n + " .num").text(i + " of " + r);
        t(n + " .next .next-text").text(
          "next: " +
            t(n + " .item.active")
              .next()
              .find(".nav-text")
              .data("nav-text")
        );
        t(n).on("slid.bs.carousel", function () {
          const u = t(this).data("bs.carousel");
          i = u.getItemIndex(u.$element.find(".item.active"));
          const e = u.getItemIndex(u.$element.find(".item.active + .item")),
            o = u.$items[e];
          let f = t(o).find(".nav-text").data("nav-text");
          if (i !== 0) {
            t(n + " .back").show();
            const i = t(n + " .item.active")
              .prev()
              .find(".nav-text")
              .data("nav-text");
            t(n + " .back .back-text").text("previous: " + i);
          } else t(n + " .back").hide();
          f || (f = "start");
          const s = i + 1 + " of " + r;
          t(n + " .num").text(s);
          t(n + " .next .next-text").text("next: " + f);
        });
      });
    });
  })(document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      if (window.location.hash) {
        const n = decodeURIComponent(window.location.hash.replace("#", ""));
        t(".drawers .panel a.collapsed[data-bs-toggle=collapse]").each(
          function () {
            t(this).find("h4").text().trim().toLowerCase() ===
              n.trim().toLowerCase() &&
              (t(this).click(),
              t("html, body").animate(
                { scrollTop: t(this).offset().top - 150 },
                2e3
              ));
          }
        );
      }
      t(".drawers").each(function () {
        t(this)
          .find(".panel-heading > a")
          .on("keydown", function (n) {
            const i = n.keyCode || n.which,
              r = t(n.target);
            i === 32 && (n.preventDefault(), r.click());
          });
      });
    });
  })(document, jQuery),
  (function (n, t, i) {
    function r() {
      i(".hero").each(function () {
        const t = i(this),
          u = i(this).find(".bottom").height(),
          f = i(this).find(".hero-content").height(),
          e = 40,
          r = t.find(".background");
        if (t.hasClass("has-bg-img")) {
          const u = i(n).height(),
            f = i("nav").height(),
            e = t.parent().prev().children(".breadcrumb-container").height();
          r.height(u - f - e);
        } else r.height("auto");
        t.css("min-height", u + f + e + "px");
        r.css("min-height", u + f + e + "px");
      });
    }
    i(t).ready(function () {
      r();
      i(n).resize(function () {
        r();
      });
    });
  })(window, document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      t(".stories-filter-bar .dropdown").each(function (n, i) {
        const r = t(i);
        r.on("shown.bs.dropdown", function () {
          t(this)
            .attr("aria-expanded", !0)
            .find(".dropdown-button")
            .attr("aria-expanded", "");
        }).on("hidden.bs.dropdown", function () {
          t(this)
            .attr("aria-expanded", !1)
            .find(".dropdown-button")
            .attr("aria-expanded", "");
        });
      });
    });
  })(document, jQuery),
  (function (n, t) {
    t(n).ready(function () {
      function i(r) {
        let u = !1;
        if (
          (r.which === 13 && (u = !0),
          u || r.type === "click" || r.type === "touchend")
        ) {
          r.preventDefault();
          r.stopPropagation();
          const f = t(this).parents(".flip-card");
          n.off("click keydown touchstart touchend").on(
            "click keydown touchstart touchend",
            function (n) {
              n.preventDefault();
              n.stopPropagation();
            }
          );
          let o = ".front",
            e = ".back";
          f.hasClass("reversed") && ((o = ".back"), (e = ".front"));
          f.find(e).css("visibility", "visible");
          f.toggleClass("reversed").one("transitionend", function () {
            f.find(o).css("visibility", "hidden");
            u && f.find(e).find("a:first").focus();
            setTimeout(function () {
              n.off("click keydown touchstart touchend").on(
                "click keydown touchstart touchend",
                i
              );
            }, 500);
          });
        } else
          r.type === "touchstart" && (r.preventDefault(), r.stopPropagation());
      }
      const n = t(
        ".card-flip-icon a, .card-flip-icon.close, .card-flip-icon.close a"
      );
      n.on("click keydown touchstart touchend", i);
    });
  })(document, jQuery),
  (function (n, t, i) {
    function u() {
      const r = [767, 991, 1199],
        t = n.innerWidth;
      i(".grid .box.lg").each(function () {
        i(this).height(i(this).width());
      });
      i(".grid .box.md").each(function () {
        if (t > r[0] && t <= r[1]) {
          i(this).height(i(this).width() / 2);
          return;
        }
        i(this).height(i(this).width() * 2);
      });
      i(".grid .box.sm").each(function () {
        if (t > 0 && t <= r[0]) {
          i(this).height(i(this).width() * 3);
          return;
        }
        i(this).height(i(this).width() / 3);
      });
      i(".grid .flip-card").each(function () {
        i(this)
          .find("h3")
          .css({ "font-size": i(this).width() / 14 + "px" });
        i(this)
          .find("h4")
          .css({ "font-size": i(this).width() / 18 + "px" });
        i(this)
          .find(".card-bottom.tags")
          .css({
            "font-size":
              (i(this).width() / 18 > 16 ? 16 : i(this).width() / 18) + "px",
          });
      });
    }
    function f(n, i) {
      t.cookie = n + "=" + i + "; expires=0";
    }
    function e(n) {
      return t.cookie.indexOf(n + "=") >= 0
        ? new RegExp(n + "=([^ ;]+)", "gi").exec(t.cookie)[1]
        : "";
    }
    function r(n) {
      n === "list"
        ? (i(".stories-view").removeClass("grid"),
          i(".stories-view").addClass("list"),
          i(".toggle-grid-view-grid").removeClass("selected"),
          i(".toggle-grid-view-list").addClass("selected"))
        : n === "grid" &&
          (i(".stories-view").removeClass("list"),
          i(".stories-view").addClass("grid"),
          i(".toggle-grid-view-list").removeClass("selected"),
          i(".toggle-grid-view-grid").addClass("selected"));
      u();
    }
    i(t).ready(function () {
      i(".filter-bar.match-height .col").matchHeight({ byRow: !0 });
      const t = "stories-view";
      if (i(".toggle-grid-view-grid").length === 1) {
        let n = "grid";
        e(t) === "list" && (n = "list");
        r(n);
        f(t, n);
      } else r("grid");
      i(n).resize(function () {
        u();
      });
      i(".toggle-grid-view-grid").click(function () {
        r("grid");
        f(t, "grid");
      });
      i(".toggle-grid-view-list").click(function () {
        r("list");
        f(t, "list");
      });
      setTimeout(function () {
        u();
        i(".stories-view").css({ visibility: "visible" });
      }, 200);
    });
  })(window, document, jQuery),
  (function (n, t, i) {
    function l(n) {
      i("#" + n + " .slider").slick("unslick");
      e(n);
    }
    function e(n) {
      i("#" + n + " .slider")
        .slick({
          slide: "#" + n + " .slider .item",
          accessibility: !0,
          cvxAccessibilityOverride: !0,
          focusOnChange: !0,
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="next"><span class="glyphicon glyphicon-chevron-caret-right" aria-hidden="true"></span><span class="sr-only">Next</span></button>',
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="previous"><span class="glyphicon glyphicon-chevron-caret-left" aria-hidden="true"></span><span class="sr-only">Previous</span></button>',
          slidesPerRow: s,
          slidesToScroll: h,
          slidesToShow: c,
          infinite: !1,
        })
        .on("beforeChange", function (n, t, r, u) {
          i.carouselMoveTrack(i(n.currentTarget).closest(".x10").attr("id"), u);
        });
    }
    function f() {
      o = u;
      i(".x10").each(function () {
        const n = i(this).attr("id");
        l(n);
        i.carouselInitTrack(n);
        i.carouselMoveTrack(n, 0);
      });
    }
    let s = 1,
      h = 1,
      c = 1;
    i(t).ready(function () {
      i(".x10").each(function () {
        const n = i(this).attr("id");
        e(n);
        i.carouselInitTrack(n);
      });
    });
    let r,
      u,
      o = n.innerWidth;
    i(n).on("resize orientationchange", function (t) {
      if (
        ((u = n.innerWidth), t.type === "orientationchange") ||
        (i.isMobile() && u !== o)
      )
        return clearTimeout(r), (r = setTimeout(f, 500)), !1;
      i.isMobile() || (clearTimeout(r), (r = setTimeout(f, 500)));
    });
  })(window, document, jQuery);
