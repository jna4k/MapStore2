import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import withPluginDefinition from '../withPluginsDefinition';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../libs/ajax';

import '../../../libs/bindings/rxjsRecompose';

let mockAxios;
const PLUGINS_CONFIG = {plugins: [{name: "TEST", title: "testTitle", "description": "test description", glyph: "test-glyph"}]};

describe('withPluginDefinition enhancer', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        mockAxios = new MockAdapter(axios);
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        mockAxios.restore();
        setTimeout(done);
    });
    it('withPluginDefinition rendering with defaults', (done) => {
        mockAxios.onGet().reply(() => [200, PLUGINS_CONFIG]);
        const Sink = withPluginDefinition()(({ pluginsConfig, extensions }) => {
            if (pluginsConfig) {
                try {
                    expect(extensions[0].title).toBe(PLUGINS_CONFIG.plugins[0].title);
                    expect(extensions[0].description).toBe(PLUGINS_CONFIG.plugins[0].description);
                    expect(extensions[0].glyph).toBe(PLUGINS_CONFIG.plugins[0].glyph);
                } catch (e) {
                    done(e);
                }
                done();
            }
            return null;
        });
        ReactDOM.render(<Sink extensions={[{ name: "TEST"}]} />, document.getElementById("container"));
    });
});
