import FullList from "../model/FullList";
import ListItem from "../model/ListItem";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}
export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();
    fullList.list.map(item => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
      check.addEventListener("change", (): void => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;

      const deleteBtn = document.createElement("button") as HTMLButtonElement;
      deleteBtn.className = "button";
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", (): void => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      li.append(check, label, deleteBtn);
      this.ul.append(li);
    });
  }
}
