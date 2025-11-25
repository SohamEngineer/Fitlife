// CustomAccordion.jsx
import React, { useState } from "react";
import AccordionItem from "../../component/accordino";
import "./style/faq.css"
const Faq = ({ items }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => ( newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <section>
    <div className="container">
    <div className="title">
    <h1 >#Faq</h1>
    <p className="faq-paragraph">Get quick answers to the most common fitness questions so you can train smarter and avoid confusion.</p>
    </div>
    <div className="faq-items">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          id={item.id}
          title={item.title}
          content={item.content}
          expanded={expanded}
          onChange={handleChange}
        />
      ))}
      </div>
    </div>
    </section>
  );
};

export default Faq;
