import marked from 'marked';
import {createStore} from 'redux';
import {
  bindable,
  bindingMode
} from 'aurelia-framework';

export class MarkdownRedux {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) raw;

  store = createStore(textUpdater);
  html = '';

  constructor() {
    this.store.subscribe(this.update.bind(this));
  }

  // update properties only here 
  update() {
    const state = this.store.getState();
    this.html = state.html;
    this.raw = state.raw;
  }

  keyupHandler(newValue) {
    this.store.dispatch(updateText(newValue));
  }

  attached() {
    this.keyupHandler(this.raw);
  }
}

export const TEXT_UPDATE = 'UPDATE';

// action
const updateText = (text) => {
  return {
    type: TEXT_UPDATE,
    text
  };
};

// reducer
export function textUpdater(state = { raw: '', html: '' }, action) {
  switch (action.type) {
  case TEXT_UPDATE:
    return {
      raw: action.text,
      html: marked(action.text)
    };
  default:
    return state;
  }
}
