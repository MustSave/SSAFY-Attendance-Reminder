function blink() {
    const originalBgColor = document.body.style.backgroundColor;
    let blink = true;
    const interval = setInterval(() => {
        document.body.style.backgroundColor = blink ? "red" : "white";
        blink = !blink;
    }, 100);
  
    const dialog = document.createElement("dialog");
    dialog.id = "modal_alert";
    dialog.style = "width: 300px; padding: 20px; border: 2px solid #ccc; border-radius: 8px; background-color: #fff;"
    dialog.innerHTML = 
        `<h2 style="font-size: 2em; font-weight : bold; margin-top: 0; margin-bottom: 10px; color: #333; text-align: center;">입실클릭 안함?</h2>
        <button id="closeModalBtn" style="float: right; background-color: #007bff; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 80px; height: 40px; font-size: 16px;">닫기</button>`;
    document.body.append(dialog);

    dialog.showModal();
    dialog.querySelector("button").onclick = () => {
        dialog.close();
        dialog.remove();
    }

    setTimeout(() => {
      clearInterval(interval);
      document.body.style.backgroundColor = originalBgColor;
      dialog.close();
      dialog.remove();
    }, 10000);
}

blink();