
import { isFunction } from '../../utils/Utils';
import React, { forwardRef } from 'react';
import ReactQuillEditor from 'react-quill';
import resizeModuleIFrameToolbarConfigFactory from './modules/ResizeModule';

const { Quill } = ReactQuillEditor;

const {ResizeModule, IFrame, toolbarConfig } = resizeModuleIFrameToolbarConfigFactory(Quill);

Quill.register({
    'formats/video': IFrame,
    'modules/resizeModule': ResizeModule
});

function ReactQuill({ modules, ...props }, ref) {
    return (
        <ReactQuillEditor
            ref={ref}
            {...props}
            modules={isFunction(modules) ? modules(toolbarConfig) : modules}
        />
    );
}

export default forwardRef(ReactQuill);

