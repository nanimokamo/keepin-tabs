import Preact, { render, h, Component } from 'preact';
import TabsList from '../TabsList';
import TabsListItem from '../TabsList/TabsListItem';
import Icon from '../Icon';
import { sortBy, throttle } from '../../utils.js';
import groupBy from 'lodash.groupby';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: sortBy(this.props.tabs, 'index'),
			selectedId: null,
			search: null,
			results: [],
			state: 'default',
			flushDrop: new Date(),
		};

		this.setTabs = this.setTabs.bind(this);
		this.setSearch = this.setSearch.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.goToTab = this.goToTab.bind(this);
		this.closeTab = this.closeTab.bind(this);
		this.refreshTab = this.refreshTab.bind(this);
		this.pinTab = this.pinTab.bind(this);
		this.groupTabs = this.groupTabs.bind(this);
		this.setStateSearch = this.setStateSearch.bind(this);
		this.setStateDefault = this.setStateDefault.bind(this);
		this.handleKeyDown = throttle(this.handleKeyDown.bind(this), 100);

		this.handleDragEnd = this.handleDragEnd.bind(this);
	}

	handleDragEnd({ id, newIndex }) {
		chrome.tabs.move(id, {index: parseInt(newIndex) });
		this.setState({ flushDrop: new Date() });
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);

		chrome.tabs.onCreated.addListener(() => {
			chrome.tabs.query({currentWindow: true}, this.setTabs);
		});

		chrome.tabs.onUpdated.addListener(() => {
			chrome.tabs.query({currentWindow: true}, this.setTabs);
		});

		chrome.tabs.onMoved.addListener(() => {
			chrome.tabs.query({currentWindow: true}, this.setTabs);
		});

		chrome.tabs.onRemoved.addListener(() => {
			chrome.tabs.query({currentWindow: true}, this.setTabs);
		});
	}

	setTabs(tabs) {
		this.setState({
			tabs: sortBy(tabs, 'index'),
		});
	}

	groupTabs() {
		const groupedTabs = sortBy(this.state.tabs, 'url');

		this.setState({
			tabs: groupedTabs,
		});	

		groupedTabs.forEach((tab, i) => {
			chrome.tabs.move(tab.id, {index: i});
		});





		const groupedPinnedTabs = groupBy(this.state.tabs, 'pinned');
		const pinnedTabs = groupedPinnedTabs[true];
		const unpinnedTabs = groupedPinnedTabs[false];
		const groupedUnpinnedTabs = sortBy(unpinnedTabs, 'url');

		const newTabs = [
			...pinnedTabs,
			...groupedUnpinnedTabs,
		];

		this.setState({
			tabs: newTabs,
		});	

		newTabs.forEach((tab, i) => {
			chrome.tabs.move(tab.id, {index: i});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.search !== this.state.search || prevState.tabs !== this.state.tabs) {
			this.setResults();
		}
	}

	setStateDefault() {
		this.setState({
			search: null,
			state: 'default',
		})
	}
	setStateSearch() {
		this.setState({
			state: 'search',
		})
	}

	handleKeyDown(e) {
		let selectedId = this.state.selectedId;
		const { tabs, results, state } = this.state;

		if (e.code === 'OSLeft' ||
			e.code === 'ShiftLeft' ||
			e.code === 'ControLeft' ||
			e.code === 'AltLeft' ||
			e.code === 'OSRight' ||
			e.code === 'ControlRight' ||
			e.code === 'ShiftRight') return false;

		if ((e.code === 'ArrowUp' || e.code === 'ArrowDown') && selectedId === null) {
			e.preventDefault();
			this.setState({ selectedId: state === 'search' ? results[0].id : tabs[0].id });
			return;
		}

		switch (e.code) {
		case 'ArrowUp':
			e.preventDefault();
			if (state === 'search') {
				const resultsLength = results.length;
				const currentIndex = results.findIndex(tab => tab.id === selectedId);
				const nextSelectedId = (currentIndex - 1) < 0 ? results[resultsLength - 1].id : results[currentIndex - 1].id;
				return this.setState({
					selectedId: nextSelectedId,
				});
			} else {
				const tabsLength = tabs.length;
				const currentIndex = tabs.findIndex(tab => tab.id === selectedId);
				const nextSelectedId = (currentIndex - 1) < 0 ? tabs[tabsLength - 1].id : tabs[currentIndex - 1].id;
				return this.setState({
					selectedId: nextSelectedId,
				});
			}
			break;
		case 'ArrowDown':
			e.preventDefault();
			if (state === 'search') {
				const resultsLength = results.length;
				const currentIndex = results.findIndex(tab => tab.id === selectedId);
				const nextSelectedId = (currentIndex + 1) > (resultsLength - 1) ? results[0].id : results[currentIndex + 1].id;
				return this.setState({
					selectedId: nextSelectedId,
				});
			} else {
				const tabsLength = tabs.length;
				const currentIndex = tabs.findIndex(tab => tab.id === selectedId);
				const nextSelectedId = (currentIndex + 1) > (tabsLength - 1) ? tabs[0].id : tabs[currentIndex + 1].id;
				return this.setState({
					selectedId: nextSelectedId,
				});
			}
			break;
		case 'Enter':
			this.goToTab(selectedId);
			break;
		case 'Backspace':
			if ((!this.state.search || this.state.search === '') && this.state.state === 'search') {
				this.setState({
					state: 'default',
				});
			}
			break;
		default:
			this.setState({
				state: 'search',
			});
		}
	}

	goToTab(id) {
		chrome.tabs.update(id, {active: true});
	}
	pinTab(id, currentPinStatus) {
		chrome.tabs.update(id, {pinned: !currentPinStatus});
	}
	refreshTab(id) {
		chrome.tabs.reload(id);
	}
	closeTab(id) {
		chrome.tabs.remove(id);
	}

	setSearch(e) {
		this.setState({
			search: e.target.value,
		});
	}

	clearSearch() {
		this.setState({
			search: null,
		});
		this.refs.searchInput.focus();
	}

	setResults() {
		const { tabs, search } = this.state;

		if (search) {
			const results = _.filter(tabs, tab => {
				if (
					tab.title.toLowerCase().includes(search.toLowerCase()) ||
					tab.url.toLowerCase().includes(search.toLowerCase())
				) return true;
			});

			this.setState({
				results,
			});
		}
	}

	render() {
		const tabs = this.state.search ? this.state.results : this.state.tabs;
		const state = this.state.state;

		return (
			<div className="main-layout">
				<header className="main-header" data-state={this.state.state}>
				{state === 'default' ?
					<section className={`header--${state}`}>
						<h1>{tabs.length} tabs test</h1>
						<div className="header__actions">
							<button className="icon-button" onClick={this.groupTabs} title="Group"><Icon name="group" /></button>
							<button className="icon-button" onClick={this.setStateSearch} title="Search"><Icon name="search" /></button>
						</div>
					</section>
				: null}
				{state === 'search' ?
					<section className={`header--${state}`}>
						<button className="icon-button main-action" onClick={this.setStateDefault}><Icon name="back" /></button>
						<input ref="searchInput" autoComplete="off" className="text-input text-input--theme-light" type="text" name="search" value={this.state.search} onChange={this.setSearch} placeholder="Search..." autoFocus />
						<button className="icon-button" onClick={this.clearSearch} disabled={this.state.search ? false : true}><Icon name="close" /></button>
					</section>
				: null}
				</header>

				<main className="main-content">
					<TabsList>
						{tabs.map(tab => {
							const selected = this.state.selectedId === tab.id;
							return <TabsListItem
								key={tab.id}
								data={tab}
								flushDrop={this.state.flushDrop}
								selected={selected}
								onClick={this.goToTab}
								onClickClose={this.closeTab}
								onClickRefresh={this.refreshTab}
								onClickPin={this.pinTab}
								onDragEnd={this.handleDragEnd} />;
						})}
					</TabsList>
				</main>
			</div>
		)
	}
};

export default App;
