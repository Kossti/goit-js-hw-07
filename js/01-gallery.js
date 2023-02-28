import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const galerryContainer = document.querySelector(".gallery");
const galleryMarkup = createGaleryImageMarkup(galleryItems);

galerryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galerryContainer.addEventListener("click", showImageOnClick);

function createGaleryImageMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item" >
        <a class="gallery__link" href=${original}">
                <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                />
        </a>
        </li >
        `;
    })
    .join("");
}

function showImageOnClick(evt) {
  evt.preventDefault();

  const isGalleryItemEl = evt.target.classList.contains("gallery__image");
  if (!isGalleryItemEl) return;
  console.log(evt.target.dataset.source);
  showModal(evt);
}

function showModal(evt) {
  const instance = basicLightbox.create(
    `<img src=${evt.target.dataset.source}>`,
    {
      onShow: (_instance) => {
        window.addEventListener("keydown", closeModalOnEscKey);
      },
      onClose: (_instance) => {
        window.removeEventListener("keydown", closeModalOnEscKey);
      },
    }
  );
  instance.show();

  function closeModalOnEscKey(evt) {
    if (evt.code === "Escape") {
    }
    instance.close();
  }
}
