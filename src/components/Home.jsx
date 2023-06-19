import Card from "./Card";
import Kanban from "./Kanban";
import NavBar from "./NavBar";
import MenuBar from "./MenuBar";

function Home() {
  return (
    <div className="container">
      <div className="menu">
        <MenuBar
          projectName={"Project M"}
          userName={"Anima Agrawal"}
          address={"U.P, Noida"}
        />
      </div>

      <div className="flex">
        <NavBar />
        <Kanban />
      </div>
    </div>
  );
}

export default Home;
