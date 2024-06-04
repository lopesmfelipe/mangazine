import { Axios } from "axios";
import "../../styles/general.css";
import "./home.css";

const Home = () => {
  const [searchedName, setSearchedName] = useState(null);

  const findTitle = async () => {
    const response = await Axios.get(`localhost:2000/api/v1/titles/search/${searchedName}`)
  }

  return (
    <>
      <header>
        <div className="menu">
          <button>Readlist</button>
          <button>Profile</button>
        </div>
      </header>
      <main>
        <div className="text-container">
          <h1 className="home-title">MANGABOOK</h1>
          <h2>Mangas & Books All in One Place!</h2>
          <h3>Search, rate, list and share your favorite mangas and books </h3>
        </div>
        <div className="searchbar-container">
          <input type="text" placeholder="Search" onChange={(event) => {
            setSearchedName(event.target.value)
          }} className="searchbar" />
        </div>
      </main>
    </>
  );
};

export default Home;
