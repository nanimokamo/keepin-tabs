import React from 'react';

import IconButton from '../IconButton';
import Icon from '../Icon';

import { goToTab, pinTab, closeTab, refreshTab } from '../../utils.js';

const missingIcon = () => <Icon name="missing" />;

const TabsItem = ({ id, title, status, url, pinned, highlighted, favIconUrl, selected, deselectTab, selectTab, className }) => {
	console.log(className);
	const formattedTitle = status === 'loading' ? 'Loading...' : title;
	const noFavIcon = !favIconUrl || favIconUrl === 'undefined' ? missingIcon : null;

	return (
		<li
			className="TabsItem"
			ref={(e) => {
				// if (highlighted && e) e.scrollIntoView();
			}}
			data-id={id}
			data-highlighted={highlighted}
			data-pinned={pinned}
			data-selected={selected}
			data-status={status}
			title={`${title} - ${url}`}
		>
			<div className="TabsItem-inner">
				<div className="TabsItem-fake" onClick={() => goToTab(id)} />
				<div className="TabsItem-status">
					<div className="TabsItem-icon TabsItem-favicon" style={{backgroundImage: `url('${favIconUrl}')`}}>
						{noFavIcon}
					</div>
					<div className="TabsItem-icon TabsItem-loading">
						<Icon name="refresh" />
					</div>

					<div className="TabsItem-icon TabsItem-select" onClick={() => selected ? deselectTab(id) : selectTab(id)}>
						<Icon name="checkbox" />
						<Icon name="checkbox--checked" />
					</div>
				</div>
				<div className="TabsItem-details">
					<div className="TabsItem-title" title={formattedTitle}>
						{formattedTitle}
					</div>
					<div className="TabsItem-url" title={url}>
						{url}
					</div>
				</div>
				<div className="TabsItem-options">
					<IconButton
						onClick={() => {
							pinTab(id, !pinned);
						}}
						title={pinned ? 'Unpin' : 'Pin'}
						data-selected={pinned}
						icon="pin"
					/>
					<IconButton
						onClick={() => {
							refreshTab(id);
						}}
						title="Refresh"
						icon="refresh"
					/>
					<IconButton
						onClick={() => {
							closeTab(id);
						}}
						title="Close"
						icon="close"
					/>
				</div>
			</div>
		</li>
	);
}

export default TabsItem;
