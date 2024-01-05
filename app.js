document.addEventListener('DOMContentLoaded', () => {
    let selectedTextElement = null;
    const btnAddText = document.getElementById("add-text-btn");
    const memeContainer = document.getElementById("meme-container");
    const alignTopBtn = document.getElementById("align-top");
    const alignDownBtn = document.getElementById("align-down");
    const alignLeftBtn = document.getElementById("align-left");
    const alignRightBtn = document.getElementById("align-right");
    const saveMemeBtn = document.getElementById("save-meme-btn");
    const deleteTxtBtn = document.getElementById("delete-btn");
    const memeImage = document.getElementById("meme-image");
  
    function addText() {
      const text = document.getElementById("text-input").value;
  
      if (!text) {
        return;
      }
  
      const textColor = document.getElementById("text-color").value;
      const fontSize = document.getElementById("edit-text-size").value + "px";
      const isBold = document.getElementById("bold").checked;
      const isItalic = document.getElementById("italic").checked;
      const fontFamily = document.getElementById("edit-font").value;
  
      const topTextElement = document.createElement("div");
      topTextElement.classList.add("text-element");
      topTextElement.innerText = text;
      topTextElement.style.position = 'absolute';
      topTextElement.style.color = textColor;
      topTextElement.style.fontSize = fontSize;
      topTextElement.style.fontWeight = isBold ? "bold" : "normal";
      topTextElement.style.fontStyle = isItalic ? "italic" : "normal";
      topTextElement.style.fontFamily = fontFamily;
      topTextElement.style.top = 10 + 'px';
      topTextElement.style.left = "10px";
  
      memeContainer.appendChild(topTextElement);
    }
  
    function alignText(direction) {
      if (selectedTextElement) {
        const currentLeft = parseInt(selectedTextElement.style.left);
        const currentTop = parseInt(selectedTextElement.style.top);
        const step = 10; // Шаг перемещения
  
        switch (direction) {
          case 'top':
            selectedTextElement.style.top = currentTop - step + "px";
            break;
          case 'bottom':
            selectedTextElement.style.top = currentTop + step + "px";
            break;
          case 'left':
            selectedTextElement.style.left = currentLeft - step + "px";
            break;
          case 'right':
            selectedTextElement.style.left = currentLeft + step + "px";
            break;
        }
      }
    }
  
    function saveMeme() {
      const canvas = document.createElement("canvas");
      canvas.width = memeContainer.offsetWidth;
      canvas.height = memeContainer.offsetHeight;
      const ctx = canvas.getContext("2d");
  
      ctx.drawImage(memeImage, 0, 0);
  
      // Отрисовываем текстовые элементы на холсте
      const textElements = document.querySelectorAll(".text-element");
      textElements.forEach((element) => {
        const font = element.style.fontStyle + ' ' + element.style.fontWeight + ' ' + element.style.fontSize + ' ' + element.style.fontFamily;
        ctx.font = `${font}`;
        ctx.fillStyle = element.style.color;
        ctx.fillText(element.innerText, parseInt(element.style.left), parseInt(element.style.top) + parseInt(element.style.fontSize));
      });
  
      const memeDataURL = canvas.toDataURL("image/png");
  
      const link = document.createElement("a");
      link.href = memeDataURL;
      link.download = "meme.png";
      link.click();
    }
  
    const imageInput = document.getElementById("image-input");
    imageInput.addEventListener("change", function() {
      const file = imageInput.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          memeImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    memeContainer.addEventListener("mousedown", function(event) {
      selectedTextElement = null;
      const textElements = document.querySelectorAll(".text-element");
      textElements.forEach((element) => {
        element.classList.remove('text-element-highlight')
      });
  
      if (event.target.classList.contains("text-element")) {
        selectedTextElement = event.target;
        selectedTextElement.classList.add('text-element-highlight')
      }
    });
  
  
    function addAlignmentHandlers(button, direction) {
      let intervalId;
  
      button.addEventListener('mousedown', () => {
        alignText(direction);
        intervalId = setInterval(() => alignText(direction), 100);
      });
  
      button.addEventListener('mouseup', () => {
        clearInterval(intervalId);
      });
    }
  
    addAlignmentHandlers(alignTopBtn, 'top');
    addAlignmentHandlers(alignDownBtn, 'bottom');
    addAlignmentHandlers(alignLeftBtn, 'left');
    addAlignmentHandlers(alignRightBtn, 'right');
  
    btnAddText.addEventListener('click', addText);
    saveMemeBtn.addEventListener('click', saveMeme);
    deleteTxtBtn.addEventListener('click', () => {
      if (!selectedTextElement) {
        return;
      }
  
      selectedTextElement.remove();
      selectedTextElement = null;
    });
  
    memeImage.onload = function() {
      memeContainer.style.width = memeImage.width + "px";
      memeContainer.style.height = memeImage.height + "px";
    };
  
    const tooltipIcon = document.getElementById('tooltip-icon');
    const tooltip = document.getElementById('tooltip');
  
    tooltipIcon.addEventListener('mouseover', () => {
      tooltip.style.display = 'block';
    });
  
    tooltipIcon.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });
  });
  