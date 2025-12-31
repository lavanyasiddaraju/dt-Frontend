fetch("data.json")
  .then(res => res.json())
  .then(data => {

    document.getElementById("projectTitle").innerText = data.title;
    document.getElementById("projectDescription").innerText = data.description;

    const grid = document.getElementById("assetGrid");
    const assets = data.tasks[0].assets;

    assets.forEach(asset => {
      const card = document.createElement("div");
      card.className = "asset-card";

      let content = "";

      switch (asset.asset_content_type) {
        case "video":
          content = `<iframe src="${asset.asset_content}"></iframe>`;
          break;

        case "threadbuilder":
        case "article":
          content = `
            <input type="text" placeholder="Title">
            <textarea placeholder="Write here..."></textarea>
          `;
          break;

        case "link":
          content = `<a href="${asset.asset_content}" target="_blank">Read more</a>`;
          break;

        default:
          content = `<p>${asset.asset_description}</p>`;
      }

      card.innerHTML = `
        <div class="asset-header">${asset.asset_title}</div>
        <div class="asset-body">
          <p>${asset.asset_description}</p>
          ${content}
        </div>
      `;

      grid.appendChild(card);
    });

  })
  .catch(err => console.error("Error loading JSON:", err));