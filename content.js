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
                z-index: 999;
                display: flex;
                top: 0;
            }
            #ssafy-alert {
                width: 100%;
                height: 100%;
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
        <div id="ssafy-alert"></div>
    `

    const dialog = document.createElement("dialog");
    dialog.id = "modal_alert";
    dialog.style = "width: 300px; padding: 20px; border: 2px solid #ccc; border-radius: 8px; background-color: #fff;"
    dialog.innerHTML =
        `<h2 style="font-size: 2em; font-weight : bold; margin-top: 0; margin-bottom: 10px; color: #333; text-align: center;">입실클릭 안함?</h2>
        <button id="closeModalBtn" style="float: right; background-color: #007bff; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 80px; height: 40px; font-size: 16px;">닫기</button>`;
    
    container.append(bg, dialog);
    document.body.append(container);

    dialog.showModal();
    dialog.querySelector("button").onclick = () => container.remove();
}

if (!document.body.querySelector("#ssafy-alert"))
    blink();