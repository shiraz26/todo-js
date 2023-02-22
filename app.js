const form = document.querySelector("#to-do-form");
const taskInput = document.querySelector("#task-input");
const incompleteList = document.querySelector("#incomplete-list");
const completedList = document.querySelector("#completed-list");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!taskInput.value)
  return;

  const task = taskInput.value;
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `
    <label>${task}</label>
    <input type="checkbox">
    <button class="edit-btn btn btn-secondary btn-sm">Edit</button>
    <button class="delete-btn btn btn-danger btn-sm">Delete</button>
  `;

  incompleteList.appendChild(li);
  taskInput.value = "";

  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      li.querySelector("label").style.textDecoration = "line-through";
      li.querySelector("label").style.color = "#ccc";
      completedList.appendChild(li);
    } else {
      li.querySelector("label").style.textDecoration = "none";
      li.querySelector("label").style.color = "#000";
      incompleteList.appendChild(li);
    }
  });

  const editBtn = li.querySelector(".edit-btn");
  editBtn.addEventListener("click", function() {
    const label = li.querySelector("label");
    const input = document.createElement("input");
    input.type = "text";
    input.value = label.textContent;
    li.insertBefore(input, label);
    li.removeChild(label);
    editBtn.textContent = "Save";
    editBtn.removeEventListener("click", arguments.callee);
    editBtn.addEventListener("click", function() {
      label.textContent = input.value;
      li.insertBefore(label, input);
      li.removeChild(input);
      editBtn.textContent = "Edit";
      editBtn.removeEventListener("click", arguments.callee);
      editBtn.addEventListener("click", function() {
        const label = li.querySelector("label");
        const input = document.createElement("input");
        input.type = "text";
        input.value = label.textContent;
        li.insertBefore(input, label);
        li.removeChild(label);
        editBtn.textContent = "Save";
        editBtn.removeEventListener("click", arguments.callee);
        editBtn.addEventListener("click", arguments.callee);
      });
    });
  });

  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function() {
    li.remove();
  });
});


  