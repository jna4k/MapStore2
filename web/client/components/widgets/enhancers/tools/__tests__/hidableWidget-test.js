/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {compose, defaultProps} from 'recompose';

import hidableWidget from '../hidableWidget';

// enabled collapse tools
const hidable =
    compose(
        defaultProps({
            toolsOptions: {
                showHide: true
            }
        }),
        hidableWidget()
    );
describe('hidableWidget enhancer', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('hidableWidget rendering with defaults', (done) => {
        const Sink = hidableWidget()( props => {
            expect(props).toExist();
            expect(props.widgetTools.length).toBe(0);
            done();
            return null;
        });
        ReactDOM.render(<Sink />, document.getElementById("container"));
    });
    it('when toolsOptions.showHide = true adds a widget tool', (done) => {
        const Sink = hidable((props) => {
            expect(props).toExist();
            expect(props.widgetTools.length).toBe(1);
            expect(props.widgetTools[0].glyph).toExist();
            done();
            return null;
        });
        ReactDOM.render(<Sink />, document.getElementById("container"));
    });
    it('updateProperty callback', () => {
        const actions = {
            updateProperty: () => {}
        };
        const spy = expect.spyOn(actions, 'updateProperty');
        const Sink = hidable(({ widgetTools = [] }) => {
            expect(widgetTools[0]).toExist();
            widgetTools[0].onClick();
            return null;
        });
        ReactDOM.render(<Sink id={"some_id"} updateProperty={actions.updateProperty}/>, document.getElementById("container"));
        expect(spy).toHaveBeenCalled();
        expect(spy.calls[0].arguments[0]).toBe("some_id");
        expect(spy.calls[0].arguments[1]).toBe("hide");
        expect(spy.calls[0].arguments[2]).toBe(true);
        ReactDOM.render(<Sink id={"some_id"} hide updateProperty={actions.updateProperty} />, document.getElementById("container"));
        expect(spy).toHaveBeenCalled();
        expect(spy.calls[1].arguments[0]).toBe("some_id");
        expect(spy.calls[1].arguments[1]).toBe("hide");
        expect(spy.calls[1].arguments[2]).toBe(false);

    });
});
