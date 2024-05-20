import ElementCard from "./ElementCard";

import afterGodCover from "../assets/images/after-god.jpg";
import akiraCover from "../assets/images/akira.jpg";
import anotherCover from "../assets/images/another.jpg";
import berserkCover from "../assets/images/berserk.jpg";
import dandadanCover from "../assets/images/dandadan.jpg";
import hunterxhunterCover from "../assets/images/hunterxhunter.jpg";
import tokyoGhoulCover from "../assets/images/tokyo-ghoul.jpg";
import homunculusCover from "../assets/images/homunculus.jpg";

const listData2 = [
  { title: "After God", cover: afterGodCover },
  { title: "After God", cover: akiraCover },
  { title: "After God", cover: anotherCover },
  { title: "After God", cover: berserkCover },
  { title: "After God", cover: dandadanCover },
  { title: "After God", cover: hunterxhunterCover },
  { title: "After God", cover: tokyoGhoulCover },
  { title: "After God", cover: homunculusCover },
];

const Grid = () => {
  return (
    <main className="content-grid">
      {listData2.map((element, index) => (
        <ElementCard key={index} title={element.title} cover={element.cover} />
      ))}
    </main>
  );
};

export default Grid;
