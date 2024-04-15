function blink() {
    const container = document.createElement("div");
    container.id = "ssafy-alert";

    const bg = document.createElement("div");
    const shadowRoot = bg.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
            div {
                width: 100%;
                height: 100%;
                position: fixed;
                z-index: 2147483647;
                display: flex;
                top: 0;
                animation: blink 0.8s infinite;
            }
            @keyframes blink {
                0% {
                    background-color: rgba(255, 0, 0, 0.2);
                  }
                  50% {
                    background-color: rgba(255, 0, 0, 0.6); 
                  }
                  100% {
                    background-color: rgba(255, 0, 0, 0.2); 
                  }
              }
        </style>
        <div></div>
    `

    const dialog = document.createElement("dialog");
    dialog.style = "position:fixed; margin: auto; width: 300px; padding: 20px; border: 2px solid #ccc; border-radius: 8px; background-color: #fff;"
    dialog.innerHTML =
        `<h2 style="font-size: 2em; font-weight : bold; margin-top: 0; margin-bottom: 10px; color: #333; text-align: center;">${new Date().getHours() < 12 ? "입" : "퇴"}실클릭 안함?</h2>
        <form method="dialog">
            <button id="closeModalBtn" style="float: right; background-color: #007bff; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 80px; height: 40px; font-size: 16px;">닫기</button>
        </form>`;

    container.append(bg, dialog);
    document.body.append(container);

    dialog.addEventListener("close", () => {
        container.remove();
    });
    dialog.showModal();
}

if (!document.body.querySelector("#ssafy-alert"))
    blink();