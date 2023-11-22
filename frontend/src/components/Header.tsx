export default function Header() {
  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <a href="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </a>
        </h1>
        <form className="text-field-with-button">
          <input className="text-field main-search-field" type="search" />
          <button className="button button-primary">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-50 -50 530 550"
              transform="scale(-1, 1)"
              fill="currentColor"
              xmlSpace="preserve"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
            >
              <path d="m464.524 412.846-97.929-97.925c23.6-34.068 35.406-72.047 35.406-113.917 0-27.218-5.284-53.249-15.852-78.087-10.561-24.842-24.838-46.254-42.825-64.241-17.987-17.987-39.396-32.264-64.233-42.826C254.246 5.285 228.217.003 200.999.003c-27.216 0-53.247 5.282-78.085 15.847C98.072 26.412 76.66 40.689 58.673 58.676c-17.989 17.987-32.264 39.403-42.827 64.241C5.282 147.758 0 173.786 0 201.004c0 27.216 5.282 53.238 15.846 78.083 10.562 24.838 24.838 46.247 42.827 64.234 17.987 17.993 39.403 32.264 64.241 42.832 24.841 10.563 50.869 15.844 78.085 15.844 41.879 0 79.852-11.807 113.922-35.405l97.929 97.641c6.852 7.231 15.406 10.849 25.693 10.849 9.897 0 18.467-3.617 25.694-10.849 7.23-7.23 10.848-15.796 10.848-25.693.003-10.082-3.518-18.651-10.561-25.694zM291.363 291.358c-25.029 25.033-55.148 37.549-90.364 37.549-35.21 0-65.329-12.519-90.36-37.549-25.031-25.029-37.546-55.144-37.546-90.36 0-35.21 12.518-65.334 37.546-90.36 25.026-25.032 55.15-37.546 90.36-37.546 35.212 0 65.331 12.519 90.364 37.546 25.033 25.026 37.548 55.15 37.548 90.36 0 35.216-12.519 65.331-37.548 90.36z"></path>
            </svg>
          </button>
        </form>
        <a href="/post-ad" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </a>
      </div>
      <nav className="categories-navigation">
        <a href="" className="category-navigation-link">
          Ameublement
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Électroménager
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Photographie
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Informatique
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Téléphonie{" "}
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Vélos
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Véhicules
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Sport
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Habillement
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Bébé
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Outillage
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Services{" "}
        </a>{" "}
        •
        <a href="" className="category-navigation-link">
          Vacances
        </a>
      </nav>
    </header>
  );
}
