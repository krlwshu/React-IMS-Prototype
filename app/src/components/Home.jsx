import React from "react";
import { StoryCard } from "./index";

localStorage.setItem("supplier_id", 1)

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-6">
            <StoryCard 
              role="Inventory Manager"
              desc="As an inventory manager I need to ensure products required for projects are available at all times!"
              avatar="avatar1.png"
              name="John"
              journey="Inventory Journey"
              link="inventory"
              />
          </div>
          <div class="col-lg-6">
            <StoryCard 
              role="Supplier"
              desc="As an supplier, we work as part of a global supply chain. Efficiency is key to success of our customers."
              avatar="avatar1.png"
              name="Jane"
              journey="Supplier Journey"
              link="supplier"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;