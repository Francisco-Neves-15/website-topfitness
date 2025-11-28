let csAlertTimeout = null;
let csAlertInterval = null;

export default function csAlert({ msg = "", time = 3000, type = "primary"} = {}) {
  const box = document.getElementById("alert-box");
  const msgBox = document.getElementById("alert-msg");
  const bar = document.getElementById("alert-bar");

  if (!box || !msgBox || !bar) return;

  msgBox.textContent = msg;

  let classToAdd
  if      (type === "primary")   { classToAdd = "primary"   }
  else if (type === "secondary") { classToAdd = "secondary" }
  else if (type === "tertiary")  { classToAdd = "tertiary"  }
  else if (type === "success")   { classToAdd = "success"   }
  else if (type === "error")     { classToAdd = "error"     }
  else if (type === "warn")      { classToAdd = "warn"      }

  box.classList.add(classToAdd)

  if (csAlertTimeout) clearTimeout(csAlertTimeout);
  if (csAlertInterval) clearInterval(csAlertInterval);

  box.classList.add("show");

  bar.style.width = "100%";

  const start = Date.now();

  csAlertInterval = setInterval(() => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(time - elapsed, 0);
    const percent = (remaining / time) * 100;

    bar.style.width = percent + "%";

    if (remaining <= 0) clearInterval(csAlertInterval);
  }, 20);

  csAlertTimeout = setTimeout(() => {
    box.classList.remove("show");
    box.classList.remove(classToAdd);
    msgBox.textContent = "";
  }, time);
}
