import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./template/ListTemplate";

function main(): void {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const newItemInput = document.getElementById("newItem") as HTMLInputElement;
    const itemText: string = newItemInput.value.trim();
    if (!itemText.length) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(itemId.toString(), itemText);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  const clearBtn = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearBtn.addEventListener("click", () => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
}
document.addEventListener("DOMContentLoaded", main);
