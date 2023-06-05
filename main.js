window.addEventListener('load', function () {
  function audio() {
    document.getElementById('btn_audio').currentTime = 0;
    document.getElementById('btn_audio').play();
  }
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader();
  codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {

      // selectedDeviceId = videoInputDevices[0].deviceId;
      // if (videoInputDevices.length >= 1) {
      //   console.log("deviceId", videoInputDevices[0].deviceId);
      //   console.log("deviceLabel", videoInputDevices[0].label);
      // }
      let array = [];
      document.getElementById('startButton').addEventListener('click', () => {
        codeReader.decodeFromVideoDevice(undefined, 'video', (result, err) => {
          if (result) {
            console.log("result", result);
            const isInclude = array.includes(result.text);
            if (isInclude) return;
            array.push(result.text);
            audio();
            let li = document.createElement('li');
            li.textContent = result.text;
            document.getElementById('result').appendChild(li);
            document.getElementById('count').textContent = array.length;
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
          }
        });
      });
      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset();
        document.getElementById('result').remove();
        let ul = document.createElement("ul");
        ul.id = "result";
        ul.classList.add(["p-2"]);
        document.getElementById('list-area').appendChild(ul);
        array = [];
        document.getElementById('count').textContent = array.length;
      });

    })
    .catch((err) => {
      console.error(err);
    });
});
