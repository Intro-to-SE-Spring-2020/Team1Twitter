import React from 'react';
import {
    Card,
    Image,
    FormControl
} from 'react-bootstrap'
import {
    Heart,
    HeartFill,
    ArrowRepeat,
    Dot,
    Pencil,
    XCircle,
    X,
    CheckCircle
} from 'react-bootstrap-icons'
import "./Chirp.scss"

const Chirp = (props) => {
    const [chirpContent, setChirpContent] = React.useState(props.data.content)
    const [showInput, setShowInput] = React.useState(false);
    const [isEditing, setEditing] = React.useState(false);
    const inputRef = React.useRef(null);

    const { name, username, content, likes, retweets, time, _id } = props.data;

    React.useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
            setChirpContent(content)
        }
        else {
            setShowInput(false)
        }
    }, [isEditing, content])

    const edit = () => {
        if (props.data.isOwned && !isEditing) {
            return (
                <span
                    className="float-right"
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                        setShowInput(true)
                        setEditing(true)
                    }}
                >
                    <Pencil className="text-success" style={{fontSize: '24px'}}/>
                </span>
            )
        }
        else if (props.data.isOwned && isEditing) {
            return (
                <>
                    <span
                        className="float-right hover-opacity ml-3"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            setShowInput(false)
                            setEditing(false)
                        }}
                    >
                        Cancel <X className="" style={{fontSize: '24px'}}/>
                    </span>
                    <span
                        className="float-right hover-opacity"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            props.handleEdit(_id, chirpContent)
                            setShowInput(false)
                            setEditing(false)
                        }}
                    >
                        Update <CheckCircle className="" style={{fontSize: '24px'}}/>
                    </span>
                </>
            )
        }
    }

    const del = () => {
        if (props.data.isOwned) {
            return (
                <span
                    className="float-right text-danger hover-opacity"
                    style={{cursor: 'pointer'}}
                    onClick={() => props.handleDelete(_id)}
                >
                    <XCircle className="text-danger" style={{fontSize: '24px'}}/>
                </span>
            )
        }
    }

    const renderInput = () => {
        if (showInput) {
            return (
                <FormControl
                    placeholder="Chirp cannot be empty!"
                    value={chirpContent}
                    onChange={(e) => setChirpContent(e.target.value)}
                    ref={inputRef}
                    className="mt-4 mb-2"
                />
            )
        }
    }

    return (
        <>
            <Card className={["shadow", props.className]}>
                <Card.Body>
                    <div className="mb-2" style={{position: 'relative'}}>
                        <Image style={{
                            position: 'absolute',
                            maxWidth: '40px',
                            left: 0,
                            top: '15%',
                            transform: 'translate(0%, -15%)'
                            }} src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                        <span className="ml-5">
                            <strong>{name}</strong>
                            <span className="text-muted ml-2">
                                @{username} <Dot/> {time}
                            </span>
                        </span>
                        {edit()}
                    </div>
                    <Card.Text
                        className="ml-5"
                        style={{display: `${showInput ? 'none': 'block'}`}}
                    >
                        {chirpContent}
                    </Card.Text>
                    {renderInput()}
                    <div className="pl-5">
                        <span style={{cursor: 'pointer'}}>
                            <Heart style={{fontSize: '24px'}}/>
                            Like
                        </span>
                        <span style={{cursor: 'pointer'}} className="ml-4">
                            <ArrowRepeat style={{fontSize: '24px'}}/>
                            ReChirp
                        </span>
                        {del()}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default Chirp;