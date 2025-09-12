import React, { useState } from "react";
import styles from "./drop-down-list.module.css";

type DropDownListProps = {
  items: OptionItem[];
  actions: (() => void)[];
  placeholder?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
  darkMode?: boolean
};
export interface OptionItem{
    title: string;
    value: string;
}
const DropDownList: React.FC<DropDownListProps> = ({ items, actions, placeholder = "Select an option", setSelectedItem, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(placeholder);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (index: number) => {
    setSelected(items[index].value);
    setIsOpen(false);
    actions[index]?.(); // Trigger the action

    if (setSelectedItem) {
      setSelectedItem(items[index].value);
    }
  };

  return (
    <div className={styles.dropdown + (darkMode ? ` ${styles.dark}` : "")}>
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
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownList;
