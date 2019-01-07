import React, { Component } from 'react';
import {
    Upload, message, Button, Icon,
} from 'antd';

import '../styles/UploadPage.css'

const props = {
    name: 'file',
    action: '/api/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class UploadPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedFile: null,
            isUploading: false,
        }
    }

    render() {
        return(
            <div className="upload">
                <Upload {...props}>
                    <Button className="uploadButton">
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>
        );
    }

}

export default UploadPage;