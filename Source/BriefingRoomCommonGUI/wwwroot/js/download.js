async function BlazorDownloadFile(filename, contentType, data) {
  // Create the URL
  const fileType = filename.split(".").at(-1)
  const file = new File([data], filename, { type: contentType });
  if (self.showSaveFilePicker) {
    const fileHandle = await self.showSaveFilePicker({
      suggestedName: filename,
      types: [{
        description: 'Text documents',
        accept: {
          'text/plain': [`.${fileType}`],
        },
      }],
    });

    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(file);
    // Close the file and write the contents to disk.
    await writable.close();
  } else {

    // // Create the <a> element and click on it
    const exportUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = exportUrl;
    a.download = filename;
    a.target = "_self";
    a.click();
    // We don't need to keep the url, let's release the memory
    // On Safari it seems you need to comment this line... (please let me know if you know why)
    URL.revokeObjectURL(exportUrl);
  }

}

async function RenderMap(mapData) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  clearCanvas(ctx, canvas)
  const scaledMapData = scaleCoordinates(centerData(mapData), canvas);
  Object.keys(scaledMapData).forEach(key => {
    colour = GetColour(key)
    if (scaledMapData[key].length == 1) {
      let coords = scaledMapData[key][0];
      RenderDot(coords[0], coords[1], colour, GetText(key), ctx)
      return
    }
    RenderPolygon(scaledMapData[key], colour, ctx)
  })
}

function GetText(id) {
  switch (true) {
    case id.includes("AIRBASE"):
      return 'A'
    case id.includes("OBJECTIVE"):
      return 'O'
    case id.includes("FOB"):
      return 'F'
      case id.includes("CARRIER"):
        return 'C'
    default:
      return null
  }
}

function GetColour(id) {
  switch (true) {
    case id === "RED":
      return '#ff000055'
    case id === "BLUE":
      return '#0000ff55'
    case id === 'WATER':
        return '#50ceeb55'
    case id === 'NOSPAWN':
        return '#50eb5d55'
    case id.includes('ISLAND'):
        return '#d4eb5088'
    case id.includes("AIRBASE"):
      return '#ffffff'
    case id.includes("OBJECTIVE"):
      return '#eba134'
    case id.includes("FOB"):
      return '#b0b0b0'
      case id.includes("CARRIER"):
        return '#919191'
    default:
      return '#ffffff'
  }
}

function RenderDot(x, y, color, text, ctx) {
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  if(text){
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
    ctx.fillText(text, x, y+4);
  }
}

function RenderPolygon(coords, color, ctx) {
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = color;
  ctx.beginPath();
  let first = true
  coords.forEach(coord => {
    if (first) {
      ctx.moveTo(coord[0], coord[1])
      first = false
    } else {
      ctx.lineTo(coord[0], coord[1])
    }
  })
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function clearCanvas(ctx, canvas)
{
  const canvasW = canvas.getBoundingClientRect().width;
  const canvasH = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, canvasW, canvasH);
}

function centerData(mapData) {
  const clonedMap = structuredClone(mapData);
  let centerX = clonedMap["AIRBASE_HOME"][0][0] * -1
  let centerY = clonedMap["AIRBASE_HOME"][0][1] * -1
  Object.keys(clonedMap).forEach(key => {
    clonedMap[key].forEach(coord => {
      coord[0] = coord[0] + centerX
      coord[1] = coord[1] + centerY
    })
  })
  return clonedMap
}

function scaleCoordinates(mapData, canvas) {
  const canvasW = canvas.getBoundingClientRect().width;
  const canvasH = canvas.getBoundingClientRect().height;
  const centerPoint = [canvasW / 2, canvasH / 2]

  let largestOffCenterX = 0;
  let largestOffCenterY = 0;
  const clonedMap = structuredClone(mapData);
  Object.keys(clonedMap).forEach(key => {
    clonedMap[key].forEach(coord => {
      const x = coord[0] < 0 ? coord[0] * -1 : coord[0];
      if(x > largestOffCenterX) largestOffCenterX = x;
      const y = coord[1] < 0 ? coord[1] * -1 : coord[1];
      if(y > largestOffCenterY) largestOffCenterY = y;
    })
  })

  let scaleMultiplier = centerPoint[0]/(largestOffCenterX > largestOffCenterY ? largestOffCenterX : largestOffCenterY);

  Object.keys(clonedMap).forEach(key => {
    clonedMap[key].forEach(coord => {
      coord[0] = centerPoint[0] + (coord[0] * scaleMultiplier)
      coord[1] = centerPoint[1] - (coord[1] * scaleMultiplier)
    })
  })
  return clonedMap;
}
