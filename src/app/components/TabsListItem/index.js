import React from 'react';

import Icon from '../Icon';
import { goToTab, pinTab, closeTab, refreshTab } from '../../utils.js';

const TabsListItem = ({ id, title, status, url, pinned, highlighted, favIconUrl, selected, deselectTab, selectTab }) => {
	const formattedTitle = status === 'loading' ? 'Loading...' : title;
	const noFavIcon = !favIconUrl || favIconUrl === 'undefined' ? <Icon name="missing" /> : null;

	return (
		<li
			className="TabsListItem"
			ref={(e) => {
				if (highlighted && e) e.scrollIntoView();
			}}
			data-id={id}
			data-highlighted={highlighted}
			data-pinned={pinned}
			data-selected={selected}
			data-status={status}
			title={`${title} - ${url}`}
		>
			<div className="TabsListItem-inner">
				<div
					className="TabsListItem-fake"
					onClick={() => goToTab(id)}
				/>
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

					<div
						className="TabsListItem-icon TabsListItem-select"
						onClick={() => {
							selected ? deselectTab(id) : selectTab(id)
						}}
					>
						<Icon name="checkbox" />
						<Icon name="checkbox--checked" />
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
						className="icon-button"
						onClick={(e) => {
							pinTab(id, !pinned);
						}}
						title={pinned ? 'Unpin' : 'Pin'}
						data-selected={pinned}
					>
						<Icon name="pin" />
					</button>
					<button
						className="icon-button"
						onClick={(e) => {
							refreshTab(id);
						}}
						title="Refresh"
					>
						<Icon name="refresh" />
					</button>
					<button
						className="icon-button"
						onClick={(e) => {
							closeTab(id);
						}}
						title="Close"
					>
						<Icon name="close" />
					</button>
				</div>
			</div>
		</li>
	);
}

export default TabsListItem;
