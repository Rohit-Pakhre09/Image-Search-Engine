async function fetching(query) {
    try {
        const url = `https://api.unsplash.com/search/photos?page=${page}`;
        const apikey = 'oujVQqKrIJWAM8-_YO9iQDcarJgbIc24PFLQH7BTih8';

        const res = await fetch(`${url}&query=${query}&client_id=${apikey}`);
        const data = await res.json();
        console.log(data);
        let arr = data.results;

        if (page === 1) {
            images.innerHTML = '';
        }

        if (arr.length === 0) {
            msg.innerHTML = `Oops! No images found for <strong>'${query}'</strong>. Please try another search.`;
            return;
        }

        arr.forEach(pic => {
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('img-box');

            let img = document.createElement('img');
            img.src = pic.urls.small;
            img.alt = pic.alt_description || 'Image';

            let overlay = document.createElement('div');
            overlay.classList.add('overlay-text');
            overlay.textContent = pic.alt_description || 'No description available';

            imgContainer.appendChild(img);
            imgContainer.appendChild(overlay);

            images.appendChild(imgContainer);
        });

        if (data.total_pages > page) {
            more.style.display = 'block';
        } else {
            more.style.display = 'none';
        }

    } catch (error) {
        console.log("Error:", error);
    }
}

const btn = document.getElementById('btn');
let input = document.getElementById('input');
const images = document.getElementById('images');
let msg = document.getElementById('guide-msg');
let more = document.getElementById('more');
let page = 1;
let query = "";

btn.addEventListener("click", () => {
    query = input.value.trim();
    page = 1;
    more.style.display = "none";
    if (query === "") {
        msg.textContent = "Please fill the input field first!";
        images.innerHTML = "";
    } else {
        msg.textContent = "";
        fetching(query);
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

more.addEventListener('click', () => {
    page += 1;
    fetching(query);
});
