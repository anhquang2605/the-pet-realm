import React, { useState } from "react";
import styles from "./drop-down-list.module.css";

type DropDownListProps = {
  items: string[];
  actions: (() => void)[];
  placeholder?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
};

const DropDownList: React.FC<DropDownListProps> = ({ items, actions, placeholder = "Select an option", setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(placeholder);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (index: number) => {
    setSelected(items[index]);
    setIsOpen(false);
    actions[index]?.(); // Trigger the action

    if (setSelectedItem) {
      setSelectedItem(items[index]);
    }
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selected}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </button>

      <ul className={`${styles.dropdownMenu} ${isOpen ? styles.show : ""}`}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className={styles.dropdownItem}
            onClick={() => handleSelect(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownList;
