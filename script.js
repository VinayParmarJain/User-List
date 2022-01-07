const URL =
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/26f30067-e979-455d-a971-ae23f70d5a8d/sample_user_data_20k.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220105T202309Z&X-Amz-Expires=86400&X-Amz-Signature=12e20d0e9c9ad14140f7ff3dd91320e26e16bde52ecd9640525aec7ed97220b3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sample_user_data_20k.json%22&x-id=GetObject";
let div = document.getElementById("data");
const search = document.getElementById("search");
let x = 10;

async function printData() {

  // Fetch users list
  try {
    let res = await fetch(URL);
    let resData = await res.json();
    localStorage.setItem("resData", JSON.stringify(resData));
    let localData = JSON.parse(localStorage.getItem("resData"));
   
     // Rendering UI
    for (let i = 0; i < 10; i++) {
      let html = `
      <div class="row dataDisplay">
        <div class="col">
        ${localData.objects[i].ID}
        </div>
        <div class="col">
        ${localData.objects[i].FirstNameLastName}
        </div>
        <div class="col">
        ${localData.objects[i].Company}
        </div>
      </div>
    `;
      div.innerHTML += html;
    }

    // Virtual Scroll
    window.addEventListener("scroll", function () {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        for (let i = x++; i < x; i++) {
          div.innerHTML += `
          <div class="row dataDisplay">
            <div class="col">
              ${localData.objects[i].ID}
            </div>
            <div class="col">
              ${localData.objects[i].FirstNameLastName}
            </div>
            <div class="col">
              ${localData.objects[i].Company}
            </div>
        </div>
         `;
          // div.innerHTML += html;
        }
      }
    });

      // Function on search
    let searchName = function (searchText) {
      let matches = localData.objects.filter((user) => {
        const regx = new RegExp(`^${searchText}`, "gi");
        return user.ID.match(regx) || user.FirstNameLastName.match(regx);
      });
      // if(searchText.length === 0){
      //   matches = [];
      // }

    outputHtml(matches);
    console.log(matches)
    };

    // Listen for Search
    search.addEventListener("input", () => searchName(search.value));
  } catch (err) {
    console.log(err);
  }
}
printData();

// Rendering UI

const outputHtml = (matches) => {

  for (let i = 0; i < 5; i++) {
  console.log(matches[i].ID)
  console.log(matches.length)
    div.innerHTML += `
      <div class="row dataDisplay">
        <div class="col">
          ${matches[i].ID}
        </div>
        <div class="col">
          ${matches[i].FirstNameLastName}
        </div>
        <div class="col">
          ${matches[i].Company}
        </div>
      </div>
   `;
  }

  window.addEventListener("scroll", function () {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 5) {
      for (let i = x++; i < x; i++) {
        console.log(matches[i].ID)
        console.log(matches.length)
          div.innerHTML += `
            <div class="row dataDisplay">
              <div class="col">
                ${matches[i].ID}
              </div>
              <div class="col">
                ${matches[i].FirstNameLastName}
              </div>
              <div class="col">
                ${matches[i].Company}
              </div>
            </div>
         `;
        }
    }
    console.log(matches)
  });
};


