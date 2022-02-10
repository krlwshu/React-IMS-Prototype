import React from "react";
import { StoryCard } from "./index";



function Home() {

  const storyData = [
    {
      role: "Inventory Manager",
      desc: "As an inventory manager I need to ensure products required for projects are available at all times!",
      journey: "Inventory Journey",
      avatar: "avatar1.png",
      name: "John",
      link: "inventory",
      supplierId:0
    },
    {
      role: "Supplier Manager  GTX Networks",
      desc: "As an supplier, we work as part of a global supply chain. Efficiency is key to success of our customers.",
      journey: "Supplier Journey - GTX Networks",
      avatar: "avatar1.png",
      name: "Jane",
      link: "supplierorders",
      supplierId:2
    },
    {
      role: "Supplier Network Parts Ltd.",
      desc: "As an supplier, we work as part of a global supply chain. Efficiency is key to success of our customers.",
      journey: "Supplier Journey - Network parts Ltd",
      avatar: "avatar1.png",
      name: "Jack",
      link: "supplierorders",
      supplierId: 1
    },

  ]

  const handleStoryClick = (story) => {
    if(story.supplierId !== undefined){
      localStorage.setItem("supplier_id", story.supplierId)
    }
  };
  


  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          {storyData.map((story, id) => (
            <div class="col-lg-6" key={id}>
              <StoryCard
                onClick={() => handleStoryClick(story)}
                role={story.role}
                desc={story.desc }
                avatar="avatar1.png"
                name={story.name}
                journey={story.journey}
                link={story.link}
              />
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;