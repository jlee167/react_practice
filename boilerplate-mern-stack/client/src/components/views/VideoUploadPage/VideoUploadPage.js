import React from 'react';
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import { useState } from 'react';


const {TextArea} = Input;
const {Title} = Typography;


const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
];

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
];

function VideoUploadPage() {
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    return (
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <Form onSubmit>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Dropzone
                                onDrop
                                multiple
                                maxSize
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div style={{ width:'300px', height: '240px', 
                                        border: '1px solid lightgray', display:'flex', alignItems:'center', 
                                        justifyContent:'center'}} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Icon types="plus" style={{fontSize:'3rem'}} />
                                    </div>
                                )}

                            </Dropzone>
                        </div>
                    </div>


                    <label> Title </label>
                    <Input
                        onChange
                        value
                    />
                    <br />
                    <br />

                    <label>Description</label>
                    <TextArea/>
                    <br />
                    <br />

                    <select onChange>
                        {PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}> {item.label} </option>
                        ))}
                    </select>
                    <br/>
                    <br/>

                    <select onChange>
                        {CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}> {item.label} </option>
                        ))}
                    </select>
                    <br/>
                    <br/>

                    <Button size="large" onClick>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default VideoUploadPage;