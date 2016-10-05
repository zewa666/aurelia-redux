import marked from 'marked';
import {
  bindable,
  bindingMode
} from 'aurelia-framework';

export class MarkdownAurelia {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) raw;

  html = '';

  rawChanged(newValue) {
    this.html = marked(newValue);
  }
}
