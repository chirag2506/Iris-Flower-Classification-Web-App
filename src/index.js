import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            petal: "",
            sepal: "",
            pwidth: "",
            swidth: "",
            result: ""
        }
        this.handlechange = this.handlechange.bind(this)
        this.getresponse = this.getresponse.bind(this)
        this.clear = this.clear.bind(this)
    }

    clear(e) {
        e.preventDefault()
        this.setState({
            petal: "",
            sepal: "",
            pwidth: "",
            swidth: "",
        })
        ReactDOM.findDOMNode(this.refs.i1).value = ""
        ReactDOM.findDOMNode(this.refs.i2).value = ""
        ReactDOM.findDOMNode(this.refs.i3).value = ""
        ReactDOM.findDOMNode(this.refs.i4).value = ""
    }

    getresponse(e) {
        e.preventDefault()
        const data = {
            "petal": this.state.petal,
            "pwidth": this.state.pwidth,
            "sepal": this.state.sepal,
            "swidth": this.state.swidth
        }
        fetch('https://iris-flower-classifier.herokuapp.com/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.status === 200)
                    return response.text()
                else
                    this.setState({ result: "Some error occured" })
            })
            .then((responsetext) => {
                this.setState({ result: responsetext })
                console.log(responsetext)
                alert(this.state.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handlechange(event) {
        const target = event.target
        if (target.name === "petal_length") {
            this.setState({ petal: target.value })
        }
        if (target.name === "sepal_length") {
            this.setState({ sepal: target.value })
        }
        if (target.name === "sepal_width") {
            this.setState({ swidth: target.value })
        }
        if (target.name === "petal_width") {
            this.setState({ pwidth: target.value })
        }
    }
    render() {
        return (
            <div>
                <div className="cover" id="cover">
                    <img id="logo" src="./logo.png" alt = "Iris"></img>
                </div>
                <div className="container-contact100">
                    <div className="wrap-contact100">
                        <form className="contact100-form validate-form" autoComplete="off">
                            <span className="contact100-form-title">
                                Iris Flower Classification
				        </span>

                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Sepal length</span>
                                <input className="input100" type="text" ref = 'i1' name="sepal_length" placeholder="Enter the sepal length" onChange={this.handlechange}></input>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Sepal width</span>
                                <input className="input100" type="text" ref = "i2" name="sepal_width" placeholder="Enter the sepal width" onChange={this.handlechange}></input>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Petal length</span>
                                <input className="input100" type="text" ref = "i3" name="petal_length" placeholder="Enter the petal length" onChange={this.handlechange}></input>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Petal width</span>
                                <input className="input100" type="text" ref = "i4" name="petal_width" placeholder="Enter the petal width" onChange={this.handlechange}></input>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="contact100-form-bgbtn"></div>
                                    <button className="contact100-form-btn" onClick={this.getresponse}>
                                        <span>
                                            Submit
								<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="contact100-form-bgbtn"></div>
                                    <button className="contact100-form-btn" onClick={this.clear}>
                                        <span>
                                            Clear
								<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

ReactDOM.render(
    <Form />, document.getElementById('root')
)