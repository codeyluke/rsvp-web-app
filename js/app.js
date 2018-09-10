const form = document.getElementById('registrar');
const input = document.querySelector('input');
const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide tose who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);

filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i=0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for (let i=0; i < lis.length; i++) {
      let li = lis[i];
      li.style.display = '';
    }
  }
});

//Creating the name list
const createLI = (text) => {
  const createElement = (elementName, property, value) => {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  const appendToLI = (elementName, property, value) => {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');
  appendToLI('span','textContent', text);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'Edit');
  appendToLI('button', 'textContent', 'Remove');
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

//To confirm the RSVP list
ul.addEventListener('change', (e) => {
  const checkBox = event.target;
  const checked = checkBox.checked;
  // Traverse to the grandparent element, [input -> label -> li. Then the className changes the class of the li element
  const listItem = checkBox.parentNode.parentNode;

  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

//To remove the name for the RSVP list
ul.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const action = button.textContent.toLowerCase();
    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'Save';
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent =  input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'Edit';
      }
    }
    //Select and run the action in the button's name
    nameActions[action]();
  }
});
