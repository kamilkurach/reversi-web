class View {
  constructor() {
    // from developer.mozilla.org
    document.body.onload = this.addElement;
  }

  initView() {
    console.log('init View class');
  }

  // from developer.mozilla.org
  addElement() {
    // create a new div element
    const newDiv = document.createElement('div');

    // and give it some content
    const newContent = document.createTextNode('Hi there and greetings!');

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById('div1');
    document.body.insertBefore(newDiv, currentDiv);
  }
}

export { View };
