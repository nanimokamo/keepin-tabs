// import Preact, { render, h, Component } from 'preact';
import React, { Component } from 'react';

import Icon from '../../Icon';

let newIndex = null;

export class TabsListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			draggedOver: false,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
		this.handleClickRefresh = this.handleClickRefresh.bind(this);
		this.handleClickPin = this.handleClickPin.bind(this);

		this.handleDragEnd = this.handleDragEnd.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.selected && this.props.selected) this.refs.container.scrollIntoView(false);
		if (prevProps.flushDrop !== this.props.flushDrop) this.setState({ draggedOver: false });
	}


	handleDragEnd(e) {
		e.persist();
		e.preventDefault();
		this.props.onDragEnd({
			id: this.props.data.id,
			newIndex: newIndex,
		});

		this.setState({ draggedOver: false });

		newIndex = null;
	}

	handleDragEnter(e) {
		if (!this.props.data.pinned) {
			newIndex = this.props.data.index;
			this.setState({ draggedOver: true });
		}
	}

	handleDragOver(e) {
		this.refs.container.scrollIntoView();
	}

	handleDrop(e) {
		e.preventDefault();
		this.setState({ draggedOver: false });
	}

	handleDragLeave(e) {
		if (newIndex != this.props.data.index) {
			this.setState({ draggedOver: false });
		}
	}

	handleClick() {
		this.props.onClick(this.props.data.id);
	}

	handleClickClose(e) {
		e.persist();
		e.stopPropagation();
		this.props.onClickClose(this.props.data.id);
	}

	handleClickRefresh(e) {
		e.persist();
		e.stopPropagation();
		this.props.onClickRefresh(this.props.data.id);
	}

	handleClickPin(e) {
		e.persist();
		e.stopPropagation();
		this.props.onClickPin(this.props.data.id, this.props.data.pinned);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	render() {
		const data = this.props.data;
		const selectedClass = this.props.selected ? 'is-selected' : null;
		const activeClass = data.active ? 'is-active' : null;
		const pinnedClass = data.pinned ? 'is-active' : null;
		const pinnedTitle = data.pinned ? 'Unpin' : 'Pin';
		const status = data.status;
		const title = status === 'loading' ? 'Loading...' : data.title;
		const url = data.url;
		const noFavIcon = !data.favIconUrl || data.favIconUrl === 'undefined' ? <Icon name="missing" /> : null;
		const draggedOver = this.state.draggedOver ? 'is-dragged-over' : '';

		return (
			<li
			ref="container"
			className={`tabs-list-item ${selectedClass} ${activeClass} ${draggedOver}`}
			onClick={this.handleClick}
			draggable={!this.props.data.pinned}
            onDragEnd={this.handleDragEnd}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
            onMouseUp={this.handleDrop}
            data-status={status}>
            	<div className="tabs-list-item__inner">
				<div className="tabs-list-item__status">
					<div className="favIcon" style={{backgroundImage: `url('${data.favIconUrl}')`}}>{noFavIcon}</div>
					<div className="loading"><Icon name="refresh" /></div>
				</div>
				<div className="tabs-list-item__details">
					<div className="title" title={title}>{title}</div>
					<div className="url" title={url}>{url}</div>
				</div>
				<div className="tabs-list-item__options">
					<button className={`icon-button ${pinnedClass}`} onClick={this.handleClickPin} title={pinnedTitle}><Icon name="pin" /></button>
					<button className="icon-button" onClick={this.handleClickRefresh} title="Refresh"><Icon name="refresh" /></button>
					<button className="icon-button" onClick={this.handleClickClose} title="Close"><Icon name="close" /></button>
				</div>
				</div>
			</li>
		)
	}
};

export default TabsListItem;
