/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, property, customElement } from 'lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store, RootState } from '../store';

// These are the actions needed by this element.
import { increment, decrement } from '../actions/counter';

// We are lazy loading its reducer.
import counter from '../reducers/counter';
store.addReducers({
  counter
});

// These are the elements needed by this element.
import './counter-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles';

@customElement('my-view2')
export class MyView2 extends connect(store)(PageViewElement) {
  @property({ type: Number })
  private _clicks = 0;

  @property({ type: Number })
  private _value = 0;

  static get styles() {
    return [SharedStyles];
  }

  protected render() {
    return html`
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${this._value}</div>
        <p>
          This page contains a reusable
          <code>&lt;counter-element&gt;</code>. The element is not built in
          a Redux-y way (you can think of it as being a third-party element
          you got from someone else), but this page is connected to the
          Redux store. When the element updates its counter, this page
          updates the values in the Redux store, and you can see the
          current value of the counter reflected in the bubble above.
        </p>
        <br /><br />
      </section>
      <section>
        <p>
          <counter-element
            value="${this._value}"
            clicks="${this._clicks}"
            @counter-incremented="${this._counterIncremented}"
            @counter-decremented="${this._counterDecremented}"
          >
          </counter-element>
        </p>
      </section>
    `;
  }

  private _counterIncremented() {
    store.dispatch(increment());
  }

  private _counterDecremented() {
    store.dispatch(decrement());
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this._clicks = state.counter!.clicks;
    this._value = state.counter!.value;
  }
}
