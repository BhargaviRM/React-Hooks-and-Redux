import { useState } from "react";
import "./styles.css";

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    setCheckedItems({
      check1: isChecked,
      check2: isChecked,
      check3: isChecked,
    });
  };

  const handleCheckItem = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevItems) => {
      const newCheckedItems = { ...prevItems, [id]: checked };
      const allChecked = Object.values(newCheckedItems).every(Boolean);
      setIsChecked(allChecked);
      return newCheckedItems;
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <input
          type="checkbox"
          id="checkAll"
          checked={isChecked}
          onChange={handleCheckAll}
        />
        <label htmlFor="checkAll">Select All</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="check1"
          checked={checkedItems.check1}
          onChange={handleCheckItem}
        />
        <label htmlFor="check1">1</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="check2"
          checked={checkedItems.check2}
          onChange={handleCheckItem}
        />
        <label htmlFor="check2">2</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="check3"
          checked={checkedItems.check3}
          onChange={handleCheckItem}
        />
        <label htmlFor="check3">3</label>
      </div>
    </div>
  );
};

export default App;
