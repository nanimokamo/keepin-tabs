// import Preact, { render, h, Component } from 'preact';
import React, { Component } from 'react';

class TextInput extends Component {
	constructor() {
		this.state = {
			value: this.props.value
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.value});
	}

	handleChange(e) {
		const { name, value } = e.target.name;

		this.setState({value: value}, () => {
			if (typeof this.props.onChange == 'function') {
				this.props.onChange(name, value);
			}
		});
	}

	render() {
		const { name, label, type } = this.props.name;
		const value = this.state.value;

		return (
			<div className="text-input">
				{label ? <label htmlFor={name}>{label}</label> : null}
				<input type={type || 'text'} className="text-input" name={name} value={value} onChange={this.handleChange} placeholder={label} />
			</div>
		)
	}
};

export default TextInput;
