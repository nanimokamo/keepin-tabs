import React, { Component } from 'react';

import Icon from '../../Icon';
import { sortBy, throttle, goToTab, pinTab, closeTab, refreshTab, moveTab } from '../../../utils.js';

let newIndex = null;

export class TabsListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			draggedOver: false,
		};

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

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	render() {
		const { data, selected } = this.props;
		const { id, title, status, url, pinned, active, favIconUrl } = data;

		const formattedTitle = status === 'loading' ? 'Loading...' : title;
		const selectedClass = selected ? 'is-selected' : '';
		const activeClass = active ? 'is-active' : '';
		const pinnedClass = pinned ? 'is-active' : '';
		const noFavIcon = !favIconUrl || favIconUrl === 'undefined' ? <Icon name="missing" /> : null;
		const draggedOver = this.state.draggedOver ? 'is-dragged-over' : '';

		return (
			<li
				ref="container"
				className={`TabsListItem ${selectedClass} ${activeClass} ${draggedOver}`}
				onClick={() => goToTab(id)}
				draggable={!pinned}
	            onDragEnd={this.handleDragEnd}
	            onDragEnter={this.handleDragEnter}
	            onDragLeave={this.handleDragLeave}
	            onDrop={this.handleDrop}
	            onMouseUp={this.handleDrop}
	            data-status={status}
			>
            	<div className="TabsListItem-inner">
					<div className="TabsListItem-status">
						<div
							className="TabsListItem-icon TabsListItem-favicon"
							style={{backgroundImage: `url('${favIconUrl}')`}}
						>
							{noFavIcon}
						</div>
						<div
							className="TabsListItem-icon TabsListItem-loading"
						>
							<Icon name="refresh" />
						</div>
					</div>
					<div className="TabsListItem-details">
						<div
							className="TabsListItem-title"
							title={formattedTitle}
						>
							{formattedTitle}
						</div>
						<div
							className="TabsListItem-url"
							title={url}
						>
							{url}
						</div>
					</div>
					<div className="TabsListItem-options">
						<button
							className={`icon-button ${pinnedClass}`}
							onClick={(e) => {
								e.persist();
								e.stopPropagation();
								pinTab(id, !pinned);
							}}
							title={pinned ? 'Unpin' : 'Pin'}
						>
							<Icon name="pin" />
						</button>
						<button
							className="icon-button"
							onClick={() => refreshTab(id)}
							title="Refresh"
						>
							<Icon name="refresh" />
						</button>
						<button
							className="icon-button"
							onClick={() => closeTab(id)}
							title="Close"
						>
							<Icon name="close" />
						</button>
					</div>
				</div>
			</li>
		)
	}
};

export default TabsListItem;
