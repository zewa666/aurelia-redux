import marked from 'marked';
import {createStore} from 'redux';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';
import {
  bindable,
  bindingMode
} from 'aurelia-framework';

export class Markdown {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) raw;

  store = createStore(undoable(textUpdater));
  html = '';
  pastCount = 0;
  futureCount = 0;

  constructor() {
    this.store.subscribe(this.update.bind(this));
    this.update();
  }

  // update properties only here 
  update() {
    const state = this.store.getState().present;
    this.html = state.html;
    this.raw = state.raw;
    this.pastCount = this.store.getState().past.length;
    this.futureCount = this.store.getState().future.length;
  }

  keyupHandler(newValue) {
    this.store.dispatch(updateText(newValue));
  }

  undo() {
    this.store.dispatch(ActionCreators.undo());
  }

  redo() {
    this.store.dispatch(ActionCreators.redo());
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
