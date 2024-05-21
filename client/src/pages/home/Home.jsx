import "../../styles/general.css";
import "./style.css";

const Home = () => {
  return (
    <>
      <header>
        <div className="menu">
          <button>Readlist</button>
          <button>Profile</button>
        </div>
      </header>
      <div className="text-container">
        <h1 className="title">MANGABOOK</h1>
        <h2>Mangas & Books All in One Place!</h2>
        <h3>Search, rate, list and share your favorite mangas and books </h3>
      </div>
      <div className="searchbar-container">
        <input type="text" placeholder="Search" className="searchbar" />
      </div>
    </>
  );
};

export default Home;
